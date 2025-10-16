export interface Payment {
  id: string
  orderId: string
  amount: number
  currency: string
  method: PaymentMethod
  status: PaymentStatus
  stripePaymentIntentId?: string
  stripeChargeId?: string
  createdAt: string
  updatedAt: string
  processedAt?: string
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: PaymentStatus
  clientSecret: string
  metadata?: Record<string, string>
}

export interface CreatePaymentIntentData {
  amount: number
  currency: string
  orderId: string
  metadata?: Record<string, string>
}

export interface ConfirmPaymentData {
  paymentIntentId: string
  orderId: string
}

export interface PaymentMethodData {
  type: PaymentMethod
  stripePaymentMethodId?: string
  cardDetails?: {
    brand: string
    last4: string
    expMonth: number
    expYear: number
  }
}

export interface StripeWebhookEvent {
  id: string
  type: string
  data: {
    object: any
  }
  created: number
  livemode: boolean
  pending_webhooks: number
  request: {
    id: string
    idempotency_key: string
  }
}

export interface PaymentError {
  code: string
  message: string
  type: 'card_error' | 'validation_error' | 'api_error'
  decline_code?: string
}

export interface RefundData {
  paymentId: string
  amount?: number
  reason: 'requested_by_customer' | 'duplicate' | 'fraudulent'
  metadata?: Record<string, string>
}
