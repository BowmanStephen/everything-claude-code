/**
 * Git repository utilities
 * Provides git-related helper functions
 */

const path = require('path');
const { runCommand } = require('./shell-utils');

/**
 * Check if current directory is a git repository
 */
function isGitRepo() {
  return runCommand('git rev-parse --git-dir').success;
}

/**
 * Get the git repository name
 */
function getGitRepoName() {
  const result = runCommand('git rev-parse --show-toplevel');
  if (!result.success) return null;
  return path.basename(result.output);
}

/**
 * Get project name from git repo or current directory
 */
function getProjectName() {
  const repoName = getGitRepoName();
  if (repoName) return repoName;
  return path.basename(process.cwd()) || null;
}

/**
 * Get git modified files
 */
function getGitModifiedFiles(patterns = []) {
  if (!isGitRepo()) return [];

  const result = runCommand('git diff --name-only HEAD');
  if (!result.success) return [];

  let files = result.output.split('\n').filter(Boolean);

  if (patterns.length > 0) {
    files = files.filter(file => {
      return patterns.some(pattern => {
        const regex = new RegExp(pattern);
        return regex.test(file);
      });
    });
  }

  return files;
}

module.exports = {
  isGitRepo,
  getGitRepoName,
  getProjectName,
  getGitModifiedFiles
};
