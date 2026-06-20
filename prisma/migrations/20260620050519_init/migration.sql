-- CreateTable
CREATE TABLE "public"."products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "material" TEXT,
    "category" TEXT NOT NULL,
    "scale" TEXT,
    "badge" TEXT,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "year" DOUBLE PRECISION,
    "color_pattern" TEXT,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
