import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { docsConfig } from "@/config/docs";

export function Announcement() {
  return (
    <Link
      href={{ pathname: `${docsConfig.name}` }}
      className="group mb-2 inline-flex items-center px-0.5 text-sm font-medium"
    >
      <span className="underline-offset-4 group-hover:underline">
        Introduction
      </span>
      <ArrowRight className="ml-1 h-4 w-4" />
    </Link>
  );
}
