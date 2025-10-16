export interface User {
  id: string
  email: string
  phone?: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
  loyaltyPoints: number
  preferences: UserPreferences
}

export interface UserPreferences {
  language: 'en' | 'zh'
  currency: 'USD' | 'CNY'
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
  theme: 'light' | 'dark' | 'system'
}

export interface RegisterData {
  email: string
  phone?: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  acceptTerms: boolean
}

export interface LoginData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface UpdateProfileData {
  firstName?: string
  lastName?: string
  phone?: string
  preferences?: Partial<UserPreferences>
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  token: string
  password: string
  confirmPassword: string
}
