"use server";

import { prisma } from "@/lib/prisma";
import { CartItem } from "@/types/cart.type";
import { cookies } from "next/headers";

const CART_COOKIE_NAME = "oday_cart";

/**
 * Helper to parse cart from cookies
 */
async function getCartFromCookies(): Promise<CartItem[]> {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get(CART_COOKIE_NAME);
  if (!cartCookie?.value) return [];
  try {
    return JSON.parse(cartCookie.value) as CartItem[];
  } catch {
    return [];
  }
}

/**
 * Helper to save cart to cookies
 */
async function saveCartToCookies(cart: CartItem[]): Promise<void> {
  const cookieStore = await cookies();
  // Set cookie with 7 days expiry
  cookieStore.set(CART_COOKIE_NAME, JSON.stringify(cart), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

/**
 * Add a product to the cart.
 * If the product already exists, increment quantity.
 */
export async function addToCart(
  productId: string,
): Promise<{ success: boolean; message: string }> {
  try {
    // Fetch product from database
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return { success: false, message: "Produk tidak ditemukan." };
    }

    if (product.stock <= 0) {
      return { success: false, message: "Stok produk sedang habis." };
    }

    const cart = await getCartFromCookies();
    const existingIndex = cart.findIndex((item) => item.id === productId);

    if (existingIndex >= 0) {
      // Increment quantity if already in cart
      cart[existingIndex].quantity += 1;
    } else {
      // Add new item
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.imageUrl ?? "/placeholder.jpg",
        strain: product.material ?? "-",
      });
    }

    await saveCartToCookies(cart);

    return {
      success: true,
      message: `${product.name} berhasil ditambahkan ke keranjang!`,
    };
  } catch (error) {
    console.error("Gagal menambahkan ke keranjang:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat menambahkan ke keranjang.",
    };
  }
}

/**
 * Get current cart items
 */
export async function getCart(): Promise<CartItem[]> {
  return getCartFromCookies();
}

/**
 * Update quantity of a cart item
 */
export async function updateCartItemQuantity(
  productId: string,
  delta: number,
): Promise<{ success: boolean; cart: CartItem[] }> {
  const cart = await getCartFromCookies();
  const updatedCart = cart
    .map((item) => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    })
    .filter((item) => item.quantity > 0);

  await saveCartToCookies(updatedCart);
  return { success: true, cart: updatedCart };
}

/**
 * Remove an item from cart
 */
export async function removeCartItem(
  productId: string,
): Promise<{ success: boolean; cart: CartItem[] }> {
  const cart = await getCartFromCookies();
  const updatedCart = cart.filter((item) => item.id !== productId);
  await saveCartToCookies(updatedCart);
  return { success: true, cart: updatedCart };
}

/**
 * Clear the entire cart
 */
export async function clearCart(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CART_COOKIE_NAME);
}
