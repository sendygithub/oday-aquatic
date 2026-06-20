"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Fish,
  CreditCard,
  Package,
  Truck,
  CheckCircle2,
  ShoppingBag,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

// Mock Data Transaksi Lengkap Gaya Shopee (Tema Ikan Hias)
const SHOPEE_STYLE_ORDERS = [
  {
    id: "ODA-20260618-X912",
    date: "18 Juni 2026",
    status: "Sedang Dikemas",
    statusId: "processing",
    total: 165000,
    shippingCost: 20000,
    items: [
      {
        name: "Guppy Albino Full Red (AFR) - Sepasang",
        qty: 1,
        price: 75000,
        variant: "Pure Strain",
      },
      {
        name: "Neon Tetra Premium Blue",
        qty: 10,
        price: 7000,
        variant: "Size M",
      },
    ],
  },
  {
    id: "ODA-20260615-A104",
    date: "15 Juni 2026",
    status: "Dalam Pengiriman",
    statusId: "shipped",
    total: 475000,
    shippingCost: 25000,
    resi: "OdayExpress-99120481",
    items: [
      {
        name: "Wild Betta Mahachaiensis",
        qty: 1,
        price: 450000,
        variant: "Male Top Grade",
      },
    ],
  },
  {
    id: "ODA-20260610-B772",
    date: "10 Juni 2026",
    status: "Selesai",
    statusId: "delivered",
    total: 120000,
    shippingCost: 15000,
    items: [
      {
        name: "Anubias Nana Petit (Aquascape Plant)",
        qty: 3,
        price: 35000,
        variant: "Potted",
      },
    ],
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("all");

  // Filter Pesanan Berdasarkan Tab Menu Shopee
  const filteredOrders =
    activeTab === "all"
      ? SHOPEE_STYLE_ORDERS
      : SHOPEE_STYLE_ORDERS.filter((order) => order.statusId === activeTab);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 tracking-wide">
      <div className="max-w-4xl mx-auto">
        {/* 👤 PROFILE HEADER BANNER */}
        <div className="bg-zinc-900/20 border border-zinc-900 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div className="h-14 w-14 bg-[#112229]/60 rounded-xl flex items-center justify-center border border-teal-900/40">
              <Fish className="h-6 w-6 text-teal-500" />
            </div>
            <div>
              <h1 className="text-lg font-light text-zinc-100 uppercase tracking-widest">
                Ruang{" "}
                <span className="text-teal-500 font-normal">Aquarist</span>
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                Budi Santoso • Member Premium Oday Gallery
              </p>
            </div>
          </div>
          <div className="text-center sm:text-right border-t sm:border-0 border-zinc-900 pt-3 sm:pt-0 w-full sm:w-auto">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">
              Total Kebutuhan Hobiku
            </div>
            <div className="text-base font-mono font-medium text-zinc-200 mt-0.5">
              Rp 760.000
            </div>
          </div>
        </div>

        {/* 📊 SHOPEE STATUS OVERVIEW CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-zinc-950 border-zinc-900 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-zinc-900/60 text-zinc-500 rounded-lg">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                Belum Bayar
              </div>
              <div className="text-sm font-mono text-zinc-200 font-medium">
                0
              </div>
            </div>
          </Card>
          <Card className="bg-zinc-950 border-zinc-900 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-amber-500/5 text-amber-400 border border-amber-950/30 rounded-lg">
              <Package className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] text-amber-500 uppercase tracking-wider">
                Dikemas
              </div>
              <div className="text-sm font-mono text-zinc-200 font-medium">
                1
              </div>
            </div>
          </Card>
          <Card className="bg-zinc-950 border-zinc-900 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-teal-500/5 text-teal-400 border border-teal-950/30 rounded-lg">
              <Truck className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] text-teal-400 uppercase tracking-wider">
                Dikirim
              </div>
              <div className="text-sm font-mono text-zinc-200 font-medium">
                1
              </div>
            </div>
          </Card>
          <Card className="bg-zinc-950 border-zinc-900 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-zinc-900/60 text-zinc-500 rounded-lg">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                Selesai
              </div>
              <div className="text-sm font-mono text-zinc-200 font-medium">
                1
              </div>
            </div>
          </Card>
        </div>

        {/* 📑 SHOPEE TRANSACTION TABS INTERFACE */}
        <div className="flex border-b border-zinc-900 mb-6 overflow-x-auto text-xs no-scrollbar">
          {[
            { id: "all", label: "Semua Pesanan" },
            { id: "processing", label: "Sedang Dikemas" },
            { id: "shipped", label: "Dikirim" },
            { id: "delivered", label: "Selesai" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 uppercase tracking-wider whitespace-nowrap transition-all border-b-2 font-medium ${
                activeTab === tab.id
                  ? "border-teal-500 text-teal-400 bg-teal-950/5"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🛒 LIST TRANSAKSI KOMPONEN MODULAR */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 border border-zinc-900 rounded-xl bg-zinc-950/20">
              <p className="text-xs text-zinc-600 uppercase tracking-widest">
                Tidak ada riwayat pada kategori ini
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <Card
                key={order.id}
                className="bg-zinc-950 border-zinc-900 overflow-hidden rounded-xl"
              >
                {/* Atas Kartu: ID & Status */}
                <div className="p-4 bg-zinc-900/10 border-b border-zinc-900/60 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium text-zinc-400">
                      {order.id}
                    </span>
                    <span className="text-zinc-600">|</span>
                    <span className="text-zinc-500">{order.date}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`rounded text-[10px] font-mono px-2 py-0.5 ${
                      order.statusId === "delivered"
                        ? "bg-teal-500/5 text-teal-400 border-teal-950/50"
                        : order.statusId === "shipped"
                          ? "bg-blue-500/5 text-blue-400 border-blue-950/50"
                          : "bg-amber-500/5 text-amber-400 border-amber-950/50"
                    }`}
                  >
                    {order.status}
                  </Badge>
                </div>

                {/* Tengah Kartu: Daftar Item Produk Terbeli */}
                <div className="divide-y divide-zinc-900/40 px-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="py-4 flex items-start gap-4">
                      {/* Kotak Dummy Foto Produk */}
                      <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <ShoppingBag className="h-4 w-4 text-zinc-700" />
                      </div>
                      {/* Metadata Produk */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-zinc-200 truncate">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-zinc-600 mt-0.5">
                          Varian: {item.variant}
                        </p>
                        <p className="text-[11px] text-zinc-500 mt-1">
                          x{item.qty}
                        </p>
                      </div>
                      {/* Harga Kanan */}
                      <div className="text-xs font-mono text-zinc-400 pt-0.5">
                        Rp {item.price.toLocaleString("id-ID")}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bawah Kartu: Info Total Pembayaran & Tombol Aksi */}
                <div className="p-4 bg-zinc-900/5 border-t border-zinc-900/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    {order.resi && (
                      <div className="text-[10px] text-zinc-600 font-mono">
                        No. Resi Kirim:{" "}
                        <span className="text-zinc-400">{order.resi}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wide block">
                        Total Pesanan
                      </span>
                      <span className="text-xs font-mono font-semibold text-teal-500">
                        Rp{" "}
                        {(order.total + order.shippingCost).toLocaleString(
                          "id-ID",
                        )}
                      </span>
                    </div>

                    {/* Aksi Fleksibel Kondisional */}
                    <div className="flex gap-2">
                      <button className="p-2 text-zinc-500 hover:text-zinc-300 border border-zinc-900 bg-zinc-950 rounded-lg transition-colors">
                        <MessageSquare className="h-3.5 w-3.5" />
                      </button>

                      {order.statusId === "delivered" ? (
                        <button className="text-[10px] uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white rounded-lg px-4 py-2 transition-all font-medium">
                          Beli Lagi
                        </button>
                      ) : (
                        <button className="text-[10px] uppercase tracking-wider bg-teal-900/20 border border-teal-800/40 text-teal-400 hover:bg-teal-600 hover:text-white rounded-lg px-4 py-2 transition-all font-medium flex items-center gap-1">
                          Lacak Paket <ChevronRight className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
