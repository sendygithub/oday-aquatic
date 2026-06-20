import Link from "next/link";
import { ShoppingCart, Search, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b backdrop-blur-md bg-zinc-950/80 text-white border-zinc-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo - Oday Gallery Premium Style */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-2xl font-light tracking-widest uppercase"
        >
          <Waves className="h-5 w-5 text-amber-500/80 tracking-normal not-italic" />
          <span>Oday</span>
          <span className="text-amber-500 font-medium text-xs tracking-[0.4em] mt-0.5 pl-1 border-l border-zinc-800">
            Gallery
          </span>
        </Link>

        {/* Search Bar Minimalis */}
        <div className="hidden md:flex flex-1 max-w-sm mx-8 items-center relative">
          <Search className="absolute left-3 h-3.5 w-3.5 text-zinc-500" />
          <Input
            type="search"
            placeholder="Search premium aquatics, channa, discus..."
            className="w-full bg-zinc-900/50 border-zinc-900 text-zinc-300 text-xs pl-9 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/30 rounded-none placeholder:text-zinc-600"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-zinc-900 hover:text-amber-400 rounded-none"
          >
            <ShoppingCart className="h-4 w-4 text-zinc-400 hover:text-amber-400" />
          </Button>

          {/* Auth Buttons */}
          <div className="flex items-center gap-1">
            <Link href="/login">
              <Button
                variant="ghost"
                className="hidden sm:flex text-zinc-400 hover:text-white hover:bg-zinc-900 text-xs font-medium tracking-wider uppercase rounded-none"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-amber-500 hover:border-amber-500 hover:text-black text-xs font-medium tracking-wider uppercase rounded-none px-5 transition-all duration-300">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
