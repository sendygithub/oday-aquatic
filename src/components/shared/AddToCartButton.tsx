"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToCart } from "../../../services/cart.service";

type AddToCartButtonProps = {
  productId: string;
  className?: string;
};

export function AddToCartButton({
  productId,
  className,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await addToCart(productId);

      if (result.success) {
        // Redirect to cart page after successful add
        router.push("/cart");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Gagal menambahkan ke keranjang.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={
        className ??
        "w-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-black hover:bg-amber-500 hover:border-amber-500 rounded-none transition-all duration-300 relative overflow-hidden z-20 text-xs font-medium tracking-widest uppercase"
      }
    >
      <ShoppingCart className="mr-2 h-3.5 w-3.5" />
      {isLoading ? "Memproses..." : "Add Cart"}
    </Button>
  );
}
