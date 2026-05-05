'use client'

import React, { useState } from 'react'

export default function LandingPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handlePurchase = async (priceId: string, planName: string) => {
    setLoading(priceId)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: priceId, planName: planName }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error("Error en la respuesta de Stripe:", data.error)
        alert("Hubo un problema al conectar con la pasarela de pago.")
      }
    } catch (error) {
      console.error("Error de red:", error)
      alert("Error de conexión. Revisa tu internet.")
    } finally {
      setLoading(null)
    }
  }

  const plans = [
    {
      id: 'price_1TTcYbCHooMPNdqIs1UhBou2',
      name: 'Amateur',
      price: '29€',
      description: 'Ideal para empezar a cocinar con sentido.',
      features: ['5 Recetas semanales', 'Lista de la compra básica', 'Soporte por email'],
      color: 'border-slate-200'
    },
    {
      id: 'price_1TTcZSCHooMPNdqIg3dG16MJ',
      name: 'Cocinero',
      price: '59€',
      description: 'Para los que quieren dominar las técnicas reales.',
      features: ['Recetas ilimitadas', 'Vídeos paso a paso', 'Chat con el Agente Gourmet', 'Acceso a la comunidad'],
      color: 'border-amber-500 shadow-xl scale-105 z-10'
    },
    {
      id: 'price_1TTcaGCHooMPNdqIF8oNPMcQ',
      name: 'Chef',
      price: '99€',
      description: 'Nivel profesional. Gestión total de tu cocina.',
      features: ['Todo lo del plan Cocinero', 'Consultas 1:1 con Chef IA', 'Gestión de inventario pro', 'Certificado final'],
      color: 'border-slate-800'
    }
  ]

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans">
      {/* Hero Section */}
      <header className="py-20 text-center px-4 bg-slate-50">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
          Gourmet Master Academy
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Transforma tu cocina con inteligencia artificial. Elige el plan que mejor se adapte a tu ambición culinaria.
        </p>
      </header>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`bg-white border-2 rounded-2xl p-8 flex flex-col h-full transition-all duration-300 ${plan.color}`}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-black mb-4">{plan.price}<span className="text-lg font-normal text-slate-500">/mes</span></div>
                <p className="text-slate-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-slate-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePurchase(plan.id, plan.name)}
                disabled={loading !== null}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all 
                  ${plan.name === 'Cocinero' 
                    ? 'bg-amber-500 text-white hover:bg-amber-600' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'}
                  ${loading === plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading === plan.id ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                    Procesando...
                  </span>
                ) : (
                  `Empezar como ${plan.name}`
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center border-t text-slate-400 text-sm">
        &copy; 2026 Gourmet Master Academy. Todos los derechos reservados.
      </footer>
    </div>
  )
}