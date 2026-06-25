import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/shared/ProductCard";
import type { Product } from "@/lib/data";

export default async function Home() {
  const products = await prisma.product.findMany();

  const formattedProducts: Product[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
    scale: product.scale ?? "",
    material: product.material ?? "",
    year: product.year ?? 0,
    image: product.imageUrl ?? "/placeholder.jpg",
    category: product.category,
    badge: (product.badge as Product["badge"]) ?? null,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {formattedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
