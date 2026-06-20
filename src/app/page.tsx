import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/shared/ProductCard";

export default async function Home() {
  const products = await prisma.product.findMany();

  const formattedProducts = products.map((product) => ({
    ...product,
    image: product.imageUrl ?? "/placeholder.jpg",
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
