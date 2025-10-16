export interface Category {
  id: string
  nameEn: string
  nameZh: string
  slug: string
  descriptionEn?: string
  descriptionZh?: string
  imageUrl?: string
  sortOrder: number
  isActive: boolean
  createdAt: string
  productCount?: number
}

export interface CategoryWithProducts extends Category {
  products: Product[]
}

export interface CreateCategoryData {
  nameEn: string
  nameZh: string
  slug: string
  descriptionEn?: string
  descriptionZh?: string
  imageUrl?: string
  sortOrder?: number
  isActive?: boolean
}

export interface UpdateCategoryData {
  nameEn?: string
  nameZh?: string
  slug?: string
  descriptionEn?: string
  descriptionZh?: string
  imageUrl?: string
  sortOrder?: number
  isActive?: boolean
}
