# 🍳 Gourmet Master Academy | Modular Payment Agent (SaaS Edition)

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Netlify](https://img.shields.io/badge/Netlify-Success-00C7B7?style=for-the-badge&logo=netlify)
![Stripe](https://img.shields.io/badge/Stripe-Payment_Agent-635BFF?style=for-the-badge&logo=stripe)
![n8n](https://img.shields.io/badge/n8n-Orchestrator-FF6D5A?style=for-the-badge&logo=n8n)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)

> **"Domina el arte de la cocina desde casa"**. Una plataforma SaaS de alta gama que implementa un **Agente de Pagos Modular** desacoplado para gestionar suscripciones recurrentes y personalización masiva mediante IA.

## 🏗️ Arquitectura del Sistema
El proyecto se basa en una arquitectura de **microservicios orquestados por eventos**, diseñada para ser totalmente reutilizable en otros sectores comerciales.

1. **Frontend (Netlify):** Interfaz elegante desarrollada en Next.js 14 que captura preferencias del usuario en el onboarding.
2. **Motor de Pagos (Stripe):** Gestión de suscripciones en tres niveles (Amateur, Cocinero, Chef) utilizando Price IDs dinámicos.
3. **Cerebro (n8n):** Orquestador que recibe webhooks, valida el pago y coordina la lógica de negocio.
4. **Capa de Inteligencia (Claude 3.5 Sonnet):** Generación de menús semanales de temporada basados en la fecha actual y alergias del usuario.
5. **Persistencia (Supabase):** Gestión de perfiles, niveles de acceso y auditoría de interacciones de IA.

## 🤖 El "Sommelier" Digital
Tras un pago exitoso, el agente no solo envía una notificación, sino que genera valor real:
- **Identidad:** Tono elegante, experto y alentador.
- **Personalización Atómica:** Procesa alergias (vegano, sin gluten) y la temporalidad para crear el plan perfecto.
- **Entrega Automatizada:** Notificación vía Gmail con el plan gastronómico y consejos exclusivos.

## 🛠️ Stack Tecnológico
- **Frontend:** Next.js 14 + Tailwind CSS.
- **Backend/DB:** Supabase (PostgreSQL).
- **Pagos:** Stripe API (Test Mode).
- [cite_start]**Orquestación:** n8n[cite: 125, 167].
---
*Proyecto desarrollado por Ariadna Vega - Portfolio DAM*
