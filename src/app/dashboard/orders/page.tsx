"use client";

import { useState, useEffect } from "react";
import { Layers, FileText, CheckCircle, Truck, RefreshCw } from "lucide-react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../../../services/order.service";
import type { OrderWithItems } from "../../../../services/order.service";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: {
    label: "Menunggu Konfirmasi",
    color: "text-amber-400 bg-amber-500/10",
  },
  processing: {
    label: "Sedang Dikemas",
    color: "text-blue-400 bg-blue-500/10",
  },
  shipped: { label: "Dalam Pengiriman", color: "text-teal-400 bg-teal-500/10" },
  delivered: { label: "Selesai", color: "text-emerald-400 bg-emerald-500/10" },
  cancelled: { label: "Dibatalkan", color: "text-rose-400 bg-rose-500/10" },
};

export default function DashboardOrdersPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [resiInput, setResiInput] = useState<Record<string, string>>({});

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmOrder = async (orderId: string) => {
    setActionLoading(orderId);
    try {
      const result = await updateOrderStatus(orderId, "processing");
      if (result.success) {
        await loadOrders();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error confirming order:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleShipOrder = async (orderId: string) => {
    const resi = resiInput[orderId];
    if (!resi || resi.trim() === "") {
      alert("Harap masukkan nomor resi pengiriman.");
      return;
    }

    setActionLoading(orderId);
    try {
      const result = await updateOrderStatus(orderId, "shipped", resi.trim());
      if (result.success) {
        setResiInput((prev) => ({ ...prev, [orderId]: "" }));
        await loadOrders();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error shipping order:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCompleteOrder = async (orderId: string) => {
    setActionLoading(orderId);
    try {
      const result = await updateOrderStatus(orderId, "delivered");
      if (result.success) {
        await loadOrders();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error completing order:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 tracking-wide">
        <div className="max-w-5xl mx-auto text-center py-16">
          <RefreshCw className="h-8 w-8 text-zinc-600 mx-auto mb-4 animate-spin" />
          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            Memuat data pesanan...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 tracking-wide">
      <div className="max-w-6xl mx-auto">
        {/* Header Dashboard */}
        <div className="border-b border-zinc-900 pb-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers className="h-6 w-6 text-teal-600" />
            <div>
              <h1 className="text-xl font-light text-zinc-100 uppercase tracking-[0.2em]">
                Manajemen Pesanan Masuk
              </h1>
              <p className="text-xs text-zinc-500 font-light mt-1">
                Validasi transaksi, konfirmasi kemasan, dan atur pengiriman.
              </p>
            </div>
          </div>
          <button
            onClick={loadOrders}
            className="text-xs text-zinc-500 hover:text-teal-400 flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="h-3 w-3" /> Refresh
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-900 rounded-xl">
            <p className="text-xs text-zinc-600 uppercase tracking-widest">
              Belum ada pesanan masuk
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto border border-zinc-900 bg-zinc-950 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-900 bg-zinc-900/30 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  <th className="py-4 px-6 font-medium">ID Order</th>
                  <th className="py-4 px-6 font-medium">Tanggal</th>
                  <th className="py-4 px-6 font-medium">Pemesan</th>
                  <th className="py-4 px-6 font-medium">Alamat</th>
                  <th className="py-4 px-6 font-medium">Item</th>
                  <th className="py-4 px-6 font-medium">Total</th>
                  <th className="py-4 px-6 font-medium text-center">Status</th>
                  <th className="py-4 px-6 font-medium text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-xs font-light">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-zinc-900/10 transition-colors"
                  >
                    <td className="py-4 px-6 font-mono text-zinc-300 font-medium text-[11px]">
                      {order.orderNumber}
                    </td>
                    <td className="py-4 px-6 text-zinc-500 text-[10px]">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-zinc-300 font-medium">
                        {order.customerName}
                      </div>
                      <div className="text-zinc-600 text-[10px]">
                        {order.customerPhone}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-zinc-500 max-w-[200px] truncate">
                      {order.customerAddress}, {order.customerCity}
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="text-zinc-400 text-[10px]"
                          >
                            {item.name} x{item.quantity}
                            {item.variant && (
                              <span className="text-zinc-600">
                                {" "}
                                ({item.variant})
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono font-medium text-zinc-200">
                      Rp {order.total.toLocaleString("id-ID")}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium font-mono ${
                          STATUS_MAP[order.status]?.color ??
                          "text-zinc-500 bg-zinc-900"
                        }`}
                      >
                        {STATUS_MAP[order.status]?.label ?? order.status}
                      </span>
                      {order.resi && (
                        <div className="text-[9px] text-zinc-600 mt-1 font-mono">
                          Resi: {order.resi}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        {/* Pending → Processing (Confirm) */}
                        {order.status === "pending" && (
                          <button
                            onClick={() => handleConfirmOrder(order.id)}
                            disabled={actionLoading === order.id}
                            className="p-1.5 text-[10px] uppercase tracking-wider text-teal-400 bg-teal-500/5 border border-teal-900/50 rounded-lg hover:bg-teal-600 hover:text-white transition-all px-2.5 py-1 disabled:opacity-50"
                          >
                            {actionLoading === order.id ? "..." : "Konfirmasi"}
                          </button>
                        )}

                        {/* Processing → Shipped (Input Resi) */}
                        {order.status === "processing" && (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              placeholder="No. Resi"
                              value={resiInput[order.id] ?? ""}
                              onChange={(e) =>
                                setResiInput((prev) => ({
                                  ...prev,
                                  [order.id]: e.target.value,
                                }))
                              }
                              className="w-24 bg-zinc-900 border border-zinc-800 rounded text-[10px] px-2 py-1 text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:border-teal-600"
                            />
                            <button
                              onClick={() => handleShipOrder(order.id)}
                              disabled={actionLoading === order.id}
                              className="p-1.5 text-[10px] uppercase tracking-wider text-blue-400 bg-blue-500/5 border border-blue-900/50 rounded-lg hover:bg-blue-600 hover:text-white transition-all px-2.5 py-1 disabled:opacity-50"
                            >
                              <Truck className="h-3 w-3" />
                            </button>
                          </div>
                        )}

                        {/* Shipped → Delivered (Complete) */}
                        {order.status === "shipped" && (
                          <button
                            onClick={() => handleCompleteOrder(order.id)}
                            disabled={actionLoading === order.id}
                            className="p-1.5 text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-500/5 border border-emerald-900/50 rounded-lg hover:bg-emerald-600 hover:text-white transition-all px-2.5 py-1 disabled:opacity-50"
                          >
                            <CheckCircle className="h-3 w-3" />
                          </button>
                        )}

                        {order.status === "delivered" && (
                          <span className="text-[10px] text-zinc-600">
                            Selesai
                          </span>
                        )}

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
        )}
      </div>
    </div>
  );
}
