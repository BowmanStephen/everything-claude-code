/**
 * Cross-platform utility functions for Claude Code hooks and scripts
 * Works on Windows, macOS, and Linux
 *
 * This file re-exports all utilities from the modular structure for backward compatibility.
 * For new code, consider importing from specific modules in ./lib/ for better tree-shaking.
 */

module.exports = require('./index');
