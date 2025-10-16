import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types (will be generated from Supabase)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          phone: string | null
          password_hash: string
          first_name: string
          last_name: string
          created_at: string
          updated_at: string
          last_login_at: string | null
          loyalty_points: number
          preferences: any
        }
        Insert: {
          id?: string
          email: string
          phone?: string | null
          password_hash: string
          first_name: string
          last_name: string
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
          loyalty_points?: number
          preferences?: any
        }
        Update: {
          id?: string
          email?: string
          phone?: string | null
          password_hash?: string
          first_name?: string
          last_name?: string
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
          loyalty_points?: number
          preferences?: any
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          type: string
          street_address: string
          city: string
          province: string
          postal_code: string
          country: string
          is_default: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          street_address: string
          city: string
          province: string
          postal_code: string
          country: string
          is_default?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          street_address?: string
          city?: string
          province?: string
          postal_code?: string
          country?: string
          is_default?: boolean
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name_en: string
          name_zh: string
          slug: string
          description_en: string | null
          description_zh: string | null
          image_url: string | null
          sort_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name_en: string
          name_zh: string
          slug: string
          description_en?: string | null
          description_zh?: string | null
          image_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name_en?: string
          name_zh?: string
          slug?: string
          description_en?: string | null
          description_zh?: string | null
          image_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          category_id: string
          name_en: string
          name_zh: string
          slug: string
          description_en: string | null
          description_zh: string | null
          price: number
          currency: string
          images: any
          specifications: any
          nutritional_info: any
          tags: any
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name_en: string
          name_zh: string
          slug: string
          description_en?: string | null
          description_zh?: string | null
          price: number
          currency: string
          images?: any
          specifications?: any
          nutritional_info?: any
          tags?: any
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name_en?: string
          name_zh?: string
          slug?: string
          description_en?: string | null
          description_zh?: string | null
          price?: number
          currency?: string
          images?: any
          specifications?: any
          nutritional_info?: any
          tags?: any
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          quantity: number
          unit_price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          quantity: number
          unit_price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          order_number: string
          status: string
          subtotal: number
          tax_amount: number
          shipping_cost: number
          total_amount: number
          payment_method: string
          payment_status: string
          stripe_payment_intent_id: string | null
          shipping_address: any
          billing_address: any
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          order_number: string
          status: string
          subtotal: number
          tax_amount: number
          shipping_cost: number
          total_amount: number
          payment_method: string
          payment_status: string
          stripe_payment_intent_id?: string | null
          shipping_address: any
          billing_address: any
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          order_number?: string
          status?: string
          subtotal?: number
          tax_amount?: number
          shipping_cost?: number
          total_amount?: number
          payment_method?: string
          payment_status?: string
          stripe_payment_intent_id?: string | null
          shipping_address?: any
          billing_address?: any
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          product_name: string
          product_image: string
          quantity: number
          unit_price: number
          total_price: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          product_name: string
          product_image: string
          quantity: number
          unit_price: number
          total_price: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          product_name?: string
          product_image?: string
          quantity?: number
          unit_price?: number
          total_price?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
