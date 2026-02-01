/**
 * Cross-platform utility functions for Claude Code hooks and scripts
 * Works on Windows, macOS, and Linux
 *
 * This is the main entry point that re-exports all utility modules.
 * For more focused imports, you can import from individual modules:
 *   - platform-utils.js: Platform detection (isWindows, isMacOS, isLinux)
 *   - path-helpers.js: Directory management (getHomeDir, getClaudeDir, etc.)
 *   - datetime-utils.js: Date/time formatting
 *   - file-operations.js: File I/O (readFile, writeFile, findFiles, etc.)
 *   - git-helpers.js: Git operations (isGitRepo, getGitRepoName, etc.)
 *   - shell-utils.js: Command execution (commandExists, runCommand)
 *   - session-utils.js: Session ID management
 *   - io-utils.js: Hook I/O (readStdinJson, log, output)
 */

// Platform detection
const { isWindows, isMacOS, isLinux } = require('./platform-utils');

// Path helpers
const {
  getHomeDir,
  getClaudeDir,
  getSessionsDir,
  getLearnedSkillsDir,
  getTempDir,
  ensureDir
} = require('./path-helpers');

// Date/time utilities
const {
  getDateString,
  getTimeString,
  getDateTimeString
} = require('./datetime-utils');

// File operations
const {
  readFile,
  writeFile,
  appendFile,
  findFiles,
  replaceInFile,
  countInFile,
  grepFile
} = require('./file-operations');

// Git helpers
const {
  isGitRepo,
  getGitRepoName,
  getProjectName,
  getGitModifiedFiles
} = require('./git-helpers');

// Shell utilities
const { commandExists, runCommand } = require('./shell-utils');

// Session utilities
const { getSessionIdShort } = require('./session-utils');

// I/O utilities
const { readStdinJson, log, output } = require('./io-utils');

module.exports = {
  // Platform info
  isWindows,
  isMacOS,
  isLinux,

  // Directories
  getHomeDir,
  getClaudeDir,
  getSessionsDir,
  getLearnedSkillsDir,
  getTempDir,
  ensureDir,

  // Date/Time
  getDateString,
  getTimeString,
  getDateTimeString,

  // Session/Project
  getSessionIdShort,
  getGitRepoName,
  getProjectName,

  // File operations
  findFiles,
  readFile,
  writeFile,
  appendFile,
  replaceInFile,
  countInFile,
  grepFile,

  // Hook I/O
  readStdinJson,
  log,
  output,

  // System
  commandExists,
  runCommand,
  isGitRepo,
  getGitModifiedFiles
};
