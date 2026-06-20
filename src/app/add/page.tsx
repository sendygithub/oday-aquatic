"use client";

import { useState } from "react";
import { Waves, Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { addProduct } from "../../../services/add.service";

export default function TambahProductPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fungsi untuk pratinjau gambar saat diunggah
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Jalankan import ini di bagian atas file komponen Anda:
  // import { addProduct } from "./add.service";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget; // simpan referensi

    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const material = formData.get("material") as string;
    const category = formData.get("category") as string;
    const scale = formData.get("scale") as string;
    const badge = formData.get("badge") as string;
    const priceRaw = formData.get("price") as string;
    const stockRaw = formData.get("stock") as string;
    const yearRaw = formData.get("year") as string;
    const colorPattern = formData.get("color_pattern") as string;

    const processedData = {
      name,
      material: material || undefined,
      category,
      scale: scale || undefined,
      badge: badge || undefined,
      price: parseInt(priceRaw, 10) || 0,
      stock: parseInt(stockRaw, 10) || 0,
      year: yearRaw ? parseFloat(yearRaw) : undefined,
      colorPattern: colorPattern || undefined,
      imageUrl: "https://placehold.co/600x600/png",
    };

    const response = await addProduct(processedData);

    if (response.success) {
      alert(response.message);
      form.reset(); // ✅ aman
      setImagePreview(null);
    } else {
      alert("Gagal: " + response.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 tracking-wide">
      <div className="max-w-3xl mx-auto">
        {/* Navigasi Kembali */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-teal-500 uppercase tracking-widest mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Galeri
        </Link>

        {/* Header Halaman */}
        <div className="flex items-center gap-3 border-b border-zinc-900 pb-6 mb-10">
          <Waves className="h-6 w-6 text-teal-600" />
          <div>
            <h1 className="text-xl font-light text-zinc-100 uppercase tracking-[0.2em]">
              Arsip Akuatik Baru
            </h1>
            <p className="text-xs text-zinc-500 font-light mt-1">
              Tambahkan koleksi ikan hias premium ke dalam etalase Oday Gallery.
            </p>
          </div>
        </div>

        {/* Formulir Tambah Produk */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Bagian 1: Identitas Utama Ikan */}
          <div className="space-y-4">
            <h3 className="text-xs font-medium uppercase tracking-widest text-zinc-400 border-b border-zinc-900 pb-2">
              01. Identitas Utama
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-zinc-400">
                  Nama Produk / Varian
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Contoh: Guppy Albino Full Red"
                  className="w-full bg-zinc-900/50 border border-zinc-900 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-teal-600/50 text-zinc-200 placeholder:text-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-zinc-400">
                  Spesies Ilmiah (Scientific Name)
                </label>
                <input
                  type="text"
                  name="material" // Difungsikan sebagai Strain / Spesies Ilmiah
                  placeholder="Contoh: Poecilia reticulata"
                  className="w-full bg-zinc-900/50 border border-zinc-900 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-teal-600/50 text-zinc-200 placeholder:text-zinc-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-zinc-400">
                  Kategori / Jenis
                </label>
                <select
                  name="category"
                  className="w-full bg-zinc-900/50 border border-zinc-900 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-teal-600/50 text-zinc-400"
                >
                  <option value="Guppy">Guppy</option>
                  <option value="Molly">Molly</option>
                  <option value="Tetra">Tetra</option>
                  <option value="Platy">Platy</option>
                  <option value="Rasbora">Rasbora</option>
                  <option value="Wild Betta">Wild Betta</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-zinc-400">
                  Tingkat Kualitas (Grade / Form)
                </label>
                <input
                  type="text"
                  name="scale" // Difungsikan sebagai Grade/Kualitas
                  placeholder="Contoh: Pair S+ / Grade A"
                  className="w-full bg-zinc-900/50 border border-zinc-900 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-teal-600/50 text-zinc-200 placeholder:text-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-zinc-400">
                  Label Khusus (Badge)
                </label>
                <select
                  name="badge"
                  className="w-full bg-zinc-900/50 border border-zinc-900 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-teal-600/50 text-zinc-400"
                >
                  <option value="">Tanpa Label</option>
                  <option value="New Arrival">New Arrival</option>
                  <option value="Limited Edition">Limited Edition</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bagian 2: Karakteristik Fisik & Inventaris */}
          <div className="space-y-4">
            <h3 className="text-xs font-medium uppercase tracking-widest text-zinc-400 border-b border-zinc-900 pb-2">
              02. Spesifikasi Fisik & Harga
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs uppercase tracking-wider text-zinc-400">
                  Harga (IDR)
                </label>
                <input
                  required
                  type="number"
                  name="price"
                  placeholder="Rp 0"
                  className="w-full bg-zinc-900/50 border border-zinc-900 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-teal-600/50 text-zinc-200 placeholder:text-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-zinc-400">
                  Jumlah Stok
                </label>
                <input
                  required
                  type="number"
                  name="stock"
                  placeholder="0 ekor"
                  className="w-full bg-zinc-900/50 border border-zinc-900 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-teal-600/50 text-zinc-200 placeholder:text-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-zinc-400">
                  Panjang Ikan (cm)
                </label>
                <input
                  type="number"
                  name="year" // Difungsikan sebagai ukuran cm demi tipe data number
                  placeholder="Contoh: 4"
                  className="w-full bg-zinc-900/50 border border-zinc-900 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-teal-600/50 text-zinc-200 placeholder:text-zinc-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-zinc-400">
                Dominasi Warna / Pola Fisik
              </label>
              <input
                type="text"
                name="color_pattern"
                placeholder="Contoh: Solid Fire Red / Iridescent Blue Neon"
                className="w-full bg-zinc-900/50 border border-zinc-900 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-teal-600/50 text-zinc-200 placeholder:text-zinc-700"
              />
            </div>
          </div>

          {/* Bagian 3: Media Upload */}
          <div className="space-y-4">
            <h3 className="text-xs font-medium uppercase tracking-widest text-zinc-400 border-b border-zinc-900 pb-2">
              03. Galeri Foto / Media
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Tempat Preview Gambar */}
              <div className="aspect-square bg-zinc-900 border border-zinc-900 flex flex-col items-center justify-center relative overflow-hidden">
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imagePreview}
                    alt="Preview ikan"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-[11px] text-zinc-600 uppercase tracking-widest">
                    Belum Ada Gambar
                  </p>
                )}
              </div>

              {/* Area Upload File */}
              <div className="md:col-span-2 relative aspect-[2/1] md:aspect-auto md:h-full">
                <label className="border border-dashed border-zinc-800 hover:border-teal-600/40 transition-colors flex flex-col items-center justify-center p-6 text-center cursor-pointer h-full bg-zinc-900/20">
                  <Upload className="h-5 w-5 text-zinc-600 mb-2" />
                  <span className="text-xs text-zinc-400 font-light uppercase tracking-wider">
                    Pilih Berkas Gambar
                  </span>
                  <span className="text-[10px] text-zinc-600 mt-1">
                    Rekomendasi rasio persegi (1:1), maks 2MB
                  </span>
                  <input
                    type="file"
                    name="image_file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Tombol Simpan */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white rounded-none px-12 py-4 text-xs font-medium tracking-widest uppercase transition-all duration-300"
            >
              Arsipkan Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
