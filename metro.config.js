const path = require('path');
const os = require('os');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {FileStore} = require('metro-cache');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  // Keep the transform cache in one stable place instead of a temp dir that
  // gets cleaned, so a cold `npm start` reuses previous transforms.
  cacheStores: [
    new FileStore({root: path.join(os.tmpdir(), 'metro-cache-kimaclientrn')}),
  ],
  resolver: {
    // Build output holds thousands of generated files Metro never needs.
    // Without watchman installed the file crawl is plain node fs, so this
    // cuts real startup time.
    blockList: [
      /\/android\/build\/.*/,
      /\/android\/app\/build\/.*/,
      /\/android\/\.cxx\/.*/,
      /\/ios\/build\/.*/,
      /\/ios\/Pods\/.*/,
      /\\android\\build\\.*/,
      /\\android\\app\\build\\.*/,
      /\\android\\\.cxx\\.*/,
      /\\ios\\build\\.*/,
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
