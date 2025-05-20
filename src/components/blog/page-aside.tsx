import Link from "next/link";
import type React from "react";
import useSWR from "swr";

import pkg from "@/../package.json";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Skeleton } from "@/registry/new-york/ui/skeleton";
import type { IArchive, ICategory, ITag } from "@/types/blog";
import { cn } from "@/lib/utils";
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
              href={{ pathname: `${scope}/${category.key}` }}
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
        <div key={archive.year}>
          <ul className="m-0 list-none">
            {archive.months.map((month) => (
              <li key={month.month} className="mt-0 pt-2">
                <div className="flex items-center gap-2">
                  <Link
                    href={{
                      pathname: `/archive/${archive.year}/${month.month}`,
                    }}
                    className={cn(
                      "inline-block no-underline transition-colors hover:text-foreground",
                      "text-muted-foreground",
                    )}
                  >
                    {archive.year} /{" "}
                    {month.month < 9 ? `0${month.month}` : month.month}
                  </Link>
                  <div>({month.total})</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
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

interface ITagsProps {
  tags: ITag[];
  scope?: string;
}

export function Tags({ tags, scope = "/tag" }: ITagsProps) {
  return (
    <ul className={cn("m-0 list-none flex flex-wrap gap-2")}>
      {tags.map((tag) => (
        <li key={tag.name} className="mt-0">
          <Link
            href={{ pathname: `${scope}/${tag.name.replace(/\s+/g, "-")}` }}
            className={cn(
              "inline-block no-underline transition-colors hover:text-foreground px-2 py-1 rounded-md text-sm",
              "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground",
            )}
          >
            {tag.name} ({tag.count})
          </Link>
        </li>
      ))}
    </ul>
  );
}
