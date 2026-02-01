/**
 * Platform detection utilities
 * Provides constants for identifying the current operating system
 */

// Platform detection
const isWindows = process.platform === 'win32';
const isMacOS = process.platform === 'darwin';
const isLinux = process.platform === 'linux';

module.exports = {
  isWindows,
  isMacOS,
  isLinux
};
