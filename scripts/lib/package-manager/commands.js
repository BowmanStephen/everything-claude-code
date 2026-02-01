/**
 * Package Manager Command Generation
 * Constructs commands for running scripts and executing binaries
 */

const { getPackageManager } = require('./detection');

/**
 * Get the command to run a script
 * @param {string} script - Script name (e.g., "dev", "build", "test")
 * @param {object} options - { projectDir }
 */
function getRunCommand(script, options = {}) {
  const pm = getPackageManager(options);

  switch (script) {
    case 'install':
      return pm.config.installCmd;
    case 'test':
      return pm.config.testCmd;
    case 'build':
      return pm.config.buildCmd;
    case 'dev':
      return pm.config.devCmd;
    default:
      return `${pm.config.runCmd} ${script}`;
  }
}

/**
 * Get the command to execute a package binary
 * @param {string} binary - Binary name (e.g., "prettier", "eslint")
 * @param {string} args - Arguments to pass
 */
function getExecCommand(binary, args = '', options = {}) {
  const pm = getPackageManager(options);
  return `${pm.config.execCmd} ${binary}${args ? ' ' + args : ''}`;
}

/**
 * Generate a regex pattern that matches commands for all package managers
 * @param {string} action - Action pattern (e.g., "run dev", "install", "test")
 */
function getCommandPattern(action) {
  const patterns = [];

  if (action === 'dev') {
    patterns.push(
      'npm run dev',
      'pnpm( run)? dev',
      'yarn dev',
      'bun run dev'
    );
  } else if (action === 'install') {
    patterns.push(
      'npm install',
      'pnpm install',
      'yarn( install)?',
      'bun install'
    );
  } else if (action === 'test') {
    patterns.push(
      'npm test',
      'pnpm test',
      'yarn test',
      'bun test'
    );
  } else if (action === 'build') {
    patterns.push(
      'npm run build',
      'pnpm( run)? build',
      'yarn build',
      'bun run build'
    );
  } else {
    // Generic run command
    patterns.push(
      `npm run ${action}`,
      `pnpm( run)? ${action}`,
      `yarn ${action}`,
      `bun run ${action}`
    );
  }

  return `(${patterns.join('|')})`;
}

module.exports = {
  getRunCommand,
  getExecCommand,
  getCommandPattern
};
