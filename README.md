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

### **Platform Connections**
- Connect chatbots to WhatsApp, Facebook, Instagram, and websites
- Manage platform integrations from a central dashboard
- Assign specific chatbots to different platforms
- Secure credential storage for API keys and tokens

### **AI Model Selection**
- Choose from multiple AI models including free options
- OpenRouter integration for cost-effective AI access
- Per-chatbot model configuration
- Support for Mistral, OpenAI, Google, and Anthropic models

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI components
- **Backend**: Next.js App Router, Server Actions
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: OpenRouter (Mistral, OpenAI, Google, Anthropic models)
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
   OPENROUTER_API_KEY=your_openrouter_api_key
   OPENROUTER_MODEL=mistralai/mistral-7b-instruct:free
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   FACEBOOK_APP_ID=your_facebook_app_id
   FACEBOOK_APP_SECRET=your_facebook_app_secret
   ENCRYPTION_SECRET_KEY=your_32_character_encryption_key
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
│   ├── (auth)/            # Authentication routes
│   │   ├── signup/        # User registration
│   │   └── signout/       # Sign out handling
│   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── analytics/     # Analytics dashboard
│   │   ├── chatbots/      # Chatbot management
│   │   ├── connections/   # Platform connections
│   │   ├── dashboard/     # Main dashboard
│   │   ├── help/          # Help & documentation
│   │   ├── pricing/       # Subscription plans
│   │   └── profile/       # User profile settings
│   ├── api/               # API routes
│   │   └── auth/          # OAuth callbacks
│   └── login/             # Login page
├── components/            # React components
│   ├── dashboard/         # Dashboard components
│   │   ├── Sidebar.tsx    # Main navigation sidebar
│   │   └── ...            # Other dashboard components
│   ├── landing/           # Landing page components
│   └── ui/               # Reusable UI components
└── lib/                  # Utility libraries
    ├── encryption.ts      # Secure credential encryption
    ├── supabase/          # Supabase configuration
    └── types.ts           # TypeScript definitions
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

### **Platform Integration**
- **Facebook & Instagram OAuth**: Complete OAuth flow with secure credential storage
- **Secure Credential Encryption**: AES-256-GCM encryption for all platform tokens
- **Multi-Platform Deployment**: Connect chatbots to WhatsApp, Facebook, Instagram, and websites
- **Real-Time Connection Management**: Visual platform connection dashboard
- **Automatic Instagram Detection**: Automatically discover Instagram accounts linked to Facebook Pages

### **Professional AI Theme**
- **60/30/10 Color Rule**: Deep dark blue (60%), lighter dark blue (30%), vibrant teal accent (10%)
- **Dark Theme by Default**: Professional, modern appearance
- **High Contrast**: Optimized for readability and accessibility
- **Consistent Branding**: Unified color system throughout the application

### **User Data & Privacy**
- **Data Export Functionality**: GDPR-compliant data export requests
- **Profile Management**: Comprehensive account information and settings
- **Privacy Controls**: User data management and export capabilities
- **Trust Building**: Transparent data handling and user control

### **Interactive User Experience**
- **Dashboard Demo Agent**: AI-powered guidance for new users
- **Smart Suggestions**: Quick-start question buttons for common queries
- **Real-Time AI Responses**: Live chat interface with OpenRouter integration
- **User Onboarding**: Guided experience for first-time users
- **Dynamic Content Hub**: AI news feed, success stories, and consulting services
- **Engagement Features**: Real-time news, motivational content, and professional services

### **Future-Ready Architecture**
- **Automation Framework**: Foundation for complex workflow automation
- **Workflow Navigation**: Sidebar integration for upcoming features
- **Scalable Design**: Easy to add new automation types and integrations
- **Product Vision**: Clear roadmap for advanced automation capabilities

### **Business Model & Revenue Streams**
- **Multi-Tier Pricing**: Free, Pro, Business, and Enterprise tiers
- **Enterprise Solutions**: Custom AI agents and workflow automation
- **Consulting Services**: ML, DL, NLP, and SEO expertise
- **Strategic Partnerships**: Integration with rabt.nabih.tech for development

## 🔧 Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### **Database Schema**
The application uses the following main tables:
- `profiles` - User profiles and subscription data
- `chatbots` - Chatbot configurations (with platform connections and AI model selection)
- `messages` - Conversation history for analytics (with feedback)
- `faqs` - Custom FAQ entries
- `data_sources` - Uploaded knowledge base files
- `connections` - Platform integrations (Facebook, Instagram, WhatsApp, Website)

**Recent Updates:**
- Added `feedback` column to `messages` table for user feedback on AI responses
- Created `feedback_status` ENUM type for consistent feedback values
- Added `connections` table for platform integrations
- Added `connection_id` and `model` columns to `chatbots` table
- Implemented Facebook & Instagram OAuth integration
- Added secure credential encryption for platform tokens

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
