/**
 * pnpm Package Manager Configuration
 */

module.exports = {
  name: 'pnpm',
  lockFile: 'pnpm-lock.yaml',
  installCmd: 'pnpm install',
  runCmd: 'pnpm',
  execCmd: 'pnpm dlx',
  testCmd: 'pnpm test',
  buildCmd: 'pnpm build',
  devCmd: 'pnpm dev'
};
