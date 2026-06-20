import Link from "next/link";
import { Waves } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-500 py-16 border-t border-zinc-900 tracking-wide">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & Deskripsi */}
        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-light tracking-widest uppercase text-zinc-100"
          >
            <Waves className="h-4 w-4 text-teal-600" />
            <span>
              Oday <span className="text-zinc-500 font-normal">Gallery</span>
            </span>
          </Link>
          <p className="text-xs font-light leading-relaxed text-zinc-400">
            Destinasi kurasi ikan hias eksotis dan perlengkapan akuatik premium
            untuk ruang personal eksklusif Anda.
          </p>
        </div>

        {/* Kategori Akuatik */}
        <div>
          <h4 className="text-zinc-300 font-medium text-xs mb-4 uppercase tracking-[0.2em]">
            Koleksi
          </h4>
          <ul className="space-y-2.5 text-xs font-light">
            <li>
              <Link href="#" className="hover:text-teal-500 transition-colors">
                Premium Channa
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-teal-500 transition-colors">
                Exotic Discus
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-teal-500 transition-colors">
                Collector Arowana
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-teal-500 transition-colors">
                Aquascape & Hardscape
              </Link>
            </li>
          </ul>
        </div>

        {/* Layanan */}
        <div>
          <h4 className="text-zinc-300 font-medium text-xs mb-4 uppercase tracking-[0.2em]">
            Layanan
          </h4>
          <ul className="space-y-2.5 text-xs font-light">
            <li>
              <Link href="#" className="hover:text-teal-500 transition-colors">
                Panduan Aklimatisasi
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-teal-500 transition-colors">
                Garansi Live On Arrival
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-teal-500 transition-colors">
                Pengiriman Khusus
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-teal-500 transition-colors">
                Private Konsultasi
              </Link>
            </li>
          </ul>
        </div>

        {/* Kontak Resmi */}
        <div>
          <h4 className="text-zinc-300 font-medium text-xs mb-4 uppercase tracking-[0.2em]">
            Kontak
          </h4>
          <ul className="space-y-2.5 text-xs font-light text-zinc-400">
            <li>Email: concierge@odaygallery.com</li>
            <li>Telepon: +62 812 9999 0D4Y</li>
            <li>Alamat: Boutique Aquatics Lt. 2, Jakarta</li>
          </ul>
        </div>
      </div>

      {/* Hak Cipta */}
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-zinc-900 text-[11px] font-light text-zinc-600 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          &copy; {new Date().getFullYear()} Oday Gallery. All rights reserved.
        </div>
        <div className="flex gap-6 text-zinc-500">
          <Link href="#" className="hover:text-zinc-400">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-zinc-400">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
