'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface CartItem {
  id: string
  product: {
    id: string
    name: string
    nameZh: string
    price: number
    image: string
  }
  quantity: number
  unitPrice: number
  totalPrice: number
}

interface CartSummaryProps {
  items: CartItem[]
}

export function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0)
  const tax = subtotal * 0.13 // 13% tax
  const shipping = subtotal > 50 ? 0 : 5.99 // Free shipping over $50
  const total = subtotal + tax + shipping

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span>Subtotal ({items.length} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {/* Tax */}
        <div className="flex justify-between text-sm">
          <span>Tax (13%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600 font-medium">FREE</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        {shipping > 0 && (
          <p className="text-xs text-gray-600">
            Add ${(50 - subtotal).toFixed(2)} more for free shipping!
          </p>
        )}

        <Separator />

        {/* Total */}
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* Checkout Button */}
        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>

        {/* Continue Shopping */}
        <Button variant="outline" className="w-full">
          Continue Shopping
        </Button>

        {/* Security Notice */}
        <div className="text-xs text-gray-500 text-center">
          <p>🔒 Secure checkout with SSL encryption</p>
          <p>We accept Visa, Mastercard, and PayPal</p>
        </div>
      </CardContent>
    </Card>
  )
}
