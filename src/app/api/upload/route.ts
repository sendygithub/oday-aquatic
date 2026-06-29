import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

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
    const filename = `${timestamp}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    // Simpan ke folder public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // URL yang bisa diakses publik
    const url = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url,
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
