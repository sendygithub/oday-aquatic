export interface CreateProductInput {
  name: string;
  material?: string; // Scientific Name / Strain
  category: string; // Jenis Ikan (Guppy, Molly, dll)
  scale?: string; // Grade / Kualitas
  badge?: string; // Label Khusus
  price: number; // IDR (Akan dikonversi dari string ke int)
  stock: number; // Jumlah ekor
  year?: number; // Panjang ukuran cm (Akan dikonversi dari string ke float)
  colorPattern?: string;
  imageUrl?: string; // String path gambar setelah di-upload
}
