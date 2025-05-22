"use client";

import { useState, useEffect, useMemo } from "react"; // Added useMemo
import { Badge } from "@/registry/new-york/ui/badge";
import { useRouter, useParams } from "next/navigation"; // Added useParams
import allTagsFromJson from "../../../../content/all-tags.json" with {
  type: "json",
}; // Renamed import

import tagGraph from "../../../../content/tag-graph.json" with { type: "json" };

// Helper function to convert display names to canonical slugs
const toCanonicalSlug = (displayName: string) =>
  displayName.replace(/\s+/g, "-").toLowerCase();

export function TagSelector() {
  const router = useRouter();
  const params = useParams();

  // Create a map from canonical slug back to display name
  const canonicalSlugToDisplayNameMap = useMemo(() => {
    return new Map(
      allTagsFromJson.map((name) => [toCanonicalSlug(name), name]),
    );
  }, []); // allTagsFromJson is an import, so dependency array is empty or depends on its stability if it could change

  // Helper to parse slugs from params and normalize them to canonical slugs
  const getSlugsFromParams = () => {
    const slugParam = params.slug; // slug can be string or string[] or undefined
    let canonicalSlugs: string[] = [];

    if (Array.isArray(slugParam) && slugParam.length > 0) {
      const mainSlugString = slugParam[0] ?? "";
      if (!mainSlugString.includes("-")) {
        // Handles case where slugParam is ["singletag"] or ["single word tag"]
        if (allTagsFromJson.includes(mainSlugString)) {
          canonicalSlugs.push(toCanonicalSlug(mainSlugString));
        }
      } else {
        const slugArray = mainSlugString.split("-");
        let q: string[] = [];
        slugArray.forEach((s_part) => {
          if (allTagsFromJson.includes(s_part)) {
            canonicalSlugs.push(toCanonicalSlug(s_part));
            q = [];
          } else {
            q.push(s_part);
            const combinedString = q.join(" ");
            if (allTagsFromJson.includes(combinedString)) {
              canonicalSlugs.push(toCanonicalSlug(combinedString));
              q = [];
            }
          }
        });
      }
    }
    return canonicalSlugs;
  };

  // Initialize selectedTags from URL slugs (now stores canonical slugs)
  const [selectedTags, setSelectedTags] = useState<Set<string>>(() => {
    return new Set(getSlugsFromParams());
  });

  // console.log("selectedTags", selectedTags);

  // Effect to synchronize selectedTags state if URL changes from outside
  useEffect(() => {
    setSelectedTags(new Set(getSlugsFromParams()));
  }, [params.slug]); // Dependencies: re-run if params.slug changes

  const handleTagClick = (tagSlugToToggle: string) => {
    // tagSlugToToggle is already canonical
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
      // console.log("newSelectedTags", newSelectedTags);

      // Create a path with all selected tags (canonical slugs), sorted for URL consistency
      const newPath = `/tag/${Array.from(newSelectedTags).sort().join("-")}`;
      console.log("newPath", newPath);
      router.push(newPath);
    }
  };

  const currentSelectedSlugs = Array.from(selectedTags).sort();

  const availableTagsDisplayNames: string[] = !selectedTags.size
    ? allTagsFromJson // These are display names
    : [
        ...new Set([
          // Use Set to remove duplicates
          // Map current selected slugs back to display names
          ...currentSelectedSlugs.map(
            (slug) => canonicalSlugToDisplayNameMap.get(slug) || slug,
          ),
          // Tags from graph are assumed to be display names
          ...((tagGraph[currentSelectedSlugs.join("-") as keyof typeof tagGraph]
            ?.tags || []) as string[]),
        ]),
      ].sort(); // Optionally sort the final list of display names

  // console.log("availableTagsDisplayNames", availableTagsDisplayNames, "currentSelectedSlugs", currentSelectedSlugs);

  return (
    <div className="flex flex-wrap gap-2">
      {availableTagsDisplayNames.map((tagDisplayName) => {
        // Generate canonical slug for comparison and click handling
        const tagSlug = toCanonicalSlug(tagDisplayName);

        return (
          <Badge
            key={tagDisplayName} // Key can remain display name as it's unique for UI list
            variant={selectedTags.has(tagSlug) ? "default" : "outline"} // Compare with canonical slug
            onClick={() => handleTagClick(tagSlug)} // Pass canonical slug
            className="cursor-pointer"
          >
            {tagDisplayName} {/* Display the original name from JSON */}
          </Badge>
        );
      })}
    </div>
  );
}
