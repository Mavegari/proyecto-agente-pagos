'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [loading, setLoading] = useState<string | null>(null)
  const [hasAllergies, setHasAllergies] = useState(false)

  const handlePurchase = async (priceId: string, planName: string) => {
    setLoading(priceId)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId: priceId, 
          planName: planName,
          dietaryPrefs: hasAllergies ? 'El usuario indica tener alergias o preferencias' : 'Ninguna' 
        }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Error al conectar con Stripe")
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(null)
    }
  }

  const plans = [
    { id: 'price_1TTcYbCHooMPNdqIs1UhBou2', name: 'Amateur', price: '9,99€', desc: 'Fundamentos sólidos.', color: 'bg-white', button: 'Empezar' },
    { id: 'price_1TTcZSCHooMPNdqIg3dG16MJ', name: 'Cocinero', price: '29,99€', desc: 'Técnica profesional.', color: 'bg-amber-50', button: 'Subir Nivel', popular: true },
    { id: 'price_1TTcaGCHooMPNdqIF8oNPMcQ', name: 'Chef', price: '69,99€', desc: 'Alta cocina e IA.', color: 'bg-white', button: 'Acceso VIP' },
  ]

  return (
    <div className="min-h-screen bg-[#FCFBF9] text-slate-900">
      {/* 1. NAVBAR */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-serif font-bold tracking-tighter uppercase">GOURMET<span className="text-amber-600">MASTER</span></div>
        <div className="hidden md:flex space-x-8 text-[10px] uppercase tracking-widest font-bold">
          <a href="#beneficios" className="hover:text-amber-600 transition">Beneficios</a>
          <a href="#pricing" className="hover:text-amber-600 transition">Planes</a>
        </div>
        <Link href="/login" className="bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-bold hover:bg-amber-600 transition">Login</Link>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative pt-48 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-amber-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">La Revolución en tu Cocina</span>
            <h1 className="text-6xl md:text-7xl font-serif leading-[1.1] mb-6">
              No solo cocines. <br /> <span className="italic text-amber-700">Crea arte.</span>
            </h1>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed font-light">
              Domina las técnicas de los grandes maestros con la primera academia asistida por IA que personaliza cada receta a tu paladar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#pricing" className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-center hover:scale-105 transition shadow-lg">Explorar Planes</a>
            </div>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000" alt="Chef" className="object-cover w-full h-full" />
          </div>
        </div>
      </header>

      {/* 3. PLANES (CON CHECKBOX) */}
      <section id="pricing" className="py-24 px-6 bg-[#F3F2EF]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {plans.map(p => (
            <div key={p.name} className={`${p.color} p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center text-center`}>
              <h3 className="uppercase tracking-widest text-[10px] font-bold text-amber-600 mb-4">{p.name}</h3>
              <div className="text-5xl font-bold mb-6 font-serif">{p.price}</div>
              <p className="text-slate-500 text-sm mb-8 font-light">{p.desc}</p>

              {/* CHECKBOX AÑADIDO */}
              <label className="flex items-center space-x-2 mb-8 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  onChange={(e) => setHasAllergies(e.target.checked)}
                />
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 group-hover:text-amber-600 transition">
                  ¿Tengo alergias o preferencias?
                </span>
              </label>

              <button 
                onClick={() => handlePurchase(p.id, p.name)}
                disabled={loading !== null}
                className="mt-auto w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-amber-600 transition"
              >
                {loading === p.id ? 'Procesando...' : p.button}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. NEWSLETTER */}
      <section className="py-24 px-6 bg-amber-50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-4">Únete a la Newsletter VIP</h2>
          <form className="flex gap-2">
            <input type="email" placeholder="tu@email.com" className="flex-1 px-6 py-4 rounded-xl border-none ring-1 ring-slate-200 outline-none" />
            <button className="px-8 py-4 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition">Ok</button>
          </form>
        </div>
      </section>

      <footer className="py-12 text-center text-[9px] uppercase tracking-[0.3em] text-slate-400 border-t border-slate-100">
        © 2026 Win o Win Consulting — Gourmet Master Academy
      </footer>
    </div>
  )
}