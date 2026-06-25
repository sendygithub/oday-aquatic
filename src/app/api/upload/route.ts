import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Tidak ada file yang diunggah." },
        { status: 400 },
      );
    }

    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "Hanya file gambar yang diizinkan." },
        { status: 400 },
      );
    }

    // Validasi ukuran file (maks 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "Ukuran file maksimal 5MB." },
        { status: 400 },
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `products/${timestamp}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    // Upload ke Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      message: "Gambar berhasil diunggah!",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengunggah gambar." },
      { status: 500 },
    );
  }
}
