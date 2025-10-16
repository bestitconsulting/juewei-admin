export interface Address {
  id: string
  userId: string
  type: 'shipping' | 'billing'
  streetAddress: string
  city: string
  province: string
  postalCode: string
  country: string
  isDefault: boolean
  createdAt: string
}

export interface CreateAddressData {
  type: 'shipping' | 'billing'
  streetAddress: string
  city: string
  province: string
  postalCode: string
  country: string
  isDefault?: boolean
}

export interface UpdateAddressData {
  type?: 'shipping' | 'billing'
  streetAddress?: string
  city?: string
  province?: string
  postalCode?: string
  country?: string
  isDefault?: boolean
}

export interface AddressFormData {
  streetAddress: string
  city: string
  province: string
  postalCode: string
  country: string
  isDefault: boolean
}

export interface ShippingAddress extends Address {
  type: 'shipping'
}

export interface BillingAddress extends Address {
  type: 'billing'
}
