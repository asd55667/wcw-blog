import Link from "next/link";
import type React from "react";
import useSWR from "swr";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Skeleton } from "@/registry/new-york/ui/skeleton";

import pkg from "@/../package.json";
import type { IArchive, ICategory } from "@/types/blog";
import { cn } from "@/utils";
import { fetcher } from "@/utils/fetcher";

export interface IAsideBlock {
  title: string;
  children: React.ReactNode;
}

export function AsideBlock({ title, children }: IAsideBlock) {
  return (
    <Card className="relative min-w-60">
      <CardHeader className="p-4">
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="">{children}</CardContent>
    </Card>
  );
}

export function AboutMe() {
  return (
    <p>
      {pkg.author.name}, a developer startsWith front end, want to build
      something interesting
    </p>
  );
}

interface ICategoryProps {
  categories: ICategory[];
  level?: number;
  scope?: string;
}

export function Category({
  categories,
  level = 1,
  scope = "/category",
}: ICategoryProps) {
  return (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {categories.map((category) => (
        <li key={category.key} className="mt-0">
          <div className="flex items-center gap-2">
            <Link
              href={{ pathname: `${scope}/${category.key}/1` }}
              className={cn(
                "inline-block no-underline transition-colors hover:text-foreground",
                "text-muted-foreground",
              )}
            >
              {category.title}
            </Link>

            <div>({category.total})</div>
          </div>

          {category.children.length ? (
            <Category
              categories={category.children}
              level={level + 1}
              scope={`${scope}/${category.key}`}
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function Archives() {
  const { data: list, isLoading } = useSWR<IArchive[]>(
    "/api/archive/list",
    fetcher,
  );

  if (isLoading) {
    return <SkeletonGroup length={5} />;
  }

  if (!list?.length) {
    return <div>Not Content</div>;
  }

  return (
    <ul className="m-0 list-none">
      {list.map((archive) => (
        <li key={archive.year} className={cn("mt-0 pt-2")}>
          <ul className="m-0 list-none">
            {archive.months.map((month) => (
              <li key={month.month} className={cn("mt-0 pt-2")}>
                <div className="flex items-center gap-2">
                  <Link
                    href={{
                      pathname: `/archive/${archive.year}/${month.month + 1}/1`,
                    }}
                    className={cn(
                      "inline-block no-underline transition-colors hover:text-foreground",
                      "text-muted-foreground",
                    )}
                  >
                    {archive.year} /{" "}
                    {month.month < 9 ? `0${month.month + 1}` : month.month}
                  </Link>
                  <div>({month.posts.length})</div>
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export function SkeletonGroup({ length }: { length: number }) {
  return (
    <div className="flex flex-col gap-2 w-48">
      {Array.from({ length }).map((_, index) => (
        <Skeleton className="h-6 w-full" key={index} />
      ))}
    </div>
  );
}
