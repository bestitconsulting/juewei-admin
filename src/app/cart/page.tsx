import { CartItems } from '@/components/cart/cart-items'
import { CartSummary } from '@/components/cart/cart-summary'
import { EmptyCart } from '@/components/cart/empty-cart'

// Mock cart data
const mockCartItems = [
  {
    id: '1',
    product: {
      id: '1',
      name: 'Spicy Duck Neck',
      nameZh: '麻辣鸭脖',
      price: 5.99,
      image: '/scraped_media/product-01-e1759979489647.webp',
    },
    quantity: 2,
    unitPrice: 5.99,
    totalPrice: 11.98,
  },
  {
    id: '2',
    product: {
      id: '3',
      name: 'Spicy Duck Wing',
      nameZh: '麻辣鸭翅',
      price: 4.99,
      image: '/scraped_media/product-03-e1759979541108.webp',
    },
    quantity: 1,
    unitPrice: 4.99,
    totalPrice: 4.99,
  },
]

export default function CartPage() {
  const hasItems = mockCartItems.length > 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="mt-2 text-gray-600">Review your items before checkout</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {hasItems ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <CartItems items={mockCartItems} />
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary items={mockCartItems} />
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  )
}
