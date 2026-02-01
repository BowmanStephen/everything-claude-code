/**
 * Package Manager Detection Logic
 * Detects package manager from lock files, package.json, and configuration
 */

const fs = require('fs');
const path = require('path');
const { readFile } = require('../utils');
const {
  PACKAGE_MANAGERS,
  DETECTION_PRIORITY,
  loadConfig,
  getAvailablePackageManagers
} = require('./common');

/**
 * Detect package manager from lock file in project directory
 */
function detectFromLockFile(projectDir = process.cwd()) {
  for (const pmName of DETECTION_PRIORITY) {
    const pm = PACKAGE_MANAGERS[pmName];
    const lockFilePath = path.join(projectDir, pm.lockFile);

    if (fs.existsSync(lockFilePath)) {
      return pmName;
    }
  }
  return null;
}

/**
 * Detect package manager from package.json packageManager field
 */
function detectFromPackageJson(projectDir = process.cwd()) {
  const packageJsonPath = path.join(projectDir, 'package.json');
  const content = readFile(packageJsonPath);

  if (content) {
    try {
      const pkg = JSON.parse(content);
      if (pkg.packageManager) {
        // Format: "pnpm@8.6.0" or just "pnpm"
        const pmName = pkg.packageManager.split('@')[0];
        if (PACKAGE_MANAGERS[pmName]) {
          return pmName;
        }
      }
    } catch {
      // Invalid package.json
    }
  }
  return null;
}

/**
 * Get the package manager to use for current project
 *
 * Detection priority:
 * 1. Environment variable CLAUDE_PACKAGE_MANAGER
 * 2. Project-specific config (in .claude/package-manager.json)
 * 3. package.json packageManager field
 * 4. Lock file detection
 * 5. Global user preference (in ~/.claude/package-manager.json)
 * 6. First available package manager (by priority)
 *
 * @param {object} options - { projectDir, fallbackOrder }
 * @returns {object} - { name, config, source }
 */
function getPackageManager(options = {}) {
  const { projectDir = process.cwd(), fallbackOrder = DETECTION_PRIORITY } = options;

  // 1. Check environment variable
  const envPm = process.env.CLAUDE_PACKAGE_MANAGER;
  if (envPm && PACKAGE_MANAGERS[envPm]) {
    return {
      name: envPm,
      config: PACKAGE_MANAGERS[envPm],
      source: 'environment'
    };
  }

  // 2. Check project-specific config
  const projectConfigPath = path.join(projectDir, '.claude', 'package-manager.json');
  const projectConfig = readFile(projectConfigPath);
  if (projectConfig) {
    try {
      const config = JSON.parse(projectConfig);
      if (config.packageManager && PACKAGE_MANAGERS[config.packageManager]) {
        return {
          name: config.packageManager,
          config: PACKAGE_MANAGERS[config.packageManager],
          source: 'project-config'
        };
      }
    } catch {
      // Invalid config
    }
  }

  // 3. Check package.json packageManager field
  const fromPackageJson = detectFromPackageJson(projectDir);
  if (fromPackageJson) {
    return {
      name: fromPackageJson,
      config: PACKAGE_MANAGERS[fromPackageJson],
      source: 'package.json'
    };
  }

  // 4. Check lock file
  const fromLockFile = detectFromLockFile(projectDir);
  if (fromLockFile) {
    return {
      name: fromLockFile,
      config: PACKAGE_MANAGERS[fromLockFile],
      source: 'lock-file'
    };
  }

  // 5. Check global user preference
  const globalConfig = loadConfig();
  if (globalConfig && globalConfig.packageManager && PACKAGE_MANAGERS[globalConfig.packageManager]) {
    return {
      name: globalConfig.packageManager,
      config: PACKAGE_MANAGERS[globalConfig.packageManager],
      source: 'global-config'
    };
  }

  // 6. Use first available package manager
  const available = getAvailablePackageManagers();
  for (const pmName of fallbackOrder) {
    if (available.includes(pmName)) {
      return {
        name: pmName,
        config: PACKAGE_MANAGERS[pmName],
        source: 'fallback'
      };
    }
  }

  // Default to npm (always available with Node.js)
  return {
    name: 'npm',
    config: PACKAGE_MANAGERS.npm,
    source: 'default'
  };
}

module.exports = {
  detectFromLockFile,
  detectFromPackageJson,
  getPackageManager
};
