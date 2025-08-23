// logger.js
class Logger {
  constructor() {
    this.endpoint = `${process.env.REACT_APP_API_URL}/api/logs`;
  }

  async sendLog(level, message, meta = {}) {
    const logEntry = {
      level,
      message,
      meta,
      timestamp: new Date().toISOString(),
      environment: process.env.REACT_APP_NODE_ENV,
    };

    if (process.env.REACT_APP_NODE_ENV === "dev") {
      console[level === "error" ? "error" : "log"](logEntry);
    }

    if (process.env.REACT_APP_NODE_ENV === "prod") {
      try {
        await fetch(this.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(logEntry),
        });
      } catch (err) {
        console.error("Failed to send log", err);
      }
    }
  }

  info(message, meta) { this.sendLog("info", message, meta); }
  warn(message, meta) { this.sendLog("warn", message, meta); }
  error(message, meta) { this.sendLog("error", message, meta); }
  debug(message, meta) { this.sendLog("debug", message, meta); }
}

export const logger = new Logger();
