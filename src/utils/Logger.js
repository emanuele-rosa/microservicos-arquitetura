class Logger {
  static log(service, message) {
    console.log(`[${service}] ${new Date().toISOString()}: ${message}`);
  }

  static error(service, message) {
    console.error(`[${service}] ${new Date().toISOString()} ERROR: ${message}`);
  }
}

export default Logger;
