/**
 * yarn Package Manager Configuration
 */

module.exports = {
  name: 'yarn',
  lockFile: 'yarn.lock',
  installCmd: 'yarn',
  runCmd: 'yarn',
  execCmd: 'yarn dlx',
  testCmd: 'yarn test',
  buildCmd: 'yarn build',
  devCmd: 'yarn dev'
};
