// Logging utility for the application
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, any>
  error?: Error
  userId?: string
  requestId?: string
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, context, error, userId, requestId } = entry
    
    let logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`
    
    if (userId) {
      logMessage += ` | User: ${userId}`
    }
    
    if (requestId) {
      logMessage += ` | Request: ${requestId}`
    }
    
    if (context && Object.keys(context).length > 0) {
      logMessage += ` | Context: ${JSON.stringify(context)}`
    }
    
    if (error) {
      logMessage += ` | Error: ${error.message}`
      if (this.isDevelopment && error.stack) {
        logMessage += `\nStack: ${error.stack}`
      }
    }
    
    return logMessage
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error, userId?: string, requestId?: string): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
      userId,
      requestId,
    }

    const formattedLog = this.formatLog(entry)

    // Console output
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedLog)
        break
      case LogLevel.INFO:
        console.info(formattedLog)
        break
      case LogLevel.WARN:
        console.warn(formattedLog)
        break
      case LogLevel.ERROR:
        console.error(formattedLog)
        break
    }

    // In production, you might want to send logs to a service like LogRocket, Sentry, etc.
    if (!this.isDevelopment && level === LogLevel.ERROR) {
      // Send to external logging service
      this.sendToExternalService(entry)
    }
  }

  private sendToExternalService(entry: LogEntry): void {
    // Implement external logging service integration
    // Example: Sentry, LogRocket, DataDog, etc.
    console.log('Sending to external logging service:', entry)
  }

  debug(message: string, context?: Record<string, any>, userId?: string, requestId?: string): void {
    this.log(LogLevel.DEBUG, message, context, undefined, userId, requestId)
  }

  info(message: string, context?: Record<string, any>, userId?: string, requestId?: string): void {
    this.log(LogLevel.INFO, message, context, undefined, userId, requestId)
  }

  warn(message: string, context?: Record<string, any>, userId?: string, requestId?: string): void {
    this.log(LogLevel.WARN, message, context, undefined, userId, requestId)
  }

  error(message: string, error?: Error, context?: Record<string, any>, userId?: string, requestId?: string): void {
    this.log(LogLevel.ERROR, message, context, error, userId, requestId)
  }

  // Specialized logging methods
  logAuth(action: string, userId?: string, context?: Record<string, any>): void {
    this.info(`Auth: ${action}`, { ...context, action: 'auth' }, userId)
  }

  logPayment(action: string, orderId?: string, amount?: number, context?: Record<string, any>): void {
    this.info(`Payment: ${action}`, { ...context, action: 'payment', orderId, amount })
  }

  logOrder(action: string, orderId?: string, userId?: string, context?: Record<string, any>): void {
    this.info(`Order: ${action}`, { ...context, action: 'order', orderId }, userId)
  }

  logProduct(action: string, productId?: string, context?: Record<string, any>): void {
    this.info(`Product: ${action}`, { ...context, action: 'product', productId })
  }

  logCart(action: string, userId?: string, productId?: string, context?: Record<string, any>): void {
    this.info(`Cart: ${action}`, { ...context, action: 'cart', productId }, userId)
  }

  logAdmin(action: string, adminId?: string, resource?: string, context?: Record<string, any>): void {
    this.info(`Admin: ${action}`, { ...context, action: 'admin', resource }, adminId)
  }

  // Performance logging
  logPerformance(operation: string, duration: number, context?: Record<string, any>): void {
    this.info(`Performance: ${operation}`, { ...context, operation, duration: `${duration}ms` })
  }

  // Security logging
  logSecurity(event: string, context?: Record<string, any>, userId?: string): void {
    this.warn(`Security: ${event}`, { ...context, event: 'security' }, userId)
  }
}

// Create singleton instance
export const logger = new Logger()

// Export convenience functions
export const logDebug = (message: string, context?: Record<string, any>, userId?: string, requestId?: string) => 
  logger.debug(message, context, userId, requestId)

export const logInfo = (message: string, context?: Record<string, any>, userId?: string, requestId?: string) => 
  logger.info(message, context, userId, requestId)

export const logWarn = (message: string, context?: Record<string, any>, userId?: string, requestId?: string) => 
  logger.warn(message, context, userId, requestId)

export const logError = (message: string, error?: Error, context?: Record<string, any>, userId?: string, requestId?: string) => 
  logger.error(message, error, context, userId, requestId)
