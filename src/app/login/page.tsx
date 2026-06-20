"use client";

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
import Link from "next/link";
import { Fish } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Alamat email tidak valid." }),
  password: z
    .string()
    .min(6, { message: "Kata sandi minimal harus 6 karakter." }),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log("Login Data:", values);
  }

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-8rem)] bg-zinc-950">
      {/* CARD CONTAINER - Menggunakan rounded-xl agar tidak terlalu kaku/kotak */}
      <Card className="w-full max-w-md border-zinc-900 bg-zinc-950/40 backdrop-blur-xl shadow-2xl relative overflow-hidden rounded-xl z-10">
        {/* Garis Aksen Teal Halus di Atas Card */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-zinc-900 via-teal-600 to-zinc-900"></div>

        <CardHeader className="text-center pb-2 pt-8">
          {/* Ikon Statis yang Bersih di Dalam Lingkaran Lembut */}
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-[#112229]/60 rounded-xl flex items-center justify-center border border-teal-900/40">
              <Fish className="h-5 w-5 text-teal-500" />
            </div>
          </div>

          <CardTitle className="text-base font-light tracking-[0.2em] text-zinc-100 uppercase">
            Masuk Kelola <br />
            <span className="text-zinc-500 font-normal text-xs tracking-[0.15em]">
              Oday Aquatics
            </span>
          </CardTitle>
          <CardDescription className="text-zinc-500 font-light text-[11px] mt-1">
            Akses ruang kurasi untuk mengelola spesimen dan riwayat pesanan.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-2"
            >
              {/* Input Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-[11px] uppercase tracking-wider text-zinc-400 font-light">
                      Alamat Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="aquarist@odaygallery.com"
                        {...field}
                        className="bg-zinc-900/40 border-zinc-900 rounded-lg text-zinc-200 text-xs py-4 focus-visible:ring-1 focus-visible:ring-teal-600/40 focus-visible:border-teal-600/40 focus-visible:ring-offset-0 placeholder:text-zinc-700"
                      />
                    </FormControl>
                    <FormMessage className="text-rose-400 text-[11px]" />
                  </FormItem>
                )}
              />

              {/* Input Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-[11px] uppercase tracking-wider text-zinc-400 font-light">
                      Kata Sandi
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        className="bg-zinc-900/40 border-zinc-900 rounded-lg text-zinc-200 text-xs py-4 focus-visible:ring-1 focus-visible:ring-teal-600/40 focus-visible:border-teal-600/40 focus-visible:ring-offset-0 placeholder:text-zinc-700"
                      />
                    </FormControl>
                    <FormMessage className="text-rose-400 text-[11px]" />
                  </FormItem>
                )}
              />

              {/* Tombol Sign In */}
              <Button
                type="submit"
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white rounded-lg text-xs font-medium tracking-widest uppercase py-4.5 transition-all duration-300 mt-2"
              >
                Masuk Galeri
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-zinc-900/80 py-4.5 bg-zinc-900/10">
          <p className="text-[11px] font-light text-zinc-500 tracking-wide">
            Belum memiliki akses?{" "}
            <Link
              href="/register"
              className="text-teal-500 font-normal hover:text-teal-400 transition-colors"
            >
              Daftar Akun Baru
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
