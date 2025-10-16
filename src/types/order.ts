export interface Order {
  id: string
  userId: string
  orderNumber: string
  status: OrderStatus
  subtotal: number
  taxAmount: number
  shippingCost: number
  totalAmount: number
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  stripePaymentIntentId?: string
  shippingAddress: Address
  billingAddress: Address
  createdAt: string
  updatedAt: string
  completedAt?: string
  items: OrderItem[]
  user?: User
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  productName: string
  productImage?: string
  quantity: number
  unitPrice: number
  totalPrice: number
  product?: Product
}

export interface CreateOrderData {
  items: {
    productId: string
    quantity: number
    unitPrice: number
  }[]
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: PaymentMethod
  subtotal: number
  taxAmount: number
  shippingCost: number
  totalAmount: number
}

export interface UpdateOrderData {
  status?: OrderStatus
  paymentStatus?: PaymentStatus
  stripePaymentIntentId?: string
  completedAt?: string
}

export interface OrderTracking {
  orderId: string
  status: OrderStatus
  statusHistory: OrderStatusUpdate[]
  estimatedDelivery?: string
  trackingNumber?: string
  carrier?: string
}

export interface OrderStatusUpdate {
  status: OrderStatus
  timestamp: string
  note?: string
  updatedBy?: string
}

export interface OrderSummary {
  orderNumber: string
  status: OrderStatus
  totalAmount: number
  itemCount: number
  createdAt: string
  estimatedDelivery?: string
}

export interface ReorderData {
  orderId: string
  items: {
    productId: string
    quantity: number
  }[]
}
