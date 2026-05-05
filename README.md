# Sir Lindon Farms - E-Commerce Platform

A full-stack agricultural e-commerce website for Sir Lindon Farms, featuring a modern public storefront and a secure admin dashboard for complete farm management.

## 📁 Project Structure

The project is organized into **Frontend** and **Backend** directories for better separation of concerns:

```
sir-lindon-farms/
├── frontend/                     # Next.js Frontend Application
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Root layout with Header & Footer
│   │   ├── globals.css           # Global styles
│   │   ├── shop/                 # Shop page and product details
│   │   ├── achievements/         # Achievements page
│   │   ├── about/                # About page
│   │   ├── gallery/              # Gallery page
│   │   ├── contact/              # Contact page
│   │   ├── login/                # Login page
│   │   ├── cart/                 # Shopping cart
│   │   └── admin/                # Admin dashboard
│   │       ├── layout.tsx        # Admin sidebar layout
│   │       ├── page.tsx          # Dashboard home
│   │       ├── products/         # Product management
│   │       ├── records/          # Farm records
│   │       ├── contracts/        # Contracts management
│   │       ├── orders/           # Order management
│   │       ├── gallery/          # Gallery management
│   │       ├── slider/           # Slider management
│   │       ├── stats/            # Stats management
│   │       └── users/            # User management
│   ├── components/               # Reusable React components
│   ├── public/                   # Static assets (images, icons)
│   ├── package.json              # Frontend dependencies
│   ├── tsconfig.json             # TypeScript configuration
│   ├── tailwind.config.ts        # Tailwind CSS configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── next.config.js            # Next.js configuration
│   ├── next-env.d.ts             # Next.js TypeScript definitions
│   ├── .eslintrc.json            # ESLint configuration
│   └── .gitignore                # Git ignore rules for frontend
│
├── backend/                      # Backend API & Database
│   ├── prisma/                   # Prisma ORM
│   │   ├── schema.prisma         # Database schema
│   │   └── migrations/           # Database migrations
│   ├── lib/                      # Backend utilities
│   │   └── prisma.ts             # Prisma client instance
│   ├── package.json              # Backend dependencies
│   ├── .env                      # Backend environment variables (local)
│   ├── .env.local                # Local environment overrides
│   ├── .env.example              # Environment variable template
│   └── .gitignore                # Git ignore rules for backend
│
├── package.json                  # Root package configuration
├── .gitignore                    # Root-level git ignore rules
├── README.md                     # This file
└── SETUP.md                      # Detailed setup instructions
```

## 🎨 Features

### Public Website

- **Beautiful Homepage**: Hero section, product categories, achievements showcase, and customer testimonials
- **Product Shop**: Browse and filter farm products by category and price range
- **Achievements Page**: Historic timeline of farm milestones and certifications
- **Gallery**: Visual tour of the farm and facilities
- **About Page**: Farm mission, values, and company information
- **Contact**: Get in touch with the farm
- **Responsive Design**: Fully mobile-responsive design using Tailwind CSS
- **Animated Experience**: Grid-motion hero background, blur-text headings, and smooth SVG-based icons

### Admin Dashboard

- **Product Management**: Add, edit, and delete farm products with image uploads
- **Farm Records**: Maintain detailed records of farm operations and harvest data
- **Contracts**: Manage and assign farm contracts to specific users
- **Order Management**: Track and manage customer orders
- **User Management**: Manage customer and admin accounts
- **Achievements Stats Management**: Create and manage homepage achievement metrics
- **Achievements Slider Management**: Upload, list, and delete images used in the homepage achievements slideshow
- **Dashboard Overview**: Quick statistics and actions

## 🎨 Color Scheme

- **Primary**: `#013E37` (Dark Green) - Used for headers, text, and primary buttons
- **Accent**: `#FFEFB3` (Pale Yellow) - Used for backgrounds and highlights
- **Supporting**: Gray scale from `#FAFAFA` to `#212121`

## 💻 Tech Stack

### Frontend

- **Next.js 13** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Radix UI** - Accessible component library
- **NextAuth.js** - User authentication

### Backend & Database

- **Next.js API Routes** - Server-side logic (located in `frontend/app/api/`)
- **Prisma ORM** - Database abstraction
- **PostgreSQL** - Relational database
- **Stripe** - Payment processing

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or higher
- **npm** or **yarn**
- **PostgreSQL** database (local or cloud-based)

### Development Setup (Recommended - Separate Frontend & Backend)

#### 1. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Set up environment variables
# Copy .env.example to .env.local and fill in your values
cp .env.example .env.local

# Edit .env.local with your configuration:
# DATABASE_URL="postgresql://user:password@localhost:5432/sir_lindon_farms"
# STRIPE_SECRET_KEY="sk_test_..."
# NEXTAUTH_SECRET="(generate with: openssl rand -base64 32)"

# Run database migrations
npm run prisma:migrate

