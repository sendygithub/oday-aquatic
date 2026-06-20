import { MOCK_PRODUCTS } from "@/lib/data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, Scale } from "lucide-react";
import Link from "next/link";

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const product = MOCK_PRODUCTS.find((p) => p.id === resolvedParams.id);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link
                href="/"
                className="inline-flex items-center text-zinc-400 hover:text-[#FFD100] mb-8 transition-colors"
            >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
            </Link>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                {/* Left: Image */}
                <div className="relative aspect-square bg-zinc-900 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-zinc-800 flex items-center justify-center p-12">
                    <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 via-zinc-800/50 to-zinc-900"></div>
                    <div className="relative z-10 text-center">
                        <div className="text-6xl font-black italic tracking-widest text-[#FFD100]/20 mb-4">{product.category}</div>
                        <div className="text-3xl font-bold text-zinc-500 drop-shadow-xl">{product.name}</div>
                    </div>

                    {product.badge && (
                        <Badge
                            className={`absolute top-6 left-6 text-sm px-4 py-1.5 ${product.badge === "New Arrival"
                                    ? "bg-[#FF6B8B] text-white border-none"
                                    : "bg-red-600 text-white border-none"
                                }`}
                        >
                            {product.badge}
                        </Badge>
                    )}
                </div>

                {/* Right: Details */}
                <div className="flex flex-col justify-center">
                    <Badge variant="outline" className="w-fit mb-4 bg-zinc-900 border-[#FFD100]/30 text-[#FFD100]">
                        {product.category}
                    </Badge>
                    <h1 className="text-4xl sm:text-5xl font-black text-white italic tracking-tight mb-2">
                        {product.name}
                    </h1>
                    <p className="text-2xl font-bold text-[#FFD100] mb-8">
                        Rp {product.price.toLocaleString("id-ID")}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-zinc-900 p-4 rounded-xl flex flex-col items-center justify-center border border-zinc-800 text-center">
                            <Scale className="h-6 w-6 text-zinc-400 mb-2" />
                            <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Scale</div>
                            <div className="text-white font-medium">{product.scale}</div>
                        </div>
                        <div className="bg-zinc-900 p-4 rounded-xl flex flex-col items-center justify-center border border-zinc-800 text-center">
                            <ShieldCheck className="h-6 w-6 text-zinc-400 mb-2" />
                            <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Material</div>
                            <div className="text-white font-medium">{product.material}</div>
                        </div>
                        <div className="bg-zinc-900 p-4 rounded-xl flex flex-col items-center justify-center border border-zinc-800 text-center">
                            <Truck className="h-6 w-6 text-zinc-400 mb-2" />
                            <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Year</div>
                            <div className="text-white font-medium">{product.year}</div>
                        </div>
                    </div>

                    <p className="text-zinc-400 leading-relaxed mb-8">
                        Koleksi diecast premium {product.name} dengan detail presisi tinggi.
                        Dibuat dengan bahan {product.material} berkualitas dan akurasi skala {product.scale}.
                        Sangat cocok untuk kolektor ataupun sebagai hadiah spesial.
                    </p>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="text-sm font-medium text-zinc-300">
                            <span className="text-[#FFD100] font-bold">{product.stock}</span> items left in stock
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="flex-1 bg-gradient-to-r from-[#FFD100] to-[#FF8E53] hover:from-[#FF8E53] hover:to-[#FF6B8B] text-white font-black py-6 text-lg tracking-wide uppercase transition-all shadow-[0_4px_20px_rgba(255,139,0,0.4)] hover:shadow-[0_6px_25px_rgba(255,139,0,0.6)] hover:scale-[1.02]">
                            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                        </Button>
                        <Button variant="outline" className="py-6 border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:text-white text-zinc-300 transition-colors uppercase font-bold tracking-wider">
                            Add to Wishlist
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
