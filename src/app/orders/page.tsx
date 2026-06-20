"use client";

import { Package, Eye, CheckCircle2, Truck, Clock } from "lucide-react";

const MOCK_ORDERS = [
  {
    id: "ORD-9821",
    date: "20 Juni 2026",
    total: 162000,
    status: "Dikirim",
    items: "Guppy Albino Full Red (x2)...",
    resi: "JX-9921021A",
  },
  {
    id: "ORD-9710",
    date: "15 Juni 2026",
    total: 450000,
    status: "Selesai",
    items: "Wild Betta Mahachaiensis (x1)",
    resi: "JX-9912839B",
  },
];

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 tracking-wide">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-light text-zinc-100 uppercase tracking-[0.2em] mb-8 border-b border-zinc-900 pb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-teal-600" /> Riwayat Transaksi
        </h1>

        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => (
            <div
              key={order.id}
              className="bg-zinc-900/20 border border-zinc-900 p-5 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-medium text-zinc-200">
                    {order.id}
                  </span>
                  <span className="text-[10px] text-zinc-600">
                    {order.date}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-light">
                  {order.items}
                </p>
                <div className="text-xs font-medium text-zinc-300 mt-1">
                  Total: Rp {order.total.toLocaleString("id-ID")}
                </div>
                {order.resi && (
                  <div className="text-[10px] text-zinc-600 font-mono">
                    No. Resi: {order.resi}
                  </div>
                )}
              </div>

              {/* Status & Detail */}
              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 border-zinc-900/60 pt-3 sm:pt-0">
                <div className="flex items-center gap-1.5">
                  {order.status === "Dikirim" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-400 font-medium">
                      <Truck className="h-3 w-3" /> Dalam Perjalanan
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] bg-teal-500/10 text-teal-400 font-medium">
                      <CheckCircle2 className="h-3 w-3" /> Paket Diterima
                    </span>
                  )}
                </div>

                <button className="p-2 text-zinc-500 hover:text-teal-400 bg-zinc-900/50 border border-zinc-800 rounded-lg transition-colors flex items-center gap-1 text-[10px] uppercase tracking-wider px-3">
                  <Eye className="h-3 w-3" /> Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
