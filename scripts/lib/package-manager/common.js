/**
 * Common utilities and constants for package manager module
 * Shared across detection, commands, and index modules
 */

const path = require('path');
const { commandExists, getClaudeDir, readFile, writeFile } = require('../utils');

// Import individual package manager configs
const npm = require('./managers/npm');
const yarn = require('./managers/yarn');
const pnpm = require('./managers/pnpm');
const bun = require('./managers/bun');

// Package manager definitions
const PACKAGE_MANAGERS = {
  npm,
  pnpm,
  yarn,
  bun
};

// Priority order for detection
const DETECTION_PRIORITY = ['pnpm', 'bun', 'yarn', 'npm'];

// Config file path
function getConfigPath() {
  return path.join(getClaudeDir(), 'package-manager.json');
}

/**
 * Load saved package manager configuration
 */
function loadConfig() {
  const configPath = getConfigPath();
  const content = readFile(configPath);

  if (content) {
    try {
      return JSON.parse(content);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Save package manager configuration
 */
function saveConfig(config) {
  const configPath = getConfigPath();
  writeFile(configPath, JSON.stringify(config, null, 2));
}

/**
 * Get available package managers (installed on system)
 */
function getAvailablePackageManagers() {
  const available = [];

  for (const pmName of Object.keys(PACKAGE_MANAGERS)) {
    if (commandExists(pmName)) {
      available.push(pmName);
    }
  }

  return available;
}

module.exports = {
  PACKAGE_MANAGERS,
  DETECTION_PRIORITY,
  getConfigPath,
  loadConfig,
  saveConfig,
  getAvailablePackageManagers
};
