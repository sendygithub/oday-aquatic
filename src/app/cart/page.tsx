"use client";

import { useState } from "react";
import { Trash2, ArrowRight, ShoppingBag, Plus, Minus } from "lucide-react";
import Link from "next/link";

// Mock data internal untuk keranjang belanja
const INITIAL_CART = [
  {
    id: "gpy-001",
    name: "Guppy Albino Full Red (AFR)",
    price: 75000,
    quantity: 2,
    image: "/images/guppy-afr.jpg",
    strain: "Pure Strain Albino",
  },
  {
    id: "ttr-002",
    name: "Cardinal Tetra Premium XL",
    price: 12000,
    quantity: 10,
    image: "/images/cardinal-tetra.jpg",
    strain: "Cheirodon Axelrodi",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(INITIAL_CART);

  const updateQuantity = (id: string, delta: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 tracking-wide">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-light text-zinc-100 uppercase tracking-[0.2em] mb-8 border-b border-zinc-900 pb-4 flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-teal-600" /> Keranjang Akun
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-900 rounded-xl">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">
              Keranjang Anda masih kosong
            </p>
            <Link
              href="/product"
              className="text-xs text-teal-500 uppercase tracking-wider hover:underline"
            >
              Eksplorasi Galeri
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Daftar Item */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-zinc-900/20 border border-zinc-900 p-4 rounded-xl"
                >
                  <div className="w-16 h-16 bg-zinc-900 rounded-lg flex-shrink-0 overflow-hidden border border-zinc-800">
                    <div className="w-full h-full bg-teal-950/20 flex items-center justify-center text-[10px] text-zinc-600">
                      Foto
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-medium text-zinc-200 truncate">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-zinc-600 italic font-mono mt-0.5">
                      {item.strain}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                  {/* Kontrol Kuantitas */}
                  <div className="flex items-center border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/50">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1.5 hover:text-teal-500 transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-2 text-xs font-mono text-zinc-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1.5 hover:text-teal-500 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-zinc-600 hover:text-rose-400 p-1 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Ringkasan Belanja */}
            <div className="bg-zinc-900/30 border border-zinc-900 p-6 rounded-xl h-fit space-y-4">
              <h3 className="text-xs font-medium uppercase tracking-widest text-zinc-400 border-b border-zinc-900 pb-2">
                Ringkasan Biaya
              </h3>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Subtotal</span>
                <span className="font-mono">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="text-[10px] text-zinc-600 font-light border-t border-zinc-900 pt-3">
                *Belum termasuk biaya pengemasan karantina & ongkos kirim khusus
                spesimen hidup.
              </div>
              <Link href="/checkout" className="block pt-2">
                <button className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white rounded-lg py-3 text-xs font-medium tracking-widest uppercase transition-all flex items-center justify-center gap-2">
                  Lanjut Pembayaran <ArrowRight className="h-3 w-3" />
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
