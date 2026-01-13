// Simple logger wrapper to control verbosity in production
const LEVEL = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug');

function shouldLog(level) {
  const order = { debug: 10, info: 20, warn: 30, error: 40 };
  return order[level] >= order[LEVEL];
}

module.exports = {
  debug: (...args) => { if (LEVEL === 'debug') console.debug(...args); },
  info: (...args) => { if (shouldLog('info')) console.info(...args); },
  warn: (...args) => { if (shouldLog('warn')) console.warn(...args); },
  error: (...args) => { if (shouldLog('error')) console.error(...args); },
};