"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  RefreshCw,
  Plus,
  Table2,
  Receipt,
} from "lucide-react";
import { getAllOrders, getOrderCounts } from "../../../services/order.service";
import type { OrderWithItems } from "../../../services/order.service";
import { getSession } from "../../../services/auth.service";
import type { User } from "@/types/auth.type";

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    badge: string;
    icon: React.ReactNode;
  }
> = {
  pending: {
    label: "Menunggu Konfirmasi",
    badge: "bg-amber-500/5 text-amber-400 border-amber-950/50",
    icon: <CreditCard className="h-4 w-4" />,
  },
  processing: {
    label: "Sedang Dikemas",
    badge: "bg-amber-500/5 text-amber-400 border-amber-950/50",
    icon: <Package className="h-4 w-4" />,
  },
  shipped: {
    label: "Dalam Pengiriman",
    badge: "bg-blue-500/5 text-blue-400 border-blue-950/50",
    icon: <Truck className="h-4 w-4" />,
  },
  delivered: {
    label: "Selesai",
    badge: "bg-teal-500/5 text-teal-400 border-teal-950/50",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  cancelled: {
    label: "Dibatalkan",
    badge: "bg-rose-500/5 text-rose-400 border-rose-950/50",
    icon: <CreditCard className="h-4 w-4" />,
  },
};

export default function DashboardPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [counts, setCounts] = useState({
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    total: 0,
  });
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [ordersData, countsData, session] = await Promise.all([
        getAllOrders(),
        getOrderCounts(),
        getSession(),
      ]);
      setOrders(ordersData);
      setCounts(countsData);
      setUser(session);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 tracking-wide">
        <div className="max-w-4xl mx-auto text-center py-16">
          <RefreshCw className="h-8 w-8 text-zinc-600 mx-auto mb-4 animate-spin" />
          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            Memuat data dashboard...
          </p>
        </div>
      </div>
    );
  }

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
                {user?.name ?? "Pengunjung"} •{" "}
                {orders.length > 0
                  ? `${orders.length} pesanan`
                  : "Belum ada pesanan"}
              </p>
            </div>
          </div>
          <div className="text-center sm:text-right border-t sm:border-0 border-zinc-900 pt-3 sm:pt-0 w-full sm:w-auto">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">
              Total Belanja
            </div>
            <div className="text-base font-mono font-medium text-zinc-200 mt-0.5">
              Rp {totalSpent.toLocaleString("id-ID")}
            </div>
          </div>
        </div>

        {/* 🔗 QUICK ACTION BUTTONS */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <Link
            href="/add"
            className="flex items-center justify-center gap-2 bg-zinc-900/40 border border-zinc-800 hover:border-teal-600/50 hover:bg-teal-950/10 rounded-xl px-4 py-4 transition-all group"
          >
            <Plus className="h-4 w-4 text-teal-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs uppercase tracking-wider text-zinc-400 group-hover:text-teal-400 font-medium">
              Tambah Produk
            </span>
          </Link>
          <Link
            href="/tabel"
            className="flex items-center justify-center gap-2 bg-zinc-900/40 border border-zinc-800 hover:border-teal-600/50 hover:bg-teal-950/10 rounded-xl px-4 py-4 transition-all group"
          >
            <Table2 className="h-4 w-4 text-teal-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs uppercase tracking-wider text-zinc-400 group-hover:text-teal-400 font-medium">
              Data Produk
            </span>
          </Link>
          <Link
            href="/transaksi"
            className="flex items-center justify-center gap-2 bg-zinc-900/40 border border-zinc-800 hover:border-teal-600/50 hover:bg-teal-950/10 rounded-xl px-4 py-4 transition-all group"
          >
            <Receipt className="h-4 w-4 text-teal-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs uppercase tracking-wider text-zinc-400 group-hover:text-teal-400 font-medium">
              Transaksi
            </span>
          </Link>
        </div>

        {/* 📊 STATUS OVERVIEW CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-zinc-950 border-zinc-900 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-amber-500/5 text-amber-400 border border-amber-950/30 rounded-lg">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] text-amber-500 uppercase tracking-wider">
                Menunggu
              </div>
              <div className="text-sm font-mono text-zinc-200 font-medium">
                {counts.pending}
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
                {counts.processing}
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
                {counts.shipped}
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
                {counts.delivered}
              </div>
            </div>
          </Card>
        </div>

        {/* 📑 TRANSACTION TABS */}
        <div className="flex border-b border-zinc-900 mb-6 overflow-x-auto text-xs no-scrollbar">
          {[
            { id: "all", label: "Semua Pesanan" },
            { id: "pending", label: "Menunggu" },
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

        {/* 🛒 LIST TRANSAKSI */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 border border-zinc-900 rounded-xl bg-zinc-950/20">
              <p className="text-xs text-zinc-600 uppercase tracking-widest">
                Tidak ada riwayat pada kategori ini
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const config =
                STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
              return (
                <Card
                  key={order.id}
                  className="bg-zinc-950 border-zinc-900 overflow-hidden rounded-xl"
                >
                  {/* Atas Kartu: ID & Status */}
                  <div className="p-4 bg-zinc-900/10 border-b border-zinc-900/60 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-medium text-zinc-400">
                        {order.orderNumber}
                      </span>
                      <span className="text-zinc-600">|</span>
                      <span className="text-zinc-500">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`rounded text-[10px] font-mono px-2 py-0.5 ${config.badge}`}
                    >
                      {config.label}
                    </Badge>
                  </div>

                  {/* Tengah Kartu: Daftar Item Produk */}
                  <div className="divide-y divide-zinc-900/40 px-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="py-4 flex items-start gap-4"
                      >
                        <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-lg flex-shrink-0 flex items-center justify-center">
                          <ShoppingBag className="h-4 w-4 text-zinc-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-zinc-200 truncate">
                            {item.name}
                          </h4>
                          {item.variant && (
                            <p className="text-[10px] text-zinc-600 mt-0.5">
                              Varian: {item.variant}
                            </p>
                          )}
                          <p className="text-[11px] text-zinc-500 mt-1">
                            x{item.quantity}
                          </p>
                        </div>
                        <div className="text-xs font-mono text-zinc-400 pt-0.5">
                          Rp {item.price.toLocaleString("id-ID")}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bawah Kartu: Info Total & Aksi */}
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
                          Rp {order.total.toLocaleString("id-ID")}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button className="p-2 text-zinc-500 hover:text-zinc-300 border border-zinc-900 bg-zinc-950 rounded-lg transition-colors">
                          <MessageSquare className="h-3.5 w-3.5" />
                        </button>

                        {order.status === "delivered" ? (
                          <button className="text-[10px] uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white rounded-lg px-4 py-2 transition-all font-medium">
                            Beli Lagi
                          </button>
                        ) : order.status === "shipped" ? (
                          <button className="text-[10px] uppercase tracking-wider bg-teal-900/20 border border-teal-800/40 text-teal-400 hover:bg-teal-600 hover:text-white rounded-lg px-4 py-2 transition-all font-medium flex items-center gap-1">
                            Lacak Paket <ChevronRight className="h-3 w-3" />
                          </button>
                        ) : (
                          <button className="text-[10px] uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-lg px-4 py-2 transition-all font-medium cursor-not-allowed">
                            Menunggu
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
