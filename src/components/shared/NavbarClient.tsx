"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User as UserType } from "@/types/auth.type";
import { logoutUser } from "../../../services/auth.service";

type NavbarClientProps = {
  user: UserType;
};

export function NavbarClient({ user }: NavbarClientProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Welcome Message */}
      <span className="hidden sm:block text-xs text-zinc-400 tracking-wide">
        Selamat datang,{" "}
        <span className="text-amber-400 font-medium">{user.name}</span>
      </span>

      {/* Dashboard Button - for admin */}
      {user.role === "admin" && (
        <Link href="/dashboard">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-zinc-900 hover:text-amber-400 rounded-none"
            title="Dashboard Admin"
          >
            <LayoutDashboard className="h-4 w-4 text-zinc-400 hover:text-amber-400" />
          </Button>
        </Link>
      )}

      {/* User Icon */}
      <Link href={user.role === "admin" ? "/dashboard" : "/"}>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-zinc-900 hover:text-amber-400 rounded-none"
        >
          <User className="h-4 w-4 text-zinc-400 hover:text-amber-400" />
        </Button>
      </Link>

      {/* Logout Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="hover:bg-zinc-900 hover:text-rose-400 rounded-none"
        title="Logout"
      >
        <LogOut className="h-4 w-4 text-zinc-400 hover:text-rose-400" />
      </Button>
    </div>
  );
}
