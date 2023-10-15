export interface Customer {
  id: number
  first_name?: string
  last_name?: string
  email: string
  phone?: string
  registration_date: Date
  password: string
  verified?: boolean
  username: string
  confirmation_sent_at: Date
  profile_image_url?: string
  address?: string
  email_confirmed_at: Date
  banned_until?: Date
}

export interface Store {
  id: number
  name: string
  address: string | null
  city: string | null
  state: string | null
  postal_code: string | null
  phone: string | null
}

export interface Sale {
  id: number
  customer_id: number
  store_id: number
  sale_date: Date
}

export interface SaleDetail {
  id: number
  sale_id: number
  product_id: number
  quantity: number
  subtotal: number
}

export interface Product {
  id: number
  name: string
  description: string | null
  price: number
  stock: number
}
