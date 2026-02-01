/**
 * Package Manager Detection and Selection
 * Automatically detects the preferred package manager or lets user choose
 *
 * Supports: npm, pnpm, yarn, bun
 */

const path = require('path');
const { writeFile } = require('../utils');

// Import from submodules
const {
  PACKAGE_MANAGERS,
  DETECTION_PRIORITY,
  loadConfig,
  saveConfig,
  getAvailablePackageManagers
} = require('./common');

const {
  detectFromLockFile,
  detectFromPackageJson,
  getPackageManager
} = require('./detection');

const {
  getRunCommand,
  getExecCommand,
  getCommandPattern
} = require('./commands');

/**
 * Set user's preferred package manager (global)
 */
function setPreferredPackageManager(pmName) {
  if (!PACKAGE_MANAGERS[pmName]) {
    throw new Error(`Unknown package manager: ${pmName}`);
  }

  const config = loadConfig() || {};
  config.packageManager = pmName;
  config.setAt = new Date().toISOString();
  saveConfig(config);

  return config;
}

/**
 * Set project's preferred package manager
 */
function setProjectPackageManager(pmName, projectDir = process.cwd()) {
  if (!PACKAGE_MANAGERS[pmName]) {
    throw new Error(`Unknown package manager: ${pmName}`);
  }

  const configDir = path.join(projectDir, '.claude');
  const configPath = path.join(configDir, 'package-manager.json');

  const config = {
    packageManager: pmName,
    setAt: new Date().toISOString()
  };

  writeFile(configPath, JSON.stringify(config, null, 2));
  return config;
}

/**
 * Interactive prompt for package manager selection
 * Returns a message for Claude to show to user
 */
function getSelectionPrompt() {
  const available = getAvailablePackageManagers();
  const current = getPackageManager();

  let message = '[PackageManager] Available package managers:\n';

  for (const pmName of available) {
    const indicator = pmName === current.name ? ' (current)' : '';
    message += `  - ${pmName}${indicator}\n`;
  }

  message += '\nTo set your preferred package manager:\n';
  message += '  - Global: Set CLAUDE_PACKAGE_MANAGER environment variable\n';
  message += '  - Or add to ~/.claude/package-manager.json: {"packageManager": "pnpm"}\n';
  message += '  - Or add to package.json: {"packageManager": "pnpm@8"}\n';

  return message;
}

module.exports = {
  // Constants
  PACKAGE_MANAGERS,
  DETECTION_PRIORITY,
  // Detection functions
  getPackageManager,
  detectFromLockFile,
  detectFromPackageJson,
  getAvailablePackageManagers,
  // Preference setters
  setPreferredPackageManager,
  setProjectPackageManager,
  // Command functions
  getRunCommand,
  getExecCommand,
  getCommandPattern,
  // UI helpers
  getSelectionPrompt
};
