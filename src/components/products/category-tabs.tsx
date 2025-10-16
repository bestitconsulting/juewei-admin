'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

const categories = [
  { id: 'all', name: 'All Products', nameZh: '全部产品', count: 24 },
  { id: 'duck', name: 'Duck Products', nameZh: '鸭类产品', count: 12 },
  { id: 'chicken', name: 'Chicken Products', nameZh: '鸡类产品', count: 6 },
  { id: 'vegetables', name: 'Vegetables', nameZh: '素菜', count: 6 },
]

export function CategoryTabs() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeCategory === category.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span>{category.name}</span>
            <Badge variant="secondary" className="text-xs">
              {category.count}
            </Badge>
          </button>
        ))}
      </nav>
    </div>
  )
}
