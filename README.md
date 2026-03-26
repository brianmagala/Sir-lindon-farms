# Sir Lindon Farms - E-Commerce Platform

A full-stack agricultural e-commerce website for Sir Lindon Farms, featuring a modern public storefront and a secure admin dashboard for complete farm management.

## Features

### Public Website
- **Beautiful Homepage**: Hero section, product categories, achievements showcase, and customer testimonials
- **Product Shop**: Browse and filter farm products by category
- **Achievements Page**: Historic timeline of farm milestones and certifications
- **Gallery**: Visual tour of the farm and facilities
- **About Page**: Farm mission, values, and company information
- **Contact**: Get in touch with the farm
- **Responsive Design**: Fully mobile-responsive design using Tailwind CSS

### Admin Dashboard
- **Product Management**: Add, edit, and delete farm products with image uploads
- **Farm Records**: Maintain detailed records of farm operations and harvest data
- **Contracts**: Manage and assign farm contracts to specific users
- **Order Management**: Track and manage customer orders
- **User Management**: Manage customer and admin accounts
- **Dashboard Overview**: Quick statistics and actions

## Color Scheme
- **Primary**: `#013E37` (Dark Green) - Used for headers, text, and primary buttons
- **Accent**: `#FFEFB3` (Pale Yellow) - Used for backgrounds and highlights
- **Supporting**: Gray scale from `#FAFAFA` to `#212121`

## Tech Stack

### Frontend
- **Next.js 13** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Radix UI** - Accessible component library

### Backend & Database
- **Next.js API Routes** - Server-side logic
- **Prisma ORM** - Database abstraction
- **PostgreSQL** - Relational database

### Authentication & Payments
- **NextAuth.js** - User authentication and authorization
- **Stripe** - Payment processing
- **Cloudinary** - Image storage and optimization

## Project Structure

```
sir-lindon-farms/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout with Header & Footer
│   ├── globals.css               # Global styles
│   ├── shop/                     # Shop page
│   ├── achievements/             # Achievements page
│   ├── about/                    # About page
│   ├── gallery/                  # Gallery page
│   ├── contact/                  # Contact page
│   ├── login/                    # Login page
│   ├── cart/                     # Shopping cart
│   └── admin/                    # Admin dashboard
│       ├── layout.tsx            # Admin sidebar layout
│       ├── page.tsx              # Dashboard home
│       ├── products/             # Product management
│       ├── records/              # Farm records
│       ├── contracts/            # Contracts management
│       ├── orders/               # Order management
│       └── users/                # User management
├── components/                   # Reusable React components
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer with contact info
│   ├── HeroSection.tsx           # Hero banner
│   ├── CategoriesGrid.tsx        # Category showcase
│   ├── AchievementsSection.tsx   # Stats and achievements
│   └── TestimonialSection.tsx    # Customer testimonials
├── prisma/
│   └── schema.prisma             # Database schema
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind CSS config
├── postcss.config.js             # PostCSS config
└── .env.local                    # Environment variables (local)
```

## Getting Started

### Prerequisites
- Node.js 18+ or higher
- npm or yarn
- PostgreSQL database (local or cloud-based)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd sir-lindon-farms
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Copy `.env.example` to `.env.local` and fill in your configuration:
   ```bash
   cp .env.example .env.local
   ```

   Update the following in `.env.local`:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXTAUTH_URL` - Your app's URL (http://localhost:3000 for development)
   - `NEXTAUTH_SECRET` - A random secret key
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
   - `STRIPE_SECRET_KEY` - Stripe secret key

4. **Set up the database:**
   ```bash
   npx prisma migrate dev
   ```

5. **Seed the database (optional):**
   ```bash
   npx prisma db seed
   ```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Pages Overview

### Public Pages
- `/` - Homepage with featured products and achievements
- `/shop` - Product listing with filters
- `/achievements` - Farm timeline and certifications
- `/about` - About the farm
- `/gallery` - Photo gallery
- `/contact` - Contact form
- `/login` - User login

### Admin Pages (Protected)
- `/admin` - Dashboard overview
- `/admin/products` - Manage products
- `/admin/records` - Farm records management
- `/admin/contracts` - Contract management
- `/admin/orders` - Order tracking
- `/admin/users` - User management

## Database Schema

### Key Models
- **User** - Customer and admin accounts
- **Product** - Farm products with pricing and descriptions
- **Order** - Customer orders
- **FarmRecord** - Internal farm data and operations
- **Contract** - Farm contracts with assign user access
- **Achievement** - Farm milestones and certifications

See `prisma/schema.prisma` for complete schema details.

## Authentication

The application uses NextAuth.js for authentication with support for:
- Email/password authentication
- OAuth providers (can be configured)
- Role-based access control (Admin/Customer)

Admin access is restricted to users with the `admin` role. Protected routes redirect unauthorized users.

## Animations & Interactions

- **Scroll Fade-In**: Content elements fade in as they come into view
- **Count-Up Numbers**: Animated counter for statistics
- **Hover Effects**: Category cards have elegant hover overlay effects
- **Smooth Transitions**: All interactive elements have smooth CSS transitions

## Deployment

The application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy with `npm run build`

## API Routes

Additional API routes can be created in the `app/api/` directory:
- `/api/products` - Product CRUD operations
- `/api/upload` - Image upload handling
- `/api/checkout` - Stripe checkout sessions
- `/api/orders` - Order management

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## Support

For support, email contact@sirlindonfarms.com or call +1 (234) 567-8900

## License

This project is proprietary and confidential.

---

**Created**: March 2026
**Version**: 1.0.0
