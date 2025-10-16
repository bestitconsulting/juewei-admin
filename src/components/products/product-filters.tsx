'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'

const categories = [
  { id: 'all', name: 'All Products', count: 24 },
  { id: 'duck', name: 'Duck Products', count: 12 },
  { id: 'chicken', name: 'Chicken Products', count: 6 },
  { id: 'vegetables', name: 'Vegetables', count: 6 },
]

const spiceLevels = [
  { id: 'mild', name: 'Mild', count: 8 },
  { id: 'medium', name: 'Medium', count: 10 },
  { id: 'spicy', name: 'Spicy', count: 6 },
]

const tags = [
  { id: 'new', name: 'New', count: 5 },
  { id: 'hot', name: 'Hot', count: 3 },
  { id: 'sale', name: 'Sale', count: 4 },
  { id: 'vegetarian', name: 'Vegetarian', count: 8 },
]

export function ProductFilters() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 20])

  const toggleSpiceLevel = (level: string) => {
    setSelectedSpiceLevel(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    )
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedSpiceLevel([])
    setSelectedTags([])
    setPriceRange([0, 20])
  }

  const hasActiveFilters = selectedCategory !== 'all' || 
    selectedSpiceLevel.length > 0 || 
    selectedTags.length > 0 || 
    priceRange[0] > 0 || 
    priceRange[1] < 20

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center justify-between p-2 rounded-md text-left hover:bg-gray-50 ${
                selectedCategory === category.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <span className="text-sm">{category.name}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={20}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spice Level */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Spice Level</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {spiceLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => toggleSpiceLevel(level.id)}
              className={`w-full flex items-center justify-between p-2 rounded-md text-left hover:bg-gray-50 ${
                selectedSpiceLevel.includes(level.id) ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <span className="text-sm">{level.name}</span>
              <Badge variant="secondary" className="text-xs">
                {level.count}
              </Badge>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => toggleTag(tag.id)}
              className={`w-full flex items-center justify-between p-2 rounded-md text-left hover:bg-gray-50 ${
                selectedTags.includes(tag.id) ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <span className="text-sm">{tag.name}</span>
              <Badge variant="secondary" className="text-xs">
                {tag.count}
              </Badge>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
