"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Fish,
  Waves,
  Bug,
  Lightbulb,
  Sparkles,
  Shell,
  Droplets,
  Leaf,
  Gem,
  Snowflake,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Guppy: <Fish className="h-3.5 w-3.5" />,
  Molly: <Fish className="h-3.5 w-3.5" />,
  Tetra: <Fish className="h-3.5 w-3.5" />,
  Platy: <Fish className="h-3.5 w-3.5" />,
  Rasbora: <Fish className="h-3.5 w-3.5" />,
  "Wild Betta": <Sparkles className="h-3.5 w-3.5" />,
  "Live Fish": <Fish className="h-3.5 w-3.5" />,
  "Aquascape Plant": <Leaf className="h-3.5 w-3.5" />,
  Shrimp: <Bug className="h-3.5 w-3.5" />,
  Equipment: <Lightbulb className="h-3.5 w-3.5" />,
  Snail: <Shell className="h-3.5 w-3.5" />,
  "Water Conditioner": <Droplets className="h-3.5 w-3.5" />,
  Decor: <Gem className="h-3.5 w-3.5" />,
  "Cold Water": <Snowflake className="h-3.5 w-3.5" />,
};

export function CategoryTabs({
  categories,
  activeCategory,
}: {
  categories: string[];
  activeCategory: string | null;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryClick = (category: string | null) => {
    if (category) {
      router.push(`${pathname}?category=${encodeURIComponent(category)}`);
    } else {
      router.push(pathname);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* "Semua" Tab */}
      <button
        onClick={() => handleCategoryClick(null)}
        className={`group relative flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider transition-all duration-300 rounded-lg border ${
          activeCategory === null
            ? "bg-teal-500/10 border-teal-500/30 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]"
            : "bg-zinc-900/30 border-zinc-800/50 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
        }`}
      >
        <Waves
          className={`h-3.5 w-3.5 transition-colors ${
            activeCategory === null ? "text-teal-400" : "text-zinc-600"
          }`}
        />
        <span>Semua</span>
        {activeCategory === null && (
          <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-teal-500 rounded-full" />
        )}
      </button>

      {/* Category Tabs */}
      {categories.map((category) => {
        const isActive = activeCategory === category;
        const icon = CATEGORY_ICONS[category] ?? (
          <Fish className="h-3.5 w-3.5" />
        );

        return (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`group relative flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider transition-all duration-300 rounded-lg border ${
              isActive
                ? "bg-teal-500/10 border-teal-500/30 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]"
                : "bg-zinc-900/30 border-zinc-800/50 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
            }`}
          >
            <span
              className={`transition-colors ${
                isActive
                  ? "text-teal-400"
                  : "text-zinc-600 group-hover:text-zinc-400"
              }`}
            >
              {icon}
            </span>
            <span>{category}</span>
            {isActive && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-teal-500 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
