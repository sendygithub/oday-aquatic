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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PackagePlus, UploadCloud, Save, Loader2 } from "lucide-react";
import { addProduct } from "../../../../services/add.service";

const addProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters." }),
  price: z.string().min(1, { message: "Price is required." }),
  stock: z.string().min(1, { message: "Stock is required." }),
  category: z.string().min(2, { message: "Category is required." }),
  scale: z.string().min(2, { message: "Scale is required (e.g. 1:64)." }),
  material: z
    .string()
    .min(2, { message: "Material is required (e.g. Diecast)." }),
  year: z.string().min(4, { message: "Year is required." }),
});

type AddProductFormValues = z.infer<typeof addProductSchema>;

export default function AddProductPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const form = useForm<AddProductFormValues>({
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: AddProductFormValues) {
    setIsUploading(true);

    let imageUrl = "https://placehold.co/600x600/png";

    // Upload gambar jika ada file yang dipilih
    if (selectedFile) {
      try {
        const uploadFormData = new FormData();
        uploadFormData.append("file", selectedFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        const uploadResult = await uploadRes.json();

        if (uploadResult.success) {
          imageUrl = uploadResult.url;
          setUploadedUrl(uploadResult.url);
        } else {
          alert("Gagal mengunggah gambar: " + uploadResult.message);
          setIsUploading(false);
          return;
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("Gagal mengunggah gambar. Silakan coba lagi.");
        setIsUploading(false);
        return;
      }
    }

    const processedData = {
      name: values.name,
      material: values.material,
      category: values.category,
      scale: values.scale,
      price: parseInt(values.price, 10) || 0,
      stock: parseInt(values.stock, 10) || 0,
      year: values.year ? parseFloat(values.year) : undefined,
      imageUrl,
    };

    const response = await addProduct(processedData);

    setIsUploading(false);

    if (response.success) {
      alert("Product added successfully!");
      form.reset();
      setImagePreview(null);
      setSelectedFile(null);
      setUploadedUrl(null);
    } else {
      alert("Failed to add product: " + response.message);
    }
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
          <p className="text-zinc-400">
            Add new diecast stock to the inventory.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-zinc-800 bg-zinc-950 shadow-xl">
            <CardHeader className="border-b border-zinc-900 pb-6 mb-6">
              <CardTitle className="text-xl text-white">
                Product Information
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Fill in the details for the new product.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  id="add-product-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300">
                          Product Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. '67 Camaro"
                            {...field}
                            className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white"
                          />
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
                          <FormLabel className="text-zinc-300">
                            Price (Rp)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="35000"
                              {...field}
                              className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white"
                            />
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
                            <Input
                              placeholder="10"
                              {...field}
                              className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white"
                            />
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
                          <FormLabel className="text-zinc-300">
                            Category / Brand
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="HotWheels"
                              {...field}
                              className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white"
                            />
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
                          <FormLabel className="text-zinc-300">
                            Release Year
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="2024"
                              {...field}
                              className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white"
                            />
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
                            <Input
                              placeholder="1:64"
                              {...field}
                              className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white"
                            />
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
                          <FormLabel className="text-zinc-300">
                            Material
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Diecast Metal"
                              {...field}
                              className="bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFD100] text-white"
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

        {/* Right: Image Upload & Actions */}
        <div>
          <Card className="border-zinc-800 bg-zinc-950 shadow-xl mb-6 sticky top-24">
            <CardHeader className="border-b border-zinc-900 pb-6 mb-6">
              <CardTitle className="text-xl text-white">
                Product Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col items-center">
              {/* Image Preview / Upload Area */}
              <label className="w-full aspect-square bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-500 hover:border-[#FFD100] hover:text-[#FFD100] transition-colors cursor-pointer group overflow-hidden">
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <UploadCloud className="h-12 w-12 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">Click to upload image</p>
                    <p className="text-xs mt-1">PNG, JPG up to 5MB</p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* Upload Status */}
              {isUploading && (
                <div className="flex items-center gap-2 text-xs text-[#FFD100]">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Uploading image...
                </div>
              )}
              {uploadedUrl && !isUploading && (
                <div className="flex items-center gap-2 text-xs text-green-500">
                  <span>✓</span>
                  Image uploaded successfully!
                </div>
              )}

              <Button
                type="submit"
                form="add-product-form"
                disabled={isUploading}
                className="w-full bg-gradient-to-r from-[#FFD100] to-[#FF8E53] hover:from-[#FF8E53] hover:to-[#FF6B8B] text-white font-bold py-6 text-lg tracking-wider disabled:opacity-50"
              >
                {isUploading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" /> Save Product
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
