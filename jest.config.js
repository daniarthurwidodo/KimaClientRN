// Packages that ship untranspiled ESM and must be run through babel.
const esmPackages = [
  'react-native',
  '@react-native',
  '@react-native-community',
  '@react-navigation',
  'react-native-safe-area-context',
  'react-native-screens',
  'react-native-svg',
  'react-native-webview',
  'react-native-youtube-iframe',
  '@fluentui/react-native-icons',
];

module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    `node_modules/(?!(?:jest-)?(?:${esmPackages.join('|')})/)`,
  ],
};
