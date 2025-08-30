# Intaj - AI Chatbot SaaS Platform

Intaj is a comprehensive AI-powered chatbot platform that enables businesses and individuals to create, customize, and deploy intelligent conversational AI assistants without any technical expertise.

## 🚀 Features

### **Zero-Friction Free Tier**
- **1 Free Chatbot**: Create your first AI assistant at no cost
- **100 Messages/month**: Test and validate your chatbot
- **Guided Onboarding**: Step-by-step setup process for new users
- **No Credit Card Required**: Start building immediately

### **AI-Powered Intelligence**
- Natural language processing with context awareness
- Human-like responses that feel authentic and helpful
- Multi-turn conversations that maintain context
- Customizable personality and brand voice

### **Knowledge Management**
- Upload documents, PDFs, and text files
- Create custom FAQs for common questions
- Real-time knowledge updates
- Intelligent information retrieval

### **Analytics & Insights**
- Track conversation metrics and engagement
- Monitor chatbot performance with detailed conversation history
- Provide feedback on AI responses to improve quality
- Identify popular topics and user pain points
- Measure customer satisfaction through feedback

### **Subscription Plans**
- **Free**: 1 chatbot, 100 messages/month
- **Pro**: 5 chatbots, 10,000 messages/month, file uploads
- **Business**: Unlimited chatbots, 50,000 messages/month, API access

### **Help & Support**
- Comprehensive documentation and FAQs
- Quick start guide for new users
- Contact support via email
- Best practices and tips for success

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI components
- **Backend**: Next.js App Router, Server Actions
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: OpenAI GPT models
- **Payments**: Stripe
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-chatbot-saas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   OPENAI_API_KEY=your_openai_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. **Set up the database**
   Run the SQL scripts in your Supabase SQL Editor to create the necessary tables and policies.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/        # Protected dashboard routes
│   │   └── help/          # Help & documentation page
│   ├── api/               # API routes
│   ├── auth/              # Authentication routes
│   └── login/             # Login page
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── landing/           # Landing page components
│   └── ui/               # Reusable UI components
└── lib/                  # Utility libraries
    ├── supabase/         # Supabase client configuration
    └── types.ts          # TypeScript type definitions
```

## 🎯 Key Features Implementation

### **Zero-Friction Onboarding**
- Guided checklist for new users
- Free tier with immediate access
- No payment barriers during signup
- Step-by-step chatbot creation process

### **Smart Routing**
- Automatic redirects based on authentication status
- Protected routes with proper access control
- Seamless user experience flow

### **Type Safety**
- Comprehensive TypeScript implementation
- Strong typing for all data structures
- Error-free development experience

### **Production Ready**
- Server-side logging for debugging
- Error handling and user feedback
- Responsive design for all devices
- Optimized performance with Next.js

## 🔧 Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### **Database Schema**
The application uses the following main tables:
- `profiles` - User profiles and subscription data
- `chatbots` - Chatbot configurations
- `messages` - Conversation history for analytics (with feedback)
- `faqs` - Custom FAQ entries
- `data_sources` - Uploaded knowledge base files

**Recent Updates:**
- Added `feedback` column to `messages` table for user feedback on AI responses
- Created `feedback_status` ENUM type for consistent feedback values

## 🚀 Deployment

### **Vercel Deployment**
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Environment Variables**
Ensure all required environment variables are set in your production environment:
- Supabase configuration
- OpenAI API key
- Stripe keys
- Webhook secrets

## 📈 Analytics & Monitoring

The platform includes comprehensive logging and analytics:
- Server-side logging for debugging production issues
- Real-time conversation tracking
- User engagement metrics
- Performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

---

**Intaj** - Transform your customer interactions with AI-powered chatbots.
