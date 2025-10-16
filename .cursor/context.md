# Cursor Agent Context: Juewei E-commerce Platform

**Last Updated**: 2024-12-19  
**Feature**: Juewei E-commerce Platform  
**Purpose**: Provide context for AI agents working on this e-commerce platform

## Project Overview

This is a comprehensive e-commerce platform for Juewei (绝味), a Chinese food brand. The platform enables customers to browse products, manage accounts, place orders, and complete payments online with support for both online payment and cash-on-pickup options, multi-language support (Chinese/English), and responsive design.

## Technology Stack

### Core Technologies
- **Framework**: Next.js 15.x with App Router
- **Language**: TypeScript 5.x, JavaScript ES2022
- **Styling**: TailwindCSS with shadcn/ui components
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Deployment**: Vercel

### Key Dependencies
```json
{
  "next": "15.x",
  "react": "19.x",
  "typescript": "5.x",
  "@supabase/supabase-js": "latest",
  "@stripe/stripe-js": "latest",
  "tailwindcss": "4.x",
  "next-intl": "latest",
  "react-hook-form": "latest",
  "zod": "latest",
  "lucide-react": "latest",
  "@radix-ui/react-slot": "latest"
}
```

## Architecture Decisions

### Authentication
- **Method**: Both email and phone number authentication supported
- **Provider**: Supabase Auth
- **Features**: Email/password, phone/SMS, password reset

### Order Management
- **Status Levels**: Basic (Ordered, Processing, Ready, Completed)
- **Tracking**: Real-time status updates
- **Notifications**: Email/SMS notifications

### Inventory Management
- **Approach**: No inventory integration (assume always in stock)
- **Future**: Can be enhanced with inventory system integration
- **Admin**: Can mark products as unavailable

### Multi-Language Support
- **Method**: Static translations (hardcoded text, separate content files)
- **Languages**: Chinese (zh) and English (en)
- **Implementation**: React i18n library
- **Content**: Separate translation files for each language

### Payment Processing
- **Primary**: Stripe for online payments
- **Secondary**: Cash on pickup option
- **Security**: PCI compliant through Stripe
- **Future**: PayPal, Apple Pay support

## Database Schema

### Key Tables
- `users` - User accounts and authentication
- `addresses` - User shipping/billing addresses  
- `categories` - Product categories with multi-language support
- `products` - Product catalog with multi-language support
- `cart_items` - Shopping cart items
- `orders` - Order information and payment details
- `order_items` - Individual order items

### Key Relationships
- Users have many orders and addresses
- Products belong to categories
- Orders contain multiple order items
- Cart items link users to products

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Products
- `GET /products` - List products with filtering
- `GET /products/{id}` - Get product details

### Cart
- `GET /cart` - Get user cart
- `POST /cart` - Add item to cart
- `PUT /cart/{itemId}` - Update cart item
- `DELETE /cart/{itemId}` - Remove cart item

### Orders
- `GET /orders` - Get user orders
- `POST /orders` - Create new order
- `GET /orders/{id}` - Get order details

### Payments
- `POST /payments/create-intent` - Create payment intent
- `POST /payments/confirm` - Confirm payment

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow Next.js App Router patterns
- Use TailwindCSS for styling
- Implement responsive design (mobile-first)
- Use shadcn/ui components when possible

### Testing
- Write unit tests for all components
- Implement integration tests for API endpoints
- Use Playwright for E2E testing
- Follow TDD approach for critical features

### Security
- Use Supabase RLS for data protection
- Never store payment information locally
- Encrypt sensitive user data
- Implement proper authentication checks

### Performance
- Optimize images with Next.js Image component
- Implement proper caching strategies
- Use database indexes for queries
- Minimize bundle size

## Common Patterns

### Component Structure
```typescript
// Component with props interface
interface ComponentProps {
  // Define props
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // Component logic
  return (
    <div className="tailwind-classes">
      {/* JSX content */}
    </div>
  )
}
```

### API Route Structure
```typescript
// API route with proper error handling
export async function GET(request: Request) {
  try {
    // API logic
    return Response.json(data)
  } catch (error) {
    return Response.json({ error: 'Message' }, { status: 500 })
  }
}
```

### Database Queries
```typescript
// Supabase query with proper typing
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('column', value)
```

## File Organization

### App Router Structure
```
src/app/
├── (auth)/           # Authentication routes
├── (dashboard)/      # User dashboard
├── (admin)/         # Admin panel
├── api/             # API routes
└── globals.css      # Global styles
```

### Component Organization
```
src/components/
├── ui/              # shadcn/ui components
├── auth/            # Authentication components
├── cart/            # Shopping cart components
├── product/         # Product display components
└── checkout/        # Checkout flow components
```

### Utility Organization
```
src/lib/
├── auth.ts          # Authentication utilities
├── db.ts            # Database utilities
├── stripe.ts        # Payment utilities
└── utils.ts        # General utilities
```

## Environment Variables

### Required Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret

### Optional Variables
- `NEXTAUTH_SECRET` - NextAuth secret
- `NEXTAUTH_URL` - NextAuth URL
- `SMTP_*` - Email configuration

## Deployment

### Vercel Configuration
- Automatic deployments from main branch
- Environment variables set in Vercel dashboard
- Custom domain configuration
- SSL certificates handled automatically

### Database Production
- Supabase production database
- Row Level Security enabled
- Automated backups
- Performance monitoring

## Common Issues and Solutions

### Authentication Issues
- Check Supabase configuration
- Verify environment variables
- Ensure proper RLS policies

### Payment Issues
- Verify Stripe keys
- Check webhook configuration
- Test with Stripe test cards

### Database Issues
- Check connection strings
- Verify RLS policies
- Monitor query performance

### Build Issues
- Clear Next.js cache
- Check TypeScript errors
- Verify all dependencies

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## Contact

For questions or issues:
- Check the project documentation
- Create GitHub issues
- Contact the development team
