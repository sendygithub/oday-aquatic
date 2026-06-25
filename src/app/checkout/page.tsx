"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Package, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CartItem } from "@/types/cart.type";
import { getCart, clearCart } from "../../../services/cart.service";

const checkoutSchema = z.object({
  fullName: z.string().min(2, { message: "Nama minimal 2 karakter." }),
  address: z.string().min(10, { message: "Harap berikan alamat lengkap." }),
  city: z.string().min(2, { message: "Kota wajib diisi." }),
  postalCode: z.string().min(4, { message: "Kode pos wajib diisi." }),
  phone: z.string().min(9, { message: "Nomor telepon valid wajib diisi." }),
});

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<{
    success: boolean;
    message: string;
    data?: any;
  } | null>(null);

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
    },
  });

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

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCost = 15000;
  const total = subtotal + shippingCost;

  async function onSubmit(values: z.infer<typeof checkoutSchema>) {
    if (cart.length === 0) {
      alert("Keranjang belanja kosong!");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          shippingInfo: values,
        }),
      });

      const result = await response.json();
      setOrderResult(result);

      if (result.success) {
        // Clear cart after successful checkout
        await clearCart();
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setOrderResult({
        success: false,
        message: "Terjadi kesalahan saat memproses pesanan.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 tracking-wide">
        <div className="max-w-4xl mx-auto text-center py-16">
          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            Memuat data checkout...
          </p>
        </div>
      </div>
    );
  }

  // Tampilkan hasil order setelah sukses
  if (orderResult?.success) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 tracking-wide">
        <div className="max-w-2xl mx-auto text-center">
          <div className="border border-emerald-500/30 bg-emerald-950/10 rounded-xl p-12">
            <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
            <h1 className="text-2xl font-light text-zinc-100 uppercase tracking-[0.2em] mb-4">
              Pesanan Berhasil!
            </h1>
            <p className="text-sm text-zinc-400 mb-2">{orderResult.message}</p>
            <p className="text-xs text-zinc-500 font-mono mb-8">
              Order ID: {orderResult.data?.orderId}
            </p>
            <div className="bg-zinc-900/30 border border-zinc-900 rounded-xl p-6 mb-8 text-left space-y-3">
              <h3 className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                Ringkasan Pesanan
              </h3>
              {orderResult.data?.items?.map((item: CartItem, idx: number) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="text-zinc-300">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-mono text-zinc-400">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
              <div className="border-t border-zinc-800 pt-3 mt-3 space-y-2">
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Subtotal</span>
                  <span className="font-mono">
                    Rp {orderResult.data?.subtotal?.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Ongkos Kirim</span>
                  <span className="font-mono">
                    Rp {orderResult.data?.shippingCost?.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-amber-500 font-medium pt-2 border-t border-zinc-800">
                  <span>Total</span>
                  <span className="font-mono">
                    Rp {orderResult.data?.total?.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/"
              className="inline-block bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-amber-600 hover:border-amber-600 hover:text-white rounded-lg py-3 px-8 text-xs font-medium tracking-widest uppercase transition-all"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Tampilkan error jika checkout gagal
  if (orderResult && !orderResult.success) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 tracking-wide">
        <div className="max-w-2xl mx-auto text-center">
          <div className="border border-rose-500/30 bg-rose-950/10 rounded-xl p-12">
            <h1 className="text-xl font-light text-zinc-100 uppercase tracking-[0.2em] mb-4">
              Checkout Gagal
            </h1>
            <p className="text-sm text-zinc-400 mb-8">{orderResult.message}</p>
            <button
              onClick={() => setOrderResult(null)}
              className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-amber-600 hover:border-amber-600 hover:text-white rounded-lg py-3 px-8 text-xs font-medium tracking-widest uppercase transition-all"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 tracking-wide">
        <div className="max-w-4xl mx-auto text-center py-16">
          <ShoppingBag className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">
            Keranjang Anda masih kosong, tidak ada yang bisa di-checkout
          </p>
          <Link
            href="/"
            className="text-xs text-amber-500 uppercase tracking-wider hover:underline"
          >
            Eksplorasi Galeri
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 tracking-wide">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/cart"
            className="text-zinc-500 hover:text-amber-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-xl font-light text-zinc-100 uppercase tracking-[0.2em] border-b border-zinc-900 pb-2 flex-1">
            <Package className="h-5 w-5 text-amber-500 inline mr-2" />
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Shipping Form */}
          <div className="lg:col-span-2">
            <Card className="border-zinc-800 bg-zinc-950 shadow-xl">
              <CardHeader className="border-b border-zinc-900 pb-6 mb-6">
                <CardTitle className="flex items-center gap-2 text-xl text-white">
                  <Package className="h-5 w-5 text-amber-500" />
                  Informasi Pengiriman
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Isi data diri untuk pengiriman spesimen hidup.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    id="checkout-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300">
                            Nama Lengkap
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Budi Santoso"
                              {...field}
                              className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500 text-white"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300">
                            Nomor Telepon
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="081234567890"
                              {...field}
                              className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500 text-white"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300">
                            Alamat Lengkap
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Jl. Sudirman No 123"
                              {...field}
                              className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500 text-white"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-zinc-300">
                              Kota
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Jakarta Pusat"
                                {...field}
                                className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500 text-white"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-zinc-300">
                              Kode Pos
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="10220"
                                {...field}
                                className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500 text-white"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Right: Order Summary */}
          <div>
            <Card className="border-zinc-800 bg-zinc-950 shadow-xl sticky top-24">
              <CardHeader className="border-b border-zinc-900 pb-6 mb-6 bg-zinc-900/50">
                <CardTitle className="text-xl text-white">
                  Ringkasan Pesanan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-zinc-900 rounded-md border border-zinc-800 flex items-center justify-center shrink-0">
                      <span className="text-xs text-zinc-500">Foto</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-white line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-zinc-500">{item.strain}</p>
                      <p className="text-xs text-zinc-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="font-medium text-amber-500 text-sm whitespace-nowrap">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </div>
                  </div>
                ))}

                <div className="border-t border-zinc-800 pt-4 mt-6 space-y-2">
                  <div className="flex justify-between text-zinc-400 text-sm">
                    <span>Subtotal</span>
                    <span className="font-mono">
                      Rp {subtotal.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-sm">
                    <span>Ongkos Kirim</span>
                    <span className="font-mono">
                      Rp {shippingCost.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between text-white font-medium text-lg pt-4 border-t border-zinc-800">
                    <span>Total</span>
                    <span className="text-amber-500 font-mono">
                      Rp {total.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white font-medium py-6 text-sm uppercase tracking-wider"
                >
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  {isSubmitting ? "Memproses..." : "Konfirmasi Pesanan"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
