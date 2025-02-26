"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icon";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { capitalize } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <Link
          href={{ pathname: `/${docsConfig.name}` }}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === `/${docsConfig.name}`
              ? "text-foreground"
              : "text-foreground/80",
          )}
        >
          {capitalize(docsConfig.name)}
        </Link>

        <Link
          href={{ pathname: "/category" }}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/category")
              ? "text-foreground"
              : "text-foreground/80",
          )}
        >
          Category
        </Link>

        <Link
          href={{ pathname: "/archive" }}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/archive")
              ? "text-foreground"
              : "text-foreground/80",
          )}
        >
          Archive
        </Link>
      </nav>
    </div>
  );
}
