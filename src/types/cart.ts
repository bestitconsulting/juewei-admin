export interface CartItem {
  id: string
  userId: string
  productId: string
  quantity: number
  unitPrice: number
  createdAt: string
  updatedAt: string
  product?: Product
}

export interface CartSummary {
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  itemCount: number
}

export interface AddToCartData {
  productId: string
  quantity: number
}

export interface UpdateCartItemData {
  quantity: number
}

export interface CartContext {
  items: CartItem[]
  isLoading: boolean
  error: string | null
  addItem: (productId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  getTotalPrice: () => number
  getTotalItems: () => number
  getItemCount: (productId: string) => number
}
