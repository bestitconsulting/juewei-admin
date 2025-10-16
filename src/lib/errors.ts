// Custom error classes
export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401)
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404)
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists') {
    super(message, 409)
  }
}

export class PaymentError extends AppError {
  constructor(message: string = 'Payment processing failed') {
    super(message, 402)
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(message, 500)
  }
}

// Error handler utility
export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof Error) {
    return new AppError(error.message, 500, false)
  }

  return new AppError('An unexpected error occurred', 500, false)
}

// API error response formatter
export const formatErrorResponse = (error: AppError) => {
  return {
    success: false,
    error: {
      message: error.message,
      statusCode: error.statusCode,
      isOperational: error.isOperational,
    },
  }
}

// Validation error formatter
export const formatValidationError = (errors: Record<string, string[]>) => {
  return {
    success: false,
    error: {
      message: 'Validation failed',
      statusCode: 400,
      details: errors,
    },
  }
}

// Error logging utility
export const logError = (error: AppError, context?: Record<string, any>) => {
  console.error({
    message: error.message,
    statusCode: error.statusCode,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  })
}

// Common error messages
export const ERROR_MESSAGES = {
  // Authentication
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  PHONE_ALREADY_EXISTS: 'Phone number already exists',
  INVALID_TOKEN: 'Invalid or expired token',
  
  // Authorization
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions',
  ADMIN_REQUIRED: 'Admin access required',
  
  // Products
  PRODUCT_NOT_FOUND: 'Product not found',
  PRODUCT_OUT_OF_STOCK: 'Product is out of stock',
  INVALID_PRODUCT_DATA: 'Invalid product data',
  
  // Cart
  CART_ITEM_NOT_FOUND: 'Cart item not found',
  INVALID_QUANTITY: 'Invalid quantity',
  CART_EMPTY: 'Cart is empty',
  
  // Orders
  ORDER_NOT_FOUND: 'Order not found',
  ORDER_ALREADY_PROCESSED: 'Order has already been processed',
  INVALID_ORDER_STATUS: 'Invalid order status',
  
  // Payment
  PAYMENT_FAILED: 'Payment failed',
  PAYMENT_INTENT_FAILED: 'Payment intent creation failed',
  INVALID_PAYMENT_METHOD: 'Invalid payment method',
  
  // General
  INTERNAL_SERVER_ERROR: 'Internal server error',
  VALIDATION_ERROR: 'Validation error',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded',
} as const

// Error code enum
export enum ErrorCode {
  // Authentication
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  PHONE_ALREADY_EXISTS = 'PHONE_ALREADY_EXISTS',
  INVALID_TOKEN = 'INVALID_TOKEN',
  
  // Authorization
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  ADMIN_REQUIRED = 'ADMIN_REQUIRED',
  
  // Products
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  PRODUCT_OUT_OF_STOCK = 'PRODUCT_OUT_OF_STOCK',
  INVALID_PRODUCT_DATA = 'INVALID_PRODUCT_DATA',
  
  // Cart
  CART_ITEM_NOT_FOUND = 'CART_ITEM_NOT_FOUND',
  INVALID_QUANTITY = 'INVALID_QUANTITY',
  CART_EMPTY = 'CART_EMPTY',
  
  // Orders
  ORDER_NOT_FOUND = 'ORDER_NOT_FOUND',
  ORDER_ALREADY_PROCESSED = 'ORDER_ALREADY_PROCESSED',
  INVALID_ORDER_STATUS = 'INVALID_ORDER_STATUS',
  
  // Payment
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PAYMENT_INTENT_FAILED = 'PAYMENT_INTENT_FAILED',
  INVALID_PAYMENT_METHOD = 'INVALID_PAYMENT_METHOD',
  
  // General
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
}
