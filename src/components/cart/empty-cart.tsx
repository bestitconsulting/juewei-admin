import { Button } from '@/components/ui/button'
import { ShoppingBag, ArrowLeft } from 'lucide-react'

export function EmptyCart() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <ShoppingBag className="h-12 w-12 text-gray-400" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Looks like you haven't added any items to your cart yet. 
        Start shopping to fill it up with delicious Juewei products!
      </p>
      
      <div className="space-x-4">
        <Button size="lg">
          <ShoppingBag className="h-5 w-5 mr-2" />
          Start Shopping
        </Button>
        <Button variant="outline" size="lg">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </Button>
      </div>
    </div>
  )
}
