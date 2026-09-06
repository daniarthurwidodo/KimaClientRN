#!/usr/bin/env node
/**
 * Wrapper around `react-native run-android` that keeps the build off 100% CPU.
 *
 * What it does:
 *   1. Asks adb which device is attached and builds only that device's ABI
 *      instead of all four listed in android/gradle.properties.
 *   2. Limits the Gradle worker count.
 *   3. Pins the build to a subset of cores at low priority.
 *
 * Usage:
 *   npm run android                  # auto-detect device, default cpu cap
 *   npm run android -- --cpus=1      # use a single core
 *   npm run android -- --cpus=0      # no cap, full speed
 *   npm run android -- --abi=x86_64  # force an ABI
 *   Any other flags are forwarded to react-native run-android.
 */

const {execFileSync, spawn} = require('child_process');
const fs = require('fs');
const os = require('os');
const net = require('net');
const path = require('path');

const TOTAL_CPUS = os.cpus().length;
const DEFAULT_CPUS = Math.max(1, Math.floor(TOTAL_CPUS / 2));
const IS_WINDOWS = process.platform === 'win32';

function parseArgs(argv) {
  const opts = {cpus: DEFAULT_CPUS, abi: null, passthrough: []};
  for (const arg of argv) {
    const cpus = /^--cpus=(\d+)$/.exec(arg);
    const abi = /^--abi=(.+)$/.exec(arg);
    if (cpus) {
      opts.cpus = Number(cpus[1]);
    } else if (abi) {
      opts.abi = abi[1];
    } else {
      opts.passthrough.push(arg);
    }
  }
  return opts;
}

function adbPath() {
  const propsFile = path.join(__dirname, '..', 'android', 'local.properties');
  let sdkDir = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
  if (!sdkDir && fs.existsSync(propsFile)) {
    const match = /^sdk\.dir=(.+)$/m.exec(fs.readFileSync(propsFile, 'utf8'));
    if (match) {
      // local.properties escapes backslashes the Java way.
      sdkDir = match[1].trim().split('\\\\').join('\\');
    }
  }
  const binary = IS_WINDOWS ? 'adb.exe' : 'adb';
  if (sdkDir) {
    const candidate = path.join(sdkDir, 'platform-tools', binary);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return binary; // fall back to PATH
}

function adb(args) {
  return execFileSync(adbPath(), args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });
}

/** Returns {id, kind} for the device we should build for, or null. */
function detectDevice() {
  let output;
  try {
    output = adb(['devices']);
  } catch (error) {
    return null;
  }
  const devices = output
    .split(/\r?\n/)
    .slice(1)
    .map(line => line.trim().split(/\s+/))
    .filter(parts => parts.length >= 2 && parts[1] === 'device')
    .map(parts => ({
      id: parts[0],
      kind: parts[0].startsWith('emulator-') ? 'emulator' : 'usb',
    }));

  // A physical USB device wins over an emulator.
  return devices.find(d => d.kind === 'usb') || devices[0] || null;
}

function deviceAbi(id) {
  try {
    return adb(['-s', id, 'shell', 'getprop', 'ro.product.cpu.abi']).trim() || null;
  } catch (error) {
    return null;
  }
}

/**
 * Ports the app expects to reach on the dev machine: Metro plus the backend's
 * primary and fallback ports (see src/shared/services/apiBase.ts). A USB device
 * has no route to the host without these, unlike the emulator's 10.0.2.2.
 */
const REVERSE_PORTS = [8081, 3000, 3311];

function reversePorts(id) {
  const forwarded = [];
  for (const port of REVERSE_PORTS) {
    try {
      adb(['-s', id, 'reverse', `tcp:${port}`, `tcp:${port}`]);
      forwarded.push(port);
    } catch (error) {
      // Emulators do not always accept reverse; 10.0.2.2 covers them anyway.
    }
  }
  return forwarded;
}

function affinityMask(cpus) {
  return ((1n << BigInt(Math.min(cpus, TOTAL_CPUS))) - 1n).toString(16);
}

function isMetroRunning() {
  return new Promise(resolve => {
    const socket = net.connect({port: 8081, host: '127.0.0.1'});
    const done = result => {
      socket.destroy();
      resolve(result);
    };
    socket.setTimeout(500);
    socket.on('connect', () => done(true));
    socket.on('error', () => done(false));
    socket.on('timeout', () => done(false));
  });
}

/**
 * Start Metro ourselves, outside the CPU cap. If the CLI starts it instead it
 * becomes a child of the affinity-pinned build and bundles on the capped cores
 * at low priority, which is very slow.
 */
function startMetro() {
  const child = IS_WINDOWS
    ? // Own console window, so Metro survives this script and its logs stay readable.
      spawn('cmd.exe', ['/c', 'start', '"Metro"', 'npx.cmd', 'react-native', 'start'], {
        stdio: 'ignore',
        detached: true,
      })
    : spawn('npx', ['react-native', 'start'], {stdio: 'ignore', detached: true});
  child.unref();
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const device = detectDevice();

  if (!device) {
    console.error(
      '[run-android] no adb device found - plug in a phone or start an emulator',
    );
    process.exit(1);
  }

  const abi = opts.abi || deviceAbi(device.id);
  console.log(
    `[run-android] ${device.kind} device ${device.id} (${abi || 'abi unknown'})`,
  );

  const forwarded = reversePorts(device.id);
  console.log(`[run-android] adb reverse ${forwarded.join(', ') || 'none'}`);

  if (await isMetroRunning()) {
    console.log('[run-android] metro already on port 8081');
  } else {
    console.log('[run-android] starting metro (uncapped)');
    startMetro();
  }

  const workers = opts.cpus > 0 ? Math.min(opts.cpus, TOTAL_CPUS) : TOTAL_CPUS;
  const args = [
    'react-native',
    'run-android',
    '--device',
    device.id,
    '--no-packager',
  ];
  // --extra-params takes a single string; passing it twice keeps only the last.
  const gradleFlags = [`--max-workers=${workers}`];
  if (abi) {
    gradleFlags.unshift(`-PreactNativeArchitectures=${abi}`);
  }
  args.push(`--extra-params=${gradleFlags.join(' ')}`);
  args.push(...opts.passthrough);

  console.log(
    `[run-android] ${workers}/${TOTAL_CPUS} cores${opts.cpus > 0 ? ', low priority' : ''}`,
  );

  let command;
  let commandArgs;
  if (IS_WINDOWS) {
    // `start` applies priority and affinity to the child and everything it
    // spawns, including the Gradle daemon and the clang/ninja processes below it.
    const prefix = ['/wait', '/b', '/low'];
    if (opts.cpus > 0) {
      prefix.push('/affinity', affinityMask(opts.cpus));
    }
    command = 'cmd.exe';
    commandArgs = ['/c', 'start', '""', ...prefix, 'npx.cmd', ...args];
  } else {
    command = 'nice';
    commandArgs = ['-n', '19', 'npx', ...args];
  }

  const child = spawn(command, commandArgs, {stdio: 'inherit'});
  child.on('exit', code => process.exit(code == null ? 1 : code));
}

main();
