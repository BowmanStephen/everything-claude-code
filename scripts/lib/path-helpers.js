/**
 * Path and directory management utilities
 * Provides cross-platform directory path helpers
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Get the user's home directory (cross-platform)
 */
function getHomeDir() {
  return os.homedir();
}

/**
 * Get the Claude config directory
 */
function getClaudeDir() {
  return path.join(getHomeDir(), '.claude');
}

/**
 * Get the sessions directory
 */
function getSessionsDir() {
  return path.join(getClaudeDir(), 'sessions');
}

/**
 * Get the learned skills directory
 */
function getLearnedSkillsDir() {
  return path.join(getClaudeDir(), 'skills', 'learned');
}

/**
 * Get the temp directory (cross-platform)
 */
function getTempDir() {
  return os.tmpdir();
}

/**
 * Ensure a directory exists (create if not)
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
}

module.exports = {
  getHomeDir,
  getClaudeDir,
  getSessionsDir,
  getLearnedSkillsDir,
  getTempDir,
  ensureDir
};
