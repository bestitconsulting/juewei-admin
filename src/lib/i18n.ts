import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

// Can be imported from a shared config
const locales = ['en', 'zh']

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`../../public/locales/${locale}.json`)).default
  }
})

// Export locale configuration
export const localeConfig = {
  locales,
  defaultLocale: 'en',
  localeNames: {
    en: 'English',
    zh: '中文',
  },
} as const

export type Locale = (typeof locales)[number]
