"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "./auth.service";

export type OrderWithItems = {
  id: string;
  orderNumber: string;
  userId: string | null;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerPostalCode: string | null;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: string;
  resi: string | null;
  createdAt: Date;
  updatedAt: Date;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    variant: string | null;
  }[];
};

/**
 * Get all orders (for admin dashboard)
 */
export async function getAllOrders(): Promise<OrderWithItems[]> {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          select: {
            id: true,
            name: true,
            price: true,
            quantity: true,
            variant: true,
          },
        },
      },
    });

    return orders.map((order) => ({
      ...order,
      userId: order.userId ?? null,
      customerPostalCode: order.customerPostalCode ?? null,
      resi: order.resi ?? null,
    }));
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return [];
  }
}

/**
 * Get orders for the current logged-in user
 */
export async function getUserOrders(): Promise<OrderWithItems[]> {
  try {
    const session = await getSession();
    if (!session) return [];

    const orders = await prisma.order.findMany({
      where: { userId: session.id },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          select: {
            id: true,
            name: true,
            price: true,
            quantity: true,
            variant: true,
          },
        },
      },
    });

    return orders.map((order) => ({
      ...order,
      userId: order.userId ?? null,
      customerPostalCode: order.customerPostalCode ?? null,
      resi: order.resi ?? null,
    }));
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}

/**
 * Update order status (for admin)
 */
export async function updateOrderStatus(
  orderId: string,
  status: string,
  resi?: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const updateData: any = { status };
    if (resi) {
      updateData.resi = resi;
    }

    await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });

    return { success: true, message: "Status pesanan berhasil diperbarui." };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, message: "Gagal memperbarui status pesanan." };
  }
}

/**
 * Get order counts by status
 */
export async function getOrderCounts(): Promise<{
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  total: number;
}> {
  try {
    const [pending, processing, shipped, delivered, total] = await Promise.all([
      prisma.order.count({ where: { status: "pending" } }),
      prisma.order.count({ where: { status: "processing" } }),
      prisma.order.count({ where: { status: "shipped" } }),
      prisma.order.count({ where: { status: "delivered" } }),
      prisma.order.count(),
    ]);

    return { pending, processing, shipped, delivered, total };
  } catch (error) {
    console.error("Error getting order counts:", error);
    return { pending: 0, processing: 0, shipped: 0, delivered: 0, total: 0 };
  }
}
