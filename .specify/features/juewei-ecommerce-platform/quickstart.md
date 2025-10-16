# Quickstart Guide: Juewei E-commerce Platform

**Date**: 2024-12-19  
**Feature**: Juewei E-commerce Platform  
**Purpose**: Get the e-commerce platform running locally for development

## Prerequisites

### Required Software
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Git**: Latest version
- **Supabase CLI**: Latest version
- **Stripe CLI**: Latest version (for payment testing)

### Required Accounts
- **Supabase**: Create account at [supabase.com](https://supabase.com)
- **Stripe**: Create account at [stripe.com](https://stripe.com)
- **Vercel**: Create account at [vercel.com](https://vercel.com) (for deployment)

## Environment Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd juewei-app

# Install dependencies
npm install

# Install additional dependencies for e-commerce
npm install @supabase/supabase-js @stripe/stripe-js
npm install @stripe/stripe-js stripe
npm install next-intl
npm install react-hook-form @hookform/resolvers zod
npm install lucide-react
npm install @radix-ui/react-slot
npm install class-variance-authority
npm install tailwind-merge
```

### 2. Environment Variables

Create `.env.local` file in the project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Email Configuration (for notifications)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

### 3. Database Setup

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note down the project URL and anon key
4. Go to Settings > API to get the service role key

#### Run Database Migrations
```bash
# Initialize Supabase in your project
supabase init

# Link to your Supabase project
supabase link --project-ref your_project_ref

# Create and run migrations
supabase db push
```

#### Database Schema
The database schema includes the following tables:
- `users` - User accounts and authentication
- `addresses` - User shipping/billing addresses
- `categories` - Product categories
- `products` - Product catalog
- `cart_items` - Shopping cart items
- `orders` - Order information
- `order_items` - Individual order items

### 4. Stripe Setup

#### Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Create account and get API keys
3. Set up webhook endpoints for payment processing

#### Stripe Webhook Configuration
```bash
# Install Stripe CLI
# Follow instructions at https://stripe.com/docs/stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to local development
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Development Workflow

### 1. Start Development Server

```bash
# Start the development server
npm run dev

# The application will be available at http://localhost:3000
```

### 2. Database Management

#### View Database
```bash
# Open Supabase Studio
supabase studio

# Or access via web interface at your Supabase project URL
```

#### Run Queries
```bash
# Connect to database
supabase db shell

# Run SQL queries
psql -h your_db_host -p 5432 -U postgres -d postgres
```

### 3. Testing

#### Unit Tests
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch
```

#### Integration Tests
```bash
# Run integration tests
npm run test:integration
```

#### End-to-End Tests
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests in headed mode
npm run test:e2e:headed
```

### 4. Code Quality

#### Linting
```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint:fix
```

#### Type Checking
```bash
# Run TypeScript compiler
npm run type-check
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── (dashboard)/       # User dashboard
│   │   ├── profile/      # User profile
│   │   ├── orders/        # Order history
│   │   └── addresses/    # Address management
│   ├── (admin)/          # Admin panel
│   │   ├── products/     # Product management
│   │   ├── orders/       # Order management
│   │   └── users/        # User management
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication API
│   │   ├── products/     # Product API
│   │   ├── cart/         # Cart API
│   │   ├── orders/       # Order API
│   │   └── payments/     # Payment API
│   └── globals.css       # Global styles
├── components/           # Reusable components
│   ├── ui/              # shadcn/ui components
│   ├── auth/            # Authentication components
│   ├── cart/            # Shopping cart components
│   ├── product/         # Product display components
│   └── checkout/        # Checkout flow components
├── lib/                 # Utility libraries
│   ├── auth.ts          # Authentication utilities
│   ├── db.ts            # Database utilities
│   ├── stripe.ts        # Payment utilities
│   └── utils.ts         # General utilities
├── types/               # TypeScript definitions
└── hooks/               # Custom React hooks
```

## Key Features Implementation

### 1. Authentication
- User registration with email/phone
- Login with email/phone and password
- Password reset functionality
- Session management with Supabase Auth

### 2. Product Catalog
- Product browsing by category
- Product search functionality
- Product detail pages
- Multi-language support (Chinese/English)

### 3. Shopping Cart
- Add/remove products from cart
- Update quantities
- Cart persistence across sessions
- Cart total calculations

### 4. Checkout Process
- Address selection/entry
- Payment method selection
- Order confirmation
- Payment processing with Stripe

### 5. Order Management
- Order history
- Order status tracking
- Order details
- Reorder functionality

### 6. Admin Panel
- Product management
- Order processing
- User management
- Analytics dashboard

## Deployment

### 1. Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
# Go to Project Settings > Environment Variables
```

### 2. Environment Variables for Production

Set the following environment variables in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

### 3. Database Production Setup

```bash
# Run production migrations
supabase db push --linked

# Set up production database
supabase db reset --linked
```

## Troubleshooting

### Common Issues

#### 1. Supabase Connection Issues
```bash
# Check Supabase status
supabase status

# Restart Supabase services
supabase stop
supabase start
```

#### 2. Stripe Webhook Issues
```bash
# Check webhook events
stripe events list

# Test webhook locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

#### 3. Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 4. Database Issues
```bash
# Reset local database
supabase db reset

# Check database logs
supabase logs db
```

### Getting Help

1. **Documentation**: Check the project README and API documentation
2. **Issues**: Create GitHub issues for bugs and feature requests
3. **Discord**: Join the development Discord server
4. **Email**: Contact the development team

## Next Steps

1. **Set up your development environment** following the steps above
2. **Create your first product** in the admin panel
3. **Test the checkout flow** with Stripe test cards
4. **Customize the design** to match Juewei branding
5. **Add your product catalog** and content
6. **Deploy to production** when ready

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
