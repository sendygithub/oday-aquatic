"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { Fish, Loader2 } from "lucide-react";
import { registerUser } from "../../../services/auth.service";

const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Nama minimal harus 2 karakter." }),
    email: z.string().email({ message: "Alamat email tidak valid." }),
    password: z
      .string()
      .min(6, { message: "Kata sandi minimal harus 6 karakter." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok.",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await registerUser(
        values.name,
        values.email,
        values.password,
      );

      if (result.success) {
        // Redirect to home page after successful registration
        router.push("/");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("Register error:", error);
      setErrorMessage("Terjadi kesalahan saat mendaftar.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-8rem)] bg-zinc-950">
      {/* CARD CONTAINER - Menggunakan rounded-xl agar sudut melengkung halus */}
      <Card className="w-full max-w-md border-zinc-900 bg-zinc-950/40 backdrop-blur-xl shadow-2xl relative overflow-hidden rounded-xl z-10">
        {/* Garis Pembatas Gradasi Teal Estetik */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-zinc-900 via-teal-600 to-zinc-900"></div>

        <CardHeader className="text-center pb-2 pt-8">
          {/* Lingkaran Maskot Akuatik Statis */}
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-[#112229]/60 rounded-xl flex items-center justify-center border border-teal-900/40">
              <Fish className="h-5 w-5 text-teal-500" />
            </div>
          </div>

          <CardTitle className="text-base font-light tracking-[0.2em] text-zinc-100 uppercase">
            Bergabung Komunitas <br />
            <span className="text-zinc-500 font-normal text-xs tracking-[0.15em]">
              Oday Gallery
            </span>
          </CardTitle>
          <CardDescription className="text-zinc-500 font-light text-[11px] mt-1">
            Buat akun untuk mulai mengadopsi spesimen favorit Anda.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Error Message */}
          {errorMessage && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 mb-4">
              <p className="text-rose-400 text-[11px] text-center">
                {errorMessage}
              </p>
            </div>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3.5 mt-2"
            >
              {/* Input Nama Lengkap */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-[11px] uppercase tracking-wider text-zinc-400 font-light">
                      Nama Lengkap
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Budi Santoso"
                        {...field}
                        disabled={isLoading}
                        className="bg-zinc-900/40 border-zinc-900 rounded-lg text-zinc-200 text-xs py-4 focus-visible:ring-1 focus-visible:ring-teal-600/40 focus-visible:border-teal-600/40 focus-visible:ring-offset-0 placeholder:text-zinc-700"
                      />
                    </FormControl>
                    <FormMessage className="text-rose-400 text-[11px]" />
                  </FormItem>
                )}
              />

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
                        type="email"
                        placeholder="aquarist@odaygallery.com"
                        {...field}
                        disabled={isLoading}
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
                        disabled={isLoading}
                        className="bg-zinc-900/40 border-zinc-900 rounded-lg text-zinc-200 text-xs py-4 focus-visible:ring-1 focus-visible:ring-teal-600/40 focus-visible:border-teal-600/40 focus-visible:ring-offset-0 placeholder:text-zinc-700"
                      />
                    </FormControl>
                    <FormMessage className="text-rose-400 text-[11px]" />
                  </FormItem>
                )}
              />

              {/* Input Konfirmasi Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-[11px] uppercase tracking-wider text-zinc-400 font-light">
                      Konfirmasi Kata Sandi
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        disabled={isLoading}
                        className="bg-zinc-900/40 border-zinc-900 rounded-lg text-zinc-200 text-xs py-4 focus-visible:ring-1 focus-visible:ring-teal-600/40 focus-visible:border-teal-600/40 focus-visible:ring-offset-0 placeholder:text-zinc-700"
                      />
                    </FormControl>
                    <FormMessage className="text-rose-400 text-[11px]" />
                  </FormItem>
                )}
              />

              {/* Tombol Buat Akun */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white rounded-lg text-xs font-medium tracking-widest uppercase py-4.5 transition-all duration-300 mt-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Daftarkan Keanggotaan"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-zinc-900/80 py-4.5 bg-zinc-900/10">
          <p className="text-[11px] font-light text-zinc-500 tracking-wide">
            Sudah terdaftar?{" "}
            <Link
              href="/login"
              className="text-teal-500 font-normal hover:text-teal-400 transition-colors"
            >
              Masuk Sekarang
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
