# Juewei E-commerce Platform

A comprehensive e-commerce platform for Juewei (绝味) built with Next.js, Supabase, and Stripe.

## Features

- **User Authentication**: Email and phone number authentication
- **Product Catalog**: Browse products by category with search and filtering
- **Shopping Cart**: Add, modify, and manage cart items
- **Order Management**: Create, track, and manage orders
- **Payment Integration**: Stripe payments and cash-on-pickup options
- **Admin Panel**: Product and order management
- **Multi-language Support**: Chinese and English
- **Responsive Design**: Mobile-first approach

## Tech Stack

- **Frontend**: Next.js 15.x, React 19.x, TypeScript
- **Styling**: TailwindCSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Payments**: Stripe
- **Testing**: Jest, React Testing Library, Playwright
- **Internationalization**: next-intl

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd juewei-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

5. Set up the database:
```bash
# Run Supabase migrations
npx supabase db push
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── (auth)/         # Authentication routes
│   ├── (dashboard)/    # User dashboard
│   ├── (admin)/        # Admin panel
│   ├── api/            # API routes
│   └── globals.css
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   ├── auth/          # Authentication components
│   ├── cart/          # Shopping cart components
│   ├── product/       # Product display components
│   └── checkout/      # Checkout flow components
├── lib/               # Utility libraries
│   ├── auth.ts        # Authentication utilities
│   ├── db.ts          # Database utilities
│   ├── stripe.ts      # Payment utilities
│   └── utils.ts       # General utilities
├── types/             # TypeScript type definitions
└── hooks/             # Custom React hooks

tests/
├── components/        # Component tests
├── integration/       # Integration tests
└── e2e/              # End-to-end tests
```

## Development

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# All tests
npm run test:all
```

### Code Quality

```bash
# Linting
npm run lint

# Formatting
npm run format

# Type checking
npm run type-check
```

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.