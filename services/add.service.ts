"use server";

// Sesuaikan path import ini ke lokasi instance Prisma Client versi 6 Anda
import { prisma } from "@/lib/prisma";
import { CreateProductInput } from "../types/add.type";

export async function addProduct(input: CreateProductInput) {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: input.name,
        material: input.material || null,
        category: input.category,
        scale: input.scale || null,
        badge: input.badge || null,
        price: input.price,
        stock: input.stock,
        year: input.year || null,
        colorPattern: input.colorPattern || null,
        imageUrl: input.imageUrl || null,
      },
    });

    return {
      success: true,
      message: "Produk akuatik berhasil di simpan ke database!",
      data: newProduct,
    };
  } catch (error) {
    console.error("Gagal menyimpan produk ke Prisma:", error);
    return {
      success: false,
      message: "Terjadi kesalahan internal pada server database.",
    };
  }
}
