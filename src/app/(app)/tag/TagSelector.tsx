"use client";

import { useState, useEffect } from "react"; // Added useEffect
import { Badge } from "@/registry/new-york/ui/badge";
import { useRouter, useParams } from "next/navigation"; // Added useParams
import allTagsFromJson from "../../../../content/tags.json" with {
  type: "json",
}; // Renamed import

export function TagSelector() {
  const router = useRouter();
  const params = useParams();

  // Helper to parse slugs from params and normalize them
  const getSlugsFromParams = () => {
    const slugParam = params.slug; // slug can be string or string[] or undefined
    let slugs: string[] = [];
    if (Array.isArray(slugParam)) {
      slugs = slugParam;
    } else if (typeof slugParam === "string") {
      slugs = [slugParam];
    }
    return slugs.map((s) => s.toLowerCase()); // Normalize to lowercase
  };

  // Initialize selectedTags from URL slugs
  const [selectedTags, setSelectedTags] = useState<Set<string>>(() => {
    return new Set(getSlugsFromParams());
  });

  // Effect to synchronize selectedTags state if URL changes from outside
  useEffect(() => {
    setSelectedTags(new Set(getSlugsFromParams()));
  }, [params.slug]); // Dependencies: re-run if params.slug changes

  const handleTagClick = (tagSlugToToggle: string) => {
    const newSelectedTags = new Set(selectedTags);
    if (newSelectedTags.has(tagSlugToToggle)) {
      newSelectedTags.delete(tagSlugToToggle);
    } else {
      newSelectedTags.add(tagSlugToToggle);
    }

    setSelectedTags(newSelectedTags); // Update state

    // Navigate based on the new state
    if (newSelectedTags.size === 0) {
      router.push("/tag");
    } else {
      // Create a path with all selected tags, sorted for URL consistency
      const newPath = `/tag/${Array.from(newSelectedTags).sort().join("-")}`;
      router.push(newPath);
    }
  };

  const availableTags: string[] = allTagsFromJson; // Assuming tags.json is an array of display names/strings

  return (
    <div className="flex flex-wrap gap-2">
      {availableTags.map((tagDisplayName) => {
        // Generate a consistent slug (lowercase, hyphenated) for internal use and URL
        const tagSlug = tagDisplayName.replace(/\s+/g, "-").toLowerCase();

        return (
          <Badge
            key={tagSlug}
            variant={selectedTags.has(tagSlug) ? "default" : "outline"}
            onClick={() => handleTagClick(tagSlug)}
            className="cursor-pointer"
          >
            {tagDisplayName} {/* Display the original name from JSON */}
          </Badge>
        );
      })}
    </div>
  );
}
