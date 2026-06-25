"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { User } from "@/types/auth.type";

const SESSION_COOKIE_NAME = "oday_session";

/**
 * Hash password sederhana (untuk production gunakan bcrypt)
 */
async function hashPassword(password: string): Promise<string> {
  const { createHash } = await import("crypto");
  return createHash("sha256").update(password).digest("hex");
}

/**
 * Verify password
 */
async function verifyPassword(
  password: string,
  hashed: string,
): Promise<boolean> {
  const hash = await hashPassword(password);
  return hash === hashed;
}

/**
 * Register a new user
 */
export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, message: "Email sudah terdaftar." };
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "user", // Default role is user
      },
    });

    // Create session
    await createSession({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as User["role"],
    });

    return {
      success: true,
      message: "Akun berhasil dibuat!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role as User["role"],
      },
    };
  } catch (error) {
    console.error("Register error:", error);
    return { success: false, message: "Terjadi kesalahan saat mendaftar." };
  }
}

/**
 * Login user
 */
export async function loginUser(
  email: string,
  password: string,
): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, message: "Email atau password salah." };
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return { success: false, message: "Email atau password salah." };
    }

    // Create session
    await createSession({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as User["role"],
    });

    return {
      success: true,
      message: "Login berhasil!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as User["role"],
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Terjadi kesalahan saat login." };
  }
}

/**
 * Get current session user
 */
export async function getSession(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie?.value) return null;

    const sessionData = JSON.parse(sessionCookie.value) as {
      id: string;
      name: string;
      email: string;
      role: string;
    };

    // Verify user still exists in database
    const user = await prisma.user.findUnique({
      where: { id: sessionData.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      // Clean up invalid session
      await destroySession();
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as User["role"],
    };
  } catch {
    return null;
  }
}

/**
 * Logout - destroy session
 */
export async function logoutUser(): Promise<void> {
  await destroySession();
}

/**
 * Create session cookie
 */
async function createSession(user: User): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(
    SESSION_COOKIE_NAME,
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    },
  );
}

/**
 * Destroy session cookie
 */
async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