# Verify Prisma setup
npm run prisma:generate
```

#### 2. Setup Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Verify the frontend configuration
npm run lint
```

#### 3. Run Development Servers

**Terminal 1 - Database/Backend (Optional - for viewing database):**

```bash
cd backend
npm run prisma:studio  # Opens Prisma Studio at http://localhost:5555
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` to see your website!

### Environment Variables Setup

#### Backend (.env.local in `backend/` directory)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/sir_lindon_farms"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Optional: Cloudinary for image uploads
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

#### Frontend (.env.local in `frontend/` directory)

```env
# Stripe (Public)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# API Base URL (if using separate API server)
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Optional: Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
```

## 📝 Detailed Setup Instructions

### Setting Up PostgreSQL Database

**Option 1: Local PostgreSQL**

1. Download and install PostgreSQL from https://www.postgresql.org/download/
2. Create a new database: `sir_lindon_farms`
3. Update `DATABASE_URL` in `backend/.env.local`

**Option 2: Cloud Database**

- **Vercel Postgres**: https://vercel.com/docs/storage/vercel-postgres
- **Supabase**: https://supabase.io/ (PostgreSQL hosting)
- **Heroku Postgres**: https://www.heroku.com/postgres

### Setting Up External Services

#### Stripe (Payment Processing)

1. Create account at https://stripe.com
2. Get API keys from Stripe Dashboard
3. Add to `backend/.env.local`:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   ```
4. Add to `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

#### NextAuth.js (Authentication)

1. Generate a secret:
   ```bash
   openssl rand -base64 32
   ```
2. Add to `backend/.env.local`:
   ```env
   NEXTAUTH_SECRET="your-generated-secret"
   ```

#### Cloudinary (Image Storage - Optional)

1. Sign up at https://cloudinary.com
2. Get credentials from dashboard
3. Add to `backend/.env.local`:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

## 🗄️ Database Migrations

### Creating New Migrations

```bash
cd backend

# After modifying schema.prisma:
npm run prisma:migrate
```

### Viewing Database

```bash
cd backend
npm run prisma:studio
```

This opens Prisma Studio at `http://localhost:5555` where you can view and edit database records.

## 🏗️ Building for Production

### Build Frontend

```bash
cd frontend
npm run build
npm run start
```

### Build Backend

The backend runs on Next.js API routes (included in frontend/app/api/), so there's no separate backend build. API routes are built with the frontend.

## 📦 Scripts Reference

### Frontend Scripts (in `frontend/`)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend Scripts (in `backend/`)

- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:studio` - Open Prisma Studio GUI

## Pages Overview

### Public Pages

- `/` - Homepage with featured products and achievements
- `/shop` - Product listing with filters
- `/shop/[id]` - Product details
- `/achievements` - Farm timeline and certifications
- `/about` - About the farm
- `/gallery` - Photo gallery
- `/contact` - Contact form
- `/login` - User login
- `/cart` - Shopping cart

### Admin Pages (Protected)

- `/admin` - Dashboard overview
- `/admin/products` - Manage products
- `/admin/records` - Farm records management
- `/admin/contracts` - Contract management
- `/admin/orders` - Order tracking
- `/admin/users` - User management
- `/admin/gallery` - Gallery management
- `/admin/slider` - Slider management
- `/admin/stats` - Achievement stats management

## 🔐 Admin Credentials

Create your first admin account:

1. Visit `http://localhost:3000/login` in development
2. Sign up with your credentials
3. Access admin dashboard at `http://localhost:3000/admin`

## Deployment

The application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Set environment variables in Vercel dashboard:
   - All variables from `backend/.env.local`
   - All variables from `frontend/.env.local`
4. Deploy the `frontend/` directory as the root

## API Routes

API routes are located in `frontend/app/api/` and include:

- `/api/products` - Product CRUD operations
- `/api/gallery` - Gallery management
- `/api/gallery-upload` - Gallery image uploads
- `/api/slider` - Slider management
- `/api/slider-upload` - Slider image uploads
- `/api/stats` - Achievement stats management
- `/api/upload` - General image upload handling
- `/api/stats/[id]` - Individual stat management

## 🐛 Troubleshooting

### "Cannot find module '@prisma/client'"

```bash
cd backend
npm install
npm run prisma:generate
```

### Database Connection Error

- Verify `DATABASE_URL` in `backend/.env.local` is correct
- Ensure PostgreSQL is running
- Check credentials and database name

### Port 3000 Already in Use

```bash
# On Windows, find and kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
cd frontend
npm run dev -- -p 3001
```

### Missing Environment Variables

- Ensure both `frontend/.env.local` and `backend/.env.local` exist
- Check `.env.example` files for required variables
- Restart dev server after adding new variables

## 📞 Support

For support, email contact@sirlindonfarms.com or call +256 754158774

## 📄 License

This project is proprietary and confidential.

---

**Last Updated**: May 2026
**Version**: 2.0.0 (Frontend/Backend Separated)
