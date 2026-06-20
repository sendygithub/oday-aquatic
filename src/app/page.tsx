import { MOCK_PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/shared/ProductCard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      {/* Hero Section */}
      {/* Menggunakan perpaduan warna air tenang: Deep Ocean Teal ke Slate Grey yang sangat kalem */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#112229] via-[#0d161a] to-zinc-950 py-28 sm:py-36 border-b border-zinc-900">
        {/* Ornamen latar belakang riak air samar */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a3a45]/20 via-transparent to-transparent opacity-60" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-light tracking-[0.2em] text-zinc-100 uppercase">
            Exotic Scales & <br />
            <span className="text-zinc-400 font-normal block mt-2 text-2xl sm:text-3xl tracking-[0.3em]">
              Premium Aquatics
            </span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-zinc-400 font-light tracking-wide max-w-xl mx-auto leading-relaxed">
            Menghadirkan pesona ketenangan ekosistem akuatik eksotis dan kurasi
            ikan hias terbaik langsung ke ruang personal Anda.
          </p>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
            {/* Indikator kategori diubah menjadi garis tipis koral redup yang minimalis */}
            <h2 className="text-xl font-light text-zinc-300 tracking-[0.2em] uppercase border-l border-teal-600/50 pl-4">
              Koleksi <span className="text-zinc-500 font-normal">Pilihan</span>
            </h2>
          </div>

          {/* Grid Produk Ikan Hias */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
