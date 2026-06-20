"use client";

import { useState } from "react";
import { MOCK_PRODUCTS, Product } from "@/lib/data";
import { Waves, ShieldAlert, Fish, PenTool, Trash2 } from "lucide-react";
import Link from "next/link";

export default function DaftarProdukPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // Simulasi Fungsi Hapus (Lepas Liar)
  const handleLepasLiar = (id: string, name: string) => {
    const konfirmasi = confirm(
      `Apakah Anda yakin ingin melepas liar (menghapus) ${name} dari sistem galeri?`,
    );
    if (konfirmasi) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 tracking-wide">
      <div className="max-w-6xl mx-auto">
        {/* Header Kontrol */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-900 pb-6 mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Waves className="h-6 w-6 text-teal-600" />
            <div>
              <h1 className="text-xl font-light text-zinc-100 uppercase tracking-[0.2em]">
                Inventaris Biota
              </h1>
              <p className="text-xs text-zinc-500 font-light mt-1">
                Manajemen data spesimen, kuantitas stok, dan status rekam medis
                komoditas.
              </p>
            </div>
          </div>

          <Link href="/tambahproduct">
            <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white rounded-none px-6 py-2.5 text-xs font-medium tracking-widest uppercase transition-all duration-300">
              + Ambil Biota Baru
            </button>
          </Link>
        </div>

        {/* Pembungkus Tabel Responsif */}
        <div className="w-full overflow-x-auto border border-zinc-900 bg-zinc-950">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-900/30 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                <th className="py-4 px-6 font-medium">Spesimen / Strain</th>
                <th className="py-4 px-6 font-medium">Kategori</th>
                <th className="py-4 px-6 font-medium">Kualitas / Grade</th>
                <th className="py-4 px-6 font-medium text-center">Ukuran</th>
                <th className="py-4 px-6 font-right">Harga Satuan</th>
                <th className="py-4 px-6 text-center">Stok</th>
                <th className="py-4 px-6 text-center">Tindakan Akuatik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-xs font-light">
              {products.map((fish) => (
                <tr
                  key={fish.id}
                  className="hover:bg-zinc-900/20 transition-colors group"
                >
                  {/* Kolom Nama & Strain */}
                  <td className="py-4 px-6">
                    <div className="font-medium text-zinc-200 group-hover:text-teal-400 transition-colors">
                      {fish.name}
                    </div>
                    <div className="text-[10px] text-zinc-600 italic mt-0.5 font-mono">
                      {fish.material}
                    </div>
                  </td>

                  {/* Kategori */}
                  <td className="py-4 px-6 text-zinc-400">{fish.category}</td>

                  {/* Kualitas */}
                  <td className="py-4 px-6">
                    <span className="px-2 py-0.5 text-[10px] bg-zinc-900 text-zinc-400 font-mono rounded">
                      {fish.scale}
                    </span>
                  </td>

                  {/* Ukuran */}
                  <td className="py-4 px-6 text-center font-mono text-zinc-400">
                    {fish.year} cm
                  </td>

                  {/* Harga */}
                  <td className="py-4 px-6 font-medium text-zinc-300">
                    Rp {fish.price.toLocaleString("id-ID")}
                  </td>

                  {/* Stok dengan Logika Kondisional Warna */}
                  <td className="py-4 px-6 text-center font-mono">
                    <span
                      className={`px-2 py-0.5 rounded ${
                        fish.stock <= 5
                          ? "text-rose-400 bg-rose-500/10 font-bold"
                          : "text-zinc-400"
                      }`}
                    >
                      {fish.stock} ekor
                    </span>
                  </td>

                  {/* Tombol Aksi Bernuansa Ikan */}
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-3">
                      {/* Tombol Edit (Karantina) */}
                      <button
                        title="Karantina (Edit Data)"
                        className="p-2 text-zinc-500 hover:text-amber-500 bg-zinc-900/40 border border-zinc-900/80 hover:border-amber-500/30 transition-all flex items-center gap-1 text-[10px] uppercase tracking-wider px-2.5 py-1"
                        onClick={() =>
                          alert(
                            `Memindahkan ${fish.name} ke ruang karantina untuk disesuaikan...`,
                          )
                        }
                      >
                        <PenTool className="h-3 w-3" /> Karantina
                      </button>

                      {/* Tombol Hapus (Lepas Liar) */}
                      <button
                        title="Lepas Liar (Hapus dari Toko)"
                        className="p-2 text-zinc-600 hover:text-rose-400 bg-zinc-900/20 border border-transparent hover:border-rose-500/20 transition-all flex items-center gap-1 text-[10px] uppercase tracking-wider px-2.5 py-1"
                        onClick={() => handleLepasLiar(fish.id, fish.name)}
                      >
                        <Trash2 className="h-3 w-3" /> Lepas Liar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Info Pemeliharaan Sistem */}
        {products.length === 0 && (
          <div className="text-center py-16 border border-dashed border-zinc-900 mt-4">
            <Fish className="h-8 w-8 text-zinc-700 mx-auto mb-3" />
            <p className="text-xs text-zinc-500 uppercase tracking-widest">
              Seluruh kolam kosong. Tidak ada spesimen terdata.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
