export interface Product {
  id: string
  categoryId: string
  nameEn: string
  nameZh: string
  slug: string
  descriptionEn?: string
  descriptionZh?: string
  price: number
  currency: string
  images: string[]
  specifications: ProductSpecifications
  nutritionalInfo: NutritionalInfo
  tags: string[]
  isActive: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
  category?: Category
}

export interface ProductSpecifications {
  weight?: string
  dimensions?: string
  ingredients?: string[]
  allergens?: string[]
  shelfLife?: string
  storage?: string
  origin?: string
}

export interface NutritionalInfo {
  calories?: number
  protein?: number
  carbohydrates?: number
  fat?: number
  fiber?: number
  sugar?: number
  sodium?: number
  servingSize?: string
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  sortOrder: number
}

export interface ProductFilter {
  category?: string
  minPrice?: number
  maxPrice?: number
  tags?: string[]
  isActive?: boolean
}

export interface ProductSort {
  field: 'name' | 'price' | 'createdAt' | 'sortOrder'
  order: 'asc' | 'desc'
}

export interface ProductSearchParams {
  query?: string
  category?: string
  filters?: ProductFilter
  sort?: ProductSort
  page?: number
  limit?: number
}
