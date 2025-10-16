export interface AdminUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: AdminRole
  isActive: boolean
  createdAt: string
  lastLoginAt?: string
}

export type AdminRole = 'super_admin' | 'admin' | 'moderator'

export interface AdminDashboard {
  totalUsers: number
  totalOrders: number
  totalProducts: number
  totalRevenue: number
  recentOrders: Order[]
  topProducts: Product[]
  userGrowth: {
    period: string
    count: number
  }[]
  revenueGrowth: {
    period: string
    amount: number
  }[]
}

export interface AdminAnalytics {
  period: 'day' | 'week' | 'month' | 'year'
  metrics: {
    users: {
      total: number
      new: number
      active: number
    }
    orders: {
      total: number
      pending: number
      completed: number
      cancelled: number
    }
    revenue: {
      total: number
      average: number
      growth: number
    }
    products: {
      total: number
      active: number
      outOfStock: number
    }
  }
}

export interface AdminReport {
  id: string
  name: string
  type: 'users' | 'orders' | 'products' | 'revenue'
  period: {
    start: string
    end: string
  }
  filters: Record<string, any>
  generatedAt: string
  generatedBy: string
  data: any[]
}

export interface BulkOperation {
  id: string
  type: 'update_products' | 'update_orders' | 'update_users'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  totalItems: number
  processedItems: number
  errors: string[]
  createdAt: string
  completedAt?: string
}

export interface AdminSettings {
  siteName: string
  siteDescription: string
  defaultLanguage: string
  defaultCurrency: string
  taxRate: number
  shippingCost: number
  freeShippingThreshold: number
  emailNotifications: boolean
  smsNotifications: boolean
  maintenanceMode: boolean
}

export interface AdminLog {
  id: string
  adminId: string
  action: string
  resource: string
  resourceId: string
  details: Record<string, any>
  ipAddress: string
  userAgent: string
  createdAt: string
}
