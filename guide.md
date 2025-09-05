# Intaj Project Guide

## Overview
Intaj is an AI-powered SaaS automation  platform designed to help businesses and individuals create, customize, and deploy intelligent conversational AI assistants with minimal technical effort. The platform offers a robust set of features, seamless integrations, and a modern, scalable architecture.

---

## Project Goals
- Democratize access to advanced AI automation , chatbots , workflows for non-technical users
- Enable rapid onboarding and deployment of chatbots
- Provide a flexible, scalable, and secure platform for conversational AI
- Support multi-platform integrations (social, web, etc.)
- Offer analytics, knowledge management, and subscription-based monetization

---

## Key Features
- **Zero-Friction Onboarding:** Free tier, guided setup, no credit card required
- **AI-Powered Conversations:** Context-aware, multi-turn, human-like responses
- **Knowledge Management:** Upload files, manage FAQs, real-time updates
- **Analytics & Insights:** Track usage, feedback, and engagement
- **Subscription Plans:** Free, Pro, Business tiers with increasing limits
- **Platform Connections:** Integrate with WhatsApp, Facebook, Instagram, websites
- **AI Model Selection:** Choose from OpenRouter, Mistral, OpenAI, Google, Anthropic
- **Secure Credential Storage:** AES-256-GCM encryption for tokens
- **Professional UI/UX:** Modern, dark-themed, accessible design
- **User Data & Privacy:** GDPR-compliant export, privacy controls
- **Automation Ready:** Foundation for workflow automation and future integrations

---

## Data Model (Main Tables)
- **profiles:** User profiles, subscription data
- **chatbots:** Chatbot configs, platform/model selection
- **messages:** Conversation history, feedback
- **faqs:** Custom FAQ entries
- **data_sources:** Uploaded files/knowledge base
- **connections:** Platform integrations (Facebook, Instagram, WhatsApp, Website)

---

## Tech Stack
- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS, Shadcn UI
- **Backend:** Next.js App Router, Server Actions
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **AI:** OpenRouter (Mistral, OpenAI, Google, Anthropic)
- **Payments:** Stripe
- **Deployment:** Vercel

---

## Project Structure
- `src/app/` — Next.js App Router, routes for auth, dashboard, API, login
- `src/components/` — UI and feature components (dashboard, landing, inbox, etc.)
- `src/lib/` — Utilities (encryption, Supabase config, types)
- `public/assets/` — Static assets (favicons, images)
- `database_updates.sql` — Database schema and migrations

---

## Main Workflows
1. **User Onboarding:**
   - Signup (email/password, OAuth)
   - Guided checklist for first chatbot
   - Free tier limits enforced
2. **Chatbot Creation:**
   - Configure AI model, upload knowledge, set FAQs
   - Connect to platforms (Facebook, Instagram, WhatsApp, Website)
3. **Chat & Analytics:**
   - Real-time chat interface
   - Track messages, feedback, usage stats
4. **Subscription & Payments:**
   - Upgrade/downgrade plans
   - Stripe integration for billing
5. **Admin & Support:**
   - Help center, FAQs, contact support
   - GDPR-compliant data export

---

## Security & Privacy
- All platform tokens encrypted (AES-256-GCM)
- User data export and privacy controls
- Secure authentication via Supabase

---

## Deployment & Environment
- Local: `npm run dev` (requires .env.local)
- Production: Vercel (auto-deploy from GitHub)
- Environment variables for Supabase, OpenAI, Stripe, Facebook, etc.

---

## Extensibility & Roadmap
- Workflow automation (future)
- More AI model options
- Additional platform integrations
- Advanced analytics and reporting
- Enterprise features and consulting services

---

## References
- See `README.md` for setup, scripts, and detailed feature list
- Database schema: `database_updates.sql`
- UI components: `src/components/`
- Utilities: `src/lib/`

---

**Intaj** — Transform your customer interactions with AI-powered chatbots.
