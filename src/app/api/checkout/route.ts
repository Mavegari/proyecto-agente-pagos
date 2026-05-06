import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as any,
})

export async function POST(req: Request) {
  try {
    const { productId, planName, dietaryPrefs } = await req.json() // <-- Recibimos dietaryPrefs

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: productId, quantity: 1 }],
      mode: 'subscription',
      metadata: {
        plan_name: planName,
        dietary_preferences: dietaryPrefs, // <-- Se guarda en Stripe
      },
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}