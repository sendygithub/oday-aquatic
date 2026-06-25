import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Product } from "@/lib/data";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group overflow-hidden border-zinc-900 bg-zinc-950 transition-all duration-500 hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.05)] flex flex-col h-full rounded-lg">
      <CardHeader className="p-0 relative aspect-square overflow-hidden bg-zinc-900">
        <Link
          href={`/product/${product.id}`}
          className="absolute inset-0 z-10 block"
        >
          <span className="sr-only">View {product.name}</span>
        </Link>

        {/* Gambar Produk dari Database / Vercel Blob */}
        {product.image && product.image !== "/placeholder.jpg" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          /* Placeholder Image Premium: Gradasi radial bawah air yang elegan */
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-zinc-950 to-black flex flex-col items-center justify-center p-6 text-center transition-transform duration-700 group-hover:scale-105">
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 mb-2 font-medium">
              {product.category}
            </div>
            <div className="text-lg font-light tracking-wide text-zinc-400 max-w-[80%]">
              {product.name}
            </div>
          </div>
        )}

        {/* Badge minimalis di pojok atas */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
          {product.badge && (
            <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20 backdrop-blur-md rounded-none px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase">
              {product.badge}
            </Badge>
          )}
          {/* Mengubah 'scale' menjadi penanda kualitas (misal: Grade A+ / F4) */}
          {product.scale && (
            <Badge
              variant="outline"
              className="bg-zinc-950/40 text-zinc-400 backdrop-blur-md border-zinc-900 rounded-none text-[10px] w-fit px-2"
            >
              {product.scale}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-5 flex-grow flex flex-col justify-between bg-zinc-950">
        <div className="space-y-3">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-medium text-base text-zinc-200 tracking-wide leading-snug line-clamp-2 transition-colors group-hover:text-amber-400">
              {product.name}
            </h3>
            {/* Mengubah 'year' menjadi indikator ukuran ikan (misal: 15cm, 20cm) */}
            {product.year && (
              <span className="text-[10px] tracking-widest text-zinc-500 font-mono border border-zinc-900 px-1.5 py-0.5 rounded">
                {product.year}
              </span>
            )}
          </div>
          <p className="text-amber-500 font-medium text-lg tracking-wide">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 bg-zinc-950">
        <AddToCartButton productId={product.id} />
      </CardFooter>
    </Card>
  );
}
