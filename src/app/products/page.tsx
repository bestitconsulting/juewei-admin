import { ProductGrid } from '@/components/products/product-grid'
import { ProductFilters } from '@/components/products/product-filters'
import { SearchBar } from '@/components/products/search-bar'
import { CategoryTabs } from '@/components/products/category-tabs'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">绝味产品</h1>
            <p className="mt-2 text-gray-600">Discover our delicious spicy snacks</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilters />
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Search and Category Tabs */}
            <div className="mb-6 space-y-4">
              <SearchBar />
              <CategoryTabs />
            </div>

            {/* Product Grid */}
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  )
}
