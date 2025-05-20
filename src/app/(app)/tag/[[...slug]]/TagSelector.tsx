"use client";

import { ITag } from "@/types/blog";
import { fetcher } from "@/utils/fetcher";
// import Link from "next/link"; // No longer needed
import useSWR from "swr";
import { useState } from "react"; // Added
import { Badge } from "@/registry/new-york/ui/badge"; // Added

export function TagSelector() {
  const {
    data: tags,
    isLoading: isLoadingTags,
    error,
  } = useSWR<ITag[]>("/api/tag/list", fetcher);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set()); // Added state for selected tags

  if (isLoadingTags) return <div>Loading tags...</div>;
  if (error) return <div>Error loading tags</div>;

  const handleTagClick = (tagSlug: string) => {
    // Added handler
    setSelectedTags((prevSelectedTags) => {
      const newSelectedTags = new Set(prevSelectedTags);
      if (newSelectedTags.has(tagSlug)) {
        newSelectedTags.delete(tagSlug);
      } else {
        newSelectedTags.add(tagSlug);
      }
      return newSelectedTags;
    });
  };

  // Filter out tags with undefined slugs before mapping
  const validTags =
    tags?.filter(
      (tag): tag is ITag => typeof tag.name === "string" && !!tag.count,
    ) || [];

  return (
    <div className="flex flex-wrap gap-2">
      {validTags.map((tag) => (
        <Badge
          key={tag.name} // Now definitely a string
          variant={selectedTags.has(tag.name) ? "default" : "outline"} // Now definitely a string
          onClick={() => handleTagClick(tag.name)} // Now definitely a string
          className="cursor-pointer"
        >
          {tag.name}
        </Badge>
      ))}
    </div>
  );
}
