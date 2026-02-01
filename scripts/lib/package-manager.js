/**
 * Package Manager Detection and Selection
 * Automatically detects the preferred package manager or lets user choose
 *
 * Supports: npm, pnpm, yarn, bun
 *
 * This file re-exports from the package-manager/ module for backward compatibility.
 * See package-manager/index.js for the main implementation.
 */

module.exports = require('./package-manager/index.js');
