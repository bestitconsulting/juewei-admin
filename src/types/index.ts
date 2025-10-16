// Re-export all types from individual files
export * from './user'
export * from './product'
export * from './order'
export * from './cart'
export * from './address'
export * from './category'
export * from './payment'
export * from './admin'

// Common types
export type Status = 'pending' | 'processing' | 'succeeded' | 'failed' | 'cancelled'
export type OrderStatus = 'ordered' | 'processing' | 'ready' | 'completed'
export type PaymentMethod = 'stripe' | 'cash'
export type AddressType = 'shipping' | 'billing'
export type Locale = 'en' | 'zh'

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface FormState {
  isLoading: boolean
  error: string | null
  success: boolean
}

// Search and filter types
export interface SearchParams {
  query?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// Cart context types
export interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

// Auth context types
export interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

// Theme types
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system'
  primaryColor: string
  secondaryColor: string
}

// Notification types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}
