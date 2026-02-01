/**
 * Session identification utilities
 * Provides session ID management for Claude Code
 */

const { getProjectName } = require('./git-helpers');

/**
 * Get short session ID from CLAUDE_SESSION_ID environment variable
 * Returns last 8 characters, falls back to project name then 'default'
 */
function getSessionIdShort(fallback = 'default') {
  const sessionId = process.env.CLAUDE_SESSION_ID;
  if (sessionId && sessionId.length > 0) {
    return sessionId.slice(-8);
  }
  return getProjectName() || fallback;
}

module.exports = {
  getSessionIdShort
};
