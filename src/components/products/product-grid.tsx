'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart, Star } from 'lucide-react'

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'Spicy Duck Neck',
    nameZh: '麻辣鸭脖',
    price: 5.99,
    originalPrice: 7.99,
    image: '/scraped_media/product-01-e1759979489647.webp',
    rating: 4.8,
    reviews: 128,
    isNew: true,
    isHot: false,
    category: 'Duck Products',
    description: 'Classic spicy duck neck, a Juewei signature dish with perfect spice level.',
  },
  {
    id: '2',
    name: 'Mild Duck Neck',
    nameZh: '微辣鸭脖',
    price: 5.49,
    originalPrice: null,
    image: '/scraped_media/product-02-e1759979514429.webp',
    rating: 4.6,
    reviews: 95,
    isNew: false,
    isHot: true,
    category: 'Duck Products',
    description: 'Mildly spicy duck neck for those who prefer a gentler kick.',
  },
  {
    id: '3',
    name: 'Spicy Duck Wing',
    nameZh: '麻辣鸭翅',
    price: 4.99,
    originalPrice: null,
    image: '/scraped_media/product-03-e1759979541108.webp',
    rating: 4.7,
    reviews: 87,
    isNew: false,
    isHot: false,
    category: 'Duck Products',
    description: 'Spicy duck wings, great for sharing with friends and family.',
  },
  {
    id: '4',
    name: 'Spicy Lotus Root',
    nameZh: '麻辣藕片',
    price: 3.99,
    originalPrice: null,
    image: '/scraped_media/product-04-e1759979443542.webp',
    rating: 4.5,
    reviews: 76,
    isNew: true,
    isHot: false,
    category: 'Vegetables',
    description: 'Crispy and spicy lotus root slices, perfect vegetarian option.',
  },
  {
    id: '5',
    name: 'Spicy Tofu',
    nameZh: '麻辣豆腐',
    price: 4.49,
    originalPrice: null,
    image: '/scraped_media/product-05-e1759979420985.webp',
    rating: 4.4,
    reviews: 63,
    isNew: false,
    isHot: false,
    category: 'Vegetables',
    description: 'Soft and spicy tofu with our signature seasoning.',
  },
  {
    id: '6',
    name: 'Spicy Chicken Feet',
    nameZh: '麻辣鸡爪',
    price: 6.99,
    originalPrice: 8.99,
    image: '/scraped_media/product-06-e1759979377379.webp',
    rating: 4.9,
    reviews: 142,
    isNew: false,
    isHot: true,
    category: 'Chicken Products',
    description: 'Tender and flavorful spicy chicken feet, a popular choice.',
  },
]

export function ProductGrid() {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mockProducts.map((product) => (
        <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-0">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isNew && (
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    New
                  </Badge>
                )}
                {product.isHot && (
                  <Badge variant="destructive">
                    Hot
                  </Badge>
                )}
                {product.originalPrice && (
                  <Badge variant="outline" className="bg-red-500 text-white border-red-500">
                    Sale
                  </Badge>
                )}
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
              >
                <Heart 
                  className={`h-4 w-4 ${
                    favorites.includes(product.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-400'
                  }`} 
                />
              </button>

              {/* Quick Add to Cart */}
              <div className="absolute inset-x-0 bottom-0 p-2 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Button className="w-full" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {product.nameZh}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button className="w-full" size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
