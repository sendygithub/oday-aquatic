"use client";

import { Layers, RefreshCw, AlertCircle, FileText } from "lucide-react";

const INCOMING_ORDERS = [
  {
    id: "ORD-9821",
    customer: "Ahmad Rifai",
    total: 162000,
    kurir: "Karantina Express",
    status: "Perlu Dikemas",
  },
  {
    id: "ORD-9820",
    customer: "Siti Rahma",
    total: 95000,
    kurir: "Ojek Online (Sameday)",
    status: "Menunggu Pembayaran",
  },
];

export default function DashboardOrdersPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 tracking-wide">
      <div className="max-w-5xl mx-auto">
        {/* Header Dashboard */}
        <div className="border-b border-zinc-900 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <Layers className="h-6 w-6 text-teal-600" />
            <div>
              <h1 className="text-xl font-light text-zinc-100 uppercase tracking-[0.2em]">
                Manajemen Invoice Masuk
              </h1>
              <p className="text-xs text-zinc-500 font-light mt-1">
                Validasi transaksi masuk, penataan sistem manifes, dan
                konfirmasi pengiriman paket air.
              </p>
            </div>
          </div>
        </div>

        {/* Tabel Orderan Masuk */}
        <div className="w-full overflow-x-auto border border-zinc-900 bg-zinc-950 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-900/30 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                <th className="py-4 px-6 font-medium">ID Order</th>
                <th className="py-4 px-6 font-medium">Nama Pemesan</th>
                <th className="py-4 px-6 font-medium">Metode Kirim</th>
                <th className="py-4 px-6 font-medium">Total Dana</th>
                <th className="py-4 px-6 font-medium text-center">
                  Status Alur
                </th>
                <th className="py-4 px-6 font-medium text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-xs font-light">
              {INCOMING_ORDERS.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-zinc-900/10 transition-colors"
                >
                  <td className="py-4 px-6 font-mono text-zinc-300 font-medium">
                    {order.id}
                  </td>
                  <td className="py-4 px-6 text-zinc-400">{order.customer}</td>
                  <td className="py-4 px-6 text-zinc-500 font-light">
                    {order.kurir}
                  </td>
                  <td className="py-4 px-6 font-medium">
                    Rp {order.total.toLocaleString("id-ID")}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium font-mono ${
                        order.status === "Perlu Dikemas"
                          ? "text-amber-400 bg-amber-500/10"
                          : "text-zinc-500 bg-zinc-900"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          alert(`Memproses manifes kemasan untuk ${order.id}`)
                        }
                        className="p-1.5 text-[10px] uppercase tracking-wider text-teal-400 bg-teal-500/5 border border-teal-900/50 rounded-lg hover:bg-teal-600 hover:text-white transition-all px-2.5 py-1"
                      >
                        Proses Paket
                      </button>
                      <button className="p-1.5 text-zinc-600 hover:text-zinc-400 border border-transparent hover:border-zinc-800 rounded-lg transition-all">
                        <FileText className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
