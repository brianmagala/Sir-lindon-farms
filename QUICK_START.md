# Quick Start Guide

## Project Structure

This project has been organized into **Frontend** and **Backend** directories:

- **`frontend/`** - Next.js frontend application (React, UI components, public pages, admin dashboard)
- **`backend/`** - Database configuration and API setup (Prisma, environment variables)

## Installation & Setup (First Time)

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Set Up Environment Variables

In the `backend/` directory, create `.env.local` file:

```bash
# backend/.env.local

# Database (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/sir_lindon_farms"

# NextAuth Secret (generate: openssl rand -base64 32)
NEXTAUTH_SECRET="your-secret-key-here"

# Stripe (from https://stripe.com)
STRIPE_SECRET_KEY="sk_test_..."

# Optional: Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Step 3: Set Up Database

```bash
cd backend

# Run migrations
npm run prisma:migrate

# Verify setup
npm run prisma:generate
```

### Step 4: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 5: Set Up Frontend Environment Variables

In the `frontend/` directory, create `.env.local` file:

```bash
# frontend/.env.local

# Stripe Public Key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Optional: Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
```

## Running the Application

### Development Mode (Recommended)

**Terminal 1 - Start Frontend:**

```bash
cd frontend
npm run dev
```

**Terminal 2 (Optional) - View Database:**

```bash
cd backend
npm run prisma:studio
```

Then open:

- **Website**: http://localhost:3000
- **Prisma Studio** (Database GUI): http://localhost:5555

### Production Build

**Frontend:**

```bash
cd frontend
npm run build
npm run start
```

## Common Commands

### Frontend Commands

```bash
cd frontend
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Backend Commands

```bash
cd backend
npm run prisma:migrate    # Run database migrations
npm run prisma:generate   # Generate Prisma client
npm run prisma:studio     # Open Prisma Studio (DB GUI)
```

## Folder Organization

### Frontend Structure (`frontend/`)

- `app/` - Next.js pages and API routes
  - `api/` - API endpoints
  - `admin/` - Admin dashboard pages
  - `shop/` - Product pages
  - `**/` - Other public pages
- `components/` - Reusable React components
- `public/` - Static assets (images, icons)

### Backend Structure (`backend/`)

- `prisma/` - Database configuration
  - `schema.prisma` - Database schema
  - `migrations/` - Migration files
- `lib/` - Utilities (e.g., Prisma client)

## Environment Variables Checklist

### Backend Required

- ✅ `DATABASE_URL` - PostgreSQL connection
- ✅ `NEXTAUTH_SECRET` - Authentication secret

### Backend Optional

- ⚠️ `STRIPE_SECRET_KEY` - For payment processing
- ⚠️ Cloudinary keys - For image uploads

### Frontend Required

- ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - For Stripe

### Frontend Optional

- ⚠️ Cloudinary keys - For image uploads

## Troubleshooting

### Database Connection Error

```bash
# Check PostgreSQL is running and DATABASE_URL is correct
cd backend
npm run prisma:studio
```

### Port 3000 Already in Use

```bash
# Kill the process or use different port
cd frontend
npm run dev -- -p 3001
```

### Module Not Found Errors

```bash
# Reinstall dependencies
rm -r node_modules
npm install
```

### Prisma Errors

```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
```

## Next Steps

1. ✅ Install dependencies (frontend & backend)
2. ✅ Set up environment variables
3. ✅ Set up PostgreSQL database
4. ✅ Run `npm run prisma:migrate` in backend
5. ✅ Start dev servers (`npm run dev` in frontend)
6. ⚡ Visit http://localhost:3000

---

For more detailed information, see [README.md](README.md)
