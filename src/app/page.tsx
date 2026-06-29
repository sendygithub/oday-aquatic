import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/shared/ProductCard";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import type { Product } from "@/lib/data";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Get unique categories from database
  const categories = [...new Set(products.map((p) => p.category))].sort();

  // Filter by category if selected
  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  const formattedProducts: Product[] = filteredProducts.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
    scale: product.scale ?? "",
    material: product.material ?? "",
    year: product.year ?? 0,
    image: product.imageUrl ?? "",
    category: product.category,
    badge: (product.badge as Product["badge"]) ?? null,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-950/20 via-zinc-950 to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-teal-900/40 bg-teal-950/20 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-teal-400 font-medium">
                Wellcome To Premium Aquatic Collection
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-zinc-100 tracking-tight leading-tight mb-6">
              SkyFish{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-amber-400 font-normal">
                Aquatic
              </span>
            </h1>
            <p className="text-sm md:text-base text-zinc-500 font-light max-w-xl mx-auto leading-relaxed">
              Menghadirkan koleksi ikan hias premium dan perlengkapan aquascape
              pilihan untuk para penghobi akuatik indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs & Products */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-light text-zinc-100 tracking-wide">
                Koleksi{" "}
                <span className="text-teal-500 font-normal">Tersedia</span>
              </h2>
              <p className="text-xs text-zinc-600 mt-1 tracking-wider uppercase">
                {filteredProducts.length} item{" "}
                {category ? `dalam kategori ${category}` : "di semua kategori"}
              </p>
            </div>
          </div>

          {/* Category Tabs */}
          <CategoryTabs
            categories={categories}
            activeCategory={category ?? null}
          />

          {/* Product Grid */}
          {formattedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {formattedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-zinc-900 rounded-xl bg-zinc-950/20 mt-8">
              <p className="text-xs text-zinc-600 uppercase tracking-widest">
                Belum ada produk di kategori ini
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
