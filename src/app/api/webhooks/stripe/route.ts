import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { logger } from '@/lib/logger'
import { config } from '@/lib/config'

const stripe = new Stripe(config.stripe.secretKey, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    logger.error('Missing Stripe signature')
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      config.stripe.webhookSecret
    )
  } catch (error) {
    logger.error('Webhook signature verification failed', error as Error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  logger.info('Stripe webhook received', { type: event.type, id: event.id })

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent)
        break

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break

      case 'payment_intent.canceled':
        await handlePaymentIntentCanceled(event.data.object as Stripe.PaymentIntent)
        break

      case 'charge.dispute.created':
        await handleChargeDisputeCreated(event.data.object as Stripe.Dispute)
        break

      default:
        logger.info('Unhandled webhook event type', { type: event.type })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    logger.error('Webhook handler error', error as Error, { type: event.type, id: event.id })
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    const orderId = paymentIntent.metadata?.orderId

    if (!orderId) {
      logger.error('Payment intent missing order ID', { paymentIntentId: paymentIntent.id })
      return
    }

    // Update order status
    const { error: orderError } = await supabase
      .from('orders')
      .update({
        payment_status: 'succeeded',
        stripe_payment_intent_id: paymentIntent.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)

    if (orderError) {
      logger.error('Failed to update order payment status', orderError, { orderId, paymentIntentId: paymentIntent.id })
      return
    }

    // Update order status to processing
    const { error: statusError } = await supabase
      .from('orders')
      .update({
        status: 'processing',
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)

    if (statusError) {
      logger.error('Failed to update order status', statusError, { orderId })
      return
    }

    logger.info('Payment succeeded', {
      orderId,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    })

    // TODO: Send order confirmation email
    // TODO: Update inventory if needed
    // TODO: Trigger order processing workflow

  } catch (error) {
    logger.error('Failed to handle payment intent succeeded', error as Error, {
      paymentIntentId: paymentIntent.id,
    })
    throw error
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    const orderId = paymentIntent.metadata?.orderId

    if (!orderId) {
      logger.error('Payment intent missing order ID', { paymentIntentId: paymentIntent.id })
      return
    }

    // Update order payment status
    const { error: orderError } = await supabase
      .from('orders')
      .update({
        payment_status: 'failed',
        stripe_payment_intent_id: paymentIntent.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)

    if (orderError) {
      logger.error('Failed to update order payment status', orderError, { orderId, paymentIntentId: paymentIntent.id })
      return
    }

    logger.info('Payment failed', {
      orderId,
      paymentIntentId: paymentIntent.id,
      failureCode: paymentIntent.last_payment_error?.code,
      failureMessage: paymentIntent.last_payment_error?.message,
    })

    // TODO: Send payment failure notification
    // TODO: Restore inventory if needed

  } catch (error) {
    logger.error('Failed to handle payment intent failed', error as Error, {
      paymentIntentId: paymentIntent.id,
    })
    throw error
  }
}

async function handlePaymentIntentCanceled(paymentIntent: Stripe.PaymentIntent) {
  try {
    const orderId = paymentIntent.metadata?.orderId

    if (!orderId) {
      logger.error('Payment intent missing order ID', { paymentIntentId: paymentIntent.id })
      return
    }

    // Update order payment status
    const { error: orderError } = await supabase
      .from('orders')
      .update({
        payment_status: 'cancelled',
        stripe_payment_intent_id: paymentIntent.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)

    if (orderError) {
      logger.error('Failed to update order payment status', orderError, { orderId, paymentIntentId: paymentIntent.id })
      return
    }

    logger.info('Payment canceled', {
      orderId,
      paymentIntentId: paymentIntent.id,
    })

    // TODO: Send payment cancellation notification
    // TODO: Restore inventory if needed

  } catch (error) {
    logger.error('Failed to handle payment intent canceled', error as Error, {
      paymentIntentId: paymentIntent.id,
    })
    throw error
  }
}

async function handleChargeDisputeCreated(dispute: Stripe.Dispute) {
  try {
    const chargeId = dispute.charge
    const amount = dispute.amount
    const reason = dispute.reason

    logger.warn('Charge dispute created', {
      disputeId: dispute.id,
      chargeId,
      amount,
      reason,
    })

    // TODO: Handle dispute
    // - Notify admin team
    // - Update order status
    // - Prepare dispute evidence
    // - Update customer record

  } catch (error) {
    logger.error('Failed to handle charge dispute', error as Error, {
      disputeId: dispute.id,
    })
    throw error
  }
}
