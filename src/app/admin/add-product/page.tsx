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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PackagePlus, UploadCloud, Save } from "lucide-react";

const addProductSchema = z.object({
    name: z.string().min(3, { message: "Product name must be at least 3 characters." }),
    price: z.string().min(1, { message: "Price is required." }),
    stock: z.string().min(1, { message: "Stock is required." }),
    category: z.string().min(2, { message: "Category is required." }),
    scale: z.string().min(2, { message: "Scale is required (e.g. 1:64)." }),
    material: z.string().min(2, { message: "Material is required (e.g. Diecast)." }),
    year: z.string().min(4, { message: "Year is required." }),
    image: z.any(),
});

export default function AddProductPage() {
    const form = useForm<z.infer<typeof addProductSchema>>({
        resolver: zodResolver(addProductSchema),
        defaultValues: {
            name: "",
            price: "",
            stock: "",
            category: "",
            scale: "1:64",
            material: "Diecast Metal",
            year: new Date().getFullYear().toString(),
        },
    });

    function onSubmit(values: z.infer<typeof addProductSchema>) {
        console.log("New Product Data:", values);
        alert("Product added successfully!");
        form.reset();
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8 flex items-center gap-4">
                <div className="h-16 w-16 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800 shadow-xl">
                    <PackagePlus className="h-8 w-8 text-[#FFD100]" />
                </div>
                <div>
                    <h1 className="text-3xl font-black italic tracking-tight text-white uppercase">
                        Add <span className="text-[#FF6B8B]">Product</span>
                    </h1>
                    <p className="text-zinc-400">Add new diecast stock to the inventory.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="border-zinc-800 bg-zinc-950 shadow-xl">
                        <CardHeader className="border-b border-zinc-900 pb-6 mb-6">
                            <CardTitle className="text-xl text-white">Product Information</CardTitle>
                            <CardDescription className="text-zinc-400">
                                Fill in the details for the new product.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form id="add-product-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-zinc-300">Product Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. '67 Camaro" {...field} className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white" />
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-zinc-300">Price (Rp)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="35000" {...field} className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white" />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="stock"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-zinc-300">Stock</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="10" {...field} className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white" />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-zinc-300">Category / Brand</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="HotWheels" {...field} className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white" />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="year"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-zinc-300">Release Year</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="2024" {...field} className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white" />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="scale"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-zinc-300">Scale</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="1:64" {...field} className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white" />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="material"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-zinc-300">Material</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Diecast Metal" {...field} className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white" />
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

                {/* Right: Image Upload & Actions */}
                <div>
                    <Card className="border-zinc-800 bg-zinc-950 shadow-xl mb-6 sticky top-24">
                        <CardHeader className="border-b border-zinc-900 pb-6 mb-6">
                            <CardTitle className="text-xl text-white">Product Image</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 flex flex-col items-center">
                            <div className="w-full aspect-square bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-500 hover:border-[#FFD100] hover:text-[#FFD100] transition-colors cursor-pointer group">
                                <UploadCloud className="h-12 w-12 mb-2 group-hover:scale-110 transition-transform" />
                                <p className="text-sm font-medium">Click to upload image</p>
                                <p className="text-xs mt-1">PNG, JPG up to 5MB</p>
                            </div>
                            <Button
                                type="submit"
                                form="add-product-form"
                                className="w-full bg-gradient-to-r from-[#FFD100] to-[#FF8E53] hover:from-[#FF8E53] hover:to-[#FF6B8B] text-white font-bold py-6 text-lg tracking-wider"
                            >
                                <Save className="mr-2 h-5 w-5" /> Save Product
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
