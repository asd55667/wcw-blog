"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Switch } from "@/components/ui/switch";
import { META_THEME_COLORS } from "@/config/site";
import { useMetaColor } from "@/hooks/use-meta-color";

export function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const { setMetaColor } = useMetaColor();

  // State to check if the theme is loading
  const [isLoading, setIsLoading] = React.useState(true);

  // Check local storage for the theme on mount
  React.useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      setMetaColor(
        storedTheme === "dark"
          ? META_THEME_COLORS.dark
          : META_THEME_COLORS.light,
      );
    }
    setIsLoading(false); // Set loading to false after checking local storage
  }, [setTheme, setMetaColor]);

  const toggleTheme = React.useCallback(() => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setMetaColor(
      newTheme === "dark" ? META_THEME_COLORS.light : META_THEME_COLORS.dark,
    );
    // Store the new theme in local storage
    localStorage.setItem("theme", newTheme);
  }, [resolvedTheme, setTheme, setMetaColor]);

  // Render nothing or a loading indicator while the theme is being determined
  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex items-center space-x-2 h-6 w-11">
      <Switch
        id="airplane-mode"
        onCheckedChange={toggleTheme}
        checked={resolvedTheme === "dark"}
      >
        <div className="inline-flex center">
          <SunIcon className="h-4 w-4 hidden [html.light_&]:block" />
          <MoonIcon className="h-4 w-4 hidden [html.dark_&]:block" />
          <span className="sr-only">Toggle theme</span>
        </div>
      </Switch>
    </div>
  );
}
