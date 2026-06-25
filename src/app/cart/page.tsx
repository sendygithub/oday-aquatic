"use client";

import { useState, useEffect } from "react";
import { Trash2, ArrowRight, ShoppingBag, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { CartItem } from "@/types/cart.type";
import {
  getCart,
  updateCartItemQuantity,
  removeCartItem,
} from "../../../services/cart.service";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setIsLoading(true);
    try {
      const items = await getCart();
      setCart(items);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = async (id: string, delta: number) => {
    const result = await updateCartItemQuantity(id, delta);
    if (result.success) {
      setCart(result.cart);
    }
  };

  const handleRemoveItem = async (id: string) => {
    const result = await removeCartItem(id);
    if (result.success) {
      setCart(result.cart);
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 tracking-wide">
        <div className="max-w-4xl mx-auto text-center py-16">
          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            Memuat keranjang...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 tracking-wide">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-light text-zinc-100 uppercase tracking-[0.2em] mb-8 border-b border-zinc-900 pb-4 flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-amber-500" /> Keranjang Belanja
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-900 rounded-xl">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">
              Keranjang Anda masih kosong
            </p>
            <Link
              href="/"
              className="text-xs text-amber-500 uppercase tracking-wider hover:underline"
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
                    <div className="w-full h-full bg-amber-950/20 flex items-center justify-center text-[10px] text-zinc-600">
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
                      onClick={() => handleUpdateQuantity(item.id, -1)}
                      className="p-1.5 hover:text-amber-500 transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-2 text-xs font-mono text-zinc-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, 1)}
                      className="p-1.5 hover:text-amber-500 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
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
                <button className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-amber-600 hover:border-amber-600 hover:text-white rounded-lg py-3 text-xs font-medium tracking-widest uppercase transition-all flex items-center justify-center gap-2">
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
