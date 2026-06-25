import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "../../../../services/auth.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, shippingInfo } = body;

    // Validasi input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Keranjang belanja kosong." },
        { status: 400 },
      );
    }

    if (
      !shippingInfo?.fullName ||
      !shippingInfo?.address ||
      !shippingInfo?.city ||
      !shippingInfo?.phone
    ) {
      return NextResponse.json(
        { success: false, message: "Data pengiriman tidak lengkap." },
        { status: 400 },
      );
    }

    // Get current user session
    const session = await getSession();

    // Validasi stok untuk setiap item
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.id },
      });

      if (!product) {
        return NextResponse.json(
          { success: false, message: `Produk ${item.name} tidak ditemukan.` },
          { status: 404 },
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            message: `Stok ${product.name} tidak mencukupi. Tersedia: ${product.stock}, diminta: ${item.quantity}.`,
          },
          { status: 400 },
        );
      }
    }

    // Hitung total
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0,
    );
    const shippingCost = 15000;
    const total = subtotal + shippingCost;

    // Generate order number
    const orderNumber = `ODA-${Date.now().toString(36).toUpperCase()}`;

    // Simpan order ke database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session?.id ?? null,
        customerName: shippingInfo.fullName,
        customerPhone: shippingInfo.phone,
        customerAddress: shippingInfo.address,
        customerCity: shippingInfo.city,
        customerPostalCode: shippingInfo.postalCode ?? null,
        subtotal,
        shippingCost,
        total,
        status: "pending",
        items: {
          create: items.map(
            (item: {
              id: string;
              name: string;
              price: number;
              quantity: number;
              strain?: string;
            }) => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              variant: item.strain ?? null,
            }),
          ),
        },
      },
      include: {
        items: true,
      },
    });

    // Kurangi stok untuk setiap item
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.id },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Pesanan berhasil diproses!",
      data: {
        orderId: order.orderNumber,
        id: order.id,
        items,
        shippingInfo,
        subtotal,
        shippingCost,
        total,
      },
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat memproses pesanan." },
      { status: 500 },
    );
  }
}
