import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10' as any,
})

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret!)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Bloque 3: Sincronización de Metadatos
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const supabase = await createClient()

    // Sacamos las preferencias dietéticas de los metadatos de Stripe
    const diet = session.metadata?.dietary_preferences || 'Ninguna'
    const userEmail = session.customer_details?.email

    const { error } = await supabase
      .from('customers')
      .update({ dietary_preferences: diet })
      .eq('email', userEmail)

    if (error) console.error('Error al sincronizar metadatos:', error)
  }

  return NextResponse.json({ received: true })
}