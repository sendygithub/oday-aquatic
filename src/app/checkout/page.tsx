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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Package } from "lucide-react";
import Image from "next/image";

const checkoutSchema = z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    address: z.string().min(10, { message: "Please provide a complete address." }),
    city: z.string().min(2, { message: "City is required." }),
    postalCode: z.string().min(4, { message: "Postal code is required." }),
    phone: z.string().min(9, { message: "Valid phone number is required." }),
});

export default function CheckoutPage() {
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

    function onSubmit(values: z.infer<typeof checkoutSchema>) {
        console.log("Checkout Data:", values);
        alert("Checkout successful!");
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-black italic tracking-tight text-white uppercase border-l-4 border-[#FFD100] pl-4">
                    Secure <span className="text-[#FF6B8B]">Checkout</span>
                </h1>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left: Shipping Form */}
                <div className="lg:col-span-2">
                    <Card className="border-zinc-800 bg-zinc-950 shadow-xl">
                        <CardHeader className="border-b border-zinc-900 pb-6 mb-6">
                            <CardTitle className="flex items-center gap-2 text-xl text-white">
                                <Package className="h-5 w-5 text-[#FFD100]" />
                                Shipping Information
                            </CardTitle>
                            <CardDescription className="text-zinc-400">
                                Where should we send your hot wheels?
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-zinc-300">Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Budi Santoso" {...field} className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white" />
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
                                                <FormLabel className="text-zinc-300">Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="081234567890" {...field} className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white" />
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
                                                <FormLabel className="text-zinc-300">Complete Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Jl. Sudirman No 123" {...field} className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white" />
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
                                                    <FormLabel className="text-zinc-300">City</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Jakarta Pusat" {...field} className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white" />
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
                                                    <FormLabel className="text-zinc-300">Postal Code</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="10220" {...field} className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white" />
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
                            <CardTitle className="text-xl text-white">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Dummy Order Items */}
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 bg-zinc-900 rounded-md border border-zinc-800 flex items-center justify-center shrink-0">
                                    <span className="text-xs text-zinc-500">IMG</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm text-white line-clamp-1">‘67 Camaro</h4>
                                    <p className="text-xs text-zinc-400">Qty: 1</p>
                                </div>
                                <div className="font-bold text-[#FFD100] text-sm">Rp 35.000</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 bg-zinc-900 rounded-md border border-zinc-800 flex items-center justify-center shrink-0">
                                    <span className="text-xs text-zinc-500">IMG</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm text-white line-clamp-1">Nissan Skyline GT-R (R34)</h4>
                                    <p className="text-xs text-zinc-400">Qty: 1</p>
                                </div>
                                <div className="font-bold text-[#FFD100] text-sm">Rp 150.000</div>
                            </div>

                            <div className="border-t border-zinc-800 pt-4 mt-6 space-y-2">
                                <div className="flex justify-between text-zinc-400 text-sm">
                                    <span>Subtotal</span>
                                    <span>Rp 185.000</span>
                                </div>
                                <div className="flex justify-between text-zinc-400 text-sm">
                                    <span>Shipping</span>
                                    <span>Rp 15.000</span>
                                </div>
                                <div className="flex justify-between text-white font-bold text-lg pt-4 border-t border-zinc-800">
                                    <span>Total</span>
                                    <span className="text-[#FFD100] italic">Rp 200.000</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                            <Button
                                type="submit"
                                form="checkout-form"
                                className="w-full bg-[#FF6B8B] hover:bg-[#D85A7A] text-white font-bold py-6 text-lg uppercase tracking-wider"
                            >
                                <CheckCircle2 className="mr-2 h-5 w-5" /> Complete Order
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
