import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as any,
})

export async function POST(req: Request) {
  try {
    const { productId, planName } = await req.json()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: productId, // Aquí pasamos el ID del producto (o precio) de Stripe
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Metadata es vital: aquí es donde guardas los datos que el Webhook leerá después
      metadata: {
        plan_name: planName,
        dietary_preferences: 'Ninguna', // Esto lo podrías capturar de un formulario
      },
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}