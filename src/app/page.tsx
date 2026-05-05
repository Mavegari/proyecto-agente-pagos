import Link from 'next/link'

export default function Home() {
  const plans = [
    { name: 'Amateur', price: '9,99€', desc: 'Fundamentos sólidos.', color: 'bg-white', button: 'Empezar' },
    { name: 'Cocinero', price: '29,99€', desc: 'Técnica profesional.', color: 'bg-amber-50', button: 'Subir Nivel', popular: true },
    { name: 'Chef', price: '69,99€', desc: 'Alta cocina e IA.', color: 'bg-white', button: 'Acceso VIP' },
  ]

  return (
    <div className="min-h-screen bg-[#FCFBF9] text-slate-900">
      {/* 1. NAVBAR */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-serif font-bold tracking-tighter">GOURMET<span className="text-amber-600">MASTER</span></div>
        <div className="hidden md:flex space-x-8 text-xs uppercase tracking-widest font-semibold">
          <a href="#beneficios" className="hover:text-amber-600 transition">Beneficios</a>
          <a href="#testimonios" className="hover:text-amber-600 transition">Testimonios</a>
          <a href="#pricing" className="hover:text-amber-600 transition">Planes</a>
        </div>
        <Link href="/login" className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-amber-600 transition">Login</Link>
      </nav>

      {/* 2. HERO SECTION (Título llamativo + Propuesta de valor) */}
      <header className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-amber-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">La Revolución en tu Cocina</span>
            <h1 className="text-6xl md:text-7xl font-serif leading-[1.1] mb-6">
              No solo cocines. <br /> <span className="italic text-amber-700">Crea arte.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Domina las técnicas de los grandes maestros con la primera academia asistida por Inteligencia Artificial que personaliza cada receta a tu paladar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#pricing" className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-center hover:scale-105 transition">Explorar Planes</a>
              <button className="px-8 py-4 border border-slate-200 rounded-xl font-bold text-center hover:bg-slate-50 transition">Ver Demo Video</button>
            </div>
          </div>
          {/* 3. IMAGEN/VIDEO DE APOYO */}
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000" 
              alt="Chef cooking" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
          </div>
        </div>
      </header>

      {/* 4. BENEFICIOS DEL PRODUCTO */}
      <section id="beneficios" className="py-24 bg-slate-900 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif mb-16 text-center">¿Por qué Gourmet Master Academy?</h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { t: 'IA Sommelier', d: 'Sugerencias de maridaje en tiempo real basadas en tus ingredientes.' },
              { t: 'Técnicas de Vanguardia', d: 'Desde esferificaciones hasta cocina al vacío explicada paso a paso.' },
              { t: 'Perfil Nutricional', d: 'Sincronización de metadatos para adaptar cada plato a tu salud.' }
            ].map(b => (
              <div key={b.t} className="p-8 border border-white/10 rounded-2xl">
                <div className="text-amber-500 text-3xl mb-4">✦</div>
                <h4 className="text-xl font-bold mb-2">{b.t}</h4>
                <p className="text-slate-400 text-sm">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIOS */}
      <section id="testimonios" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center italic text-2xl font-serif text-slate-700">
          "Nunca pensé que podría emplatar como un profesional hasta que la IA de Gourmet Master me guió. Es como tener un mentor 24/7 en mi cocina."
          <div className="mt-6 not-italic text-sm font-bold uppercase tracking-widest text-slate-900">— Marc Rovira, Alumno Nivel Chef</div>
        </div>
      </section>

      {/* 6. PLANES (CTA DIRECTA) */}
      <section id="pricing" className="py-24 px-6 bg-[#F3F2EF]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {plans.map(p => (
            <div key={p.name} className={`${p.color} p-10 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col items-center text-center`}>
              <h3 className="uppercase tracking-widest text-xs font-bold text-amber-600 mb-4">{p.name}</h3>
              <div className="text-5xl font-bold mb-6">{p.price}</div>
              <p className="text-slate-500 text-sm mb-8">{p.desc}</p>
              <button className="mt-auto w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-amber-600 transition">
                {p.button}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FORMULARIO BREVE */}
      <section className="py-24 px-6 bg-amber-50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-4">Únete a la Newsletter VIP</h2>
          <p className="text-slate-600 mb-8">Recibe una receta exclusiva con maridaje IA cada semana.</p>
          <form className="flex gap-2">
            <input type="email" placeholder="tu@email.com" className="flex-1 px-6 py-4 rounded-xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 outline-none" />
            <button className="px-8 py-4 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition">Suscribirme</button>
          </form>
        </div>
      </section>

      <footer className="py-12 text-center text-[10px] uppercase tracking-[0.3em] text-slate-400 border-t border-slate-100">
        © 2026 Win o Win Consulting — Gourmet Master Academy
      </footer>
    </div>
  )
}