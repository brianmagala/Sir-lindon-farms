-- Add featured flag to products
ALTER TABLE "products" ADD COLUMN "featured" BOOLEAN NOT NULL DEFAULT 0;