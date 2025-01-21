// import staticRoutes from "@/__registry__/static-routes.json";
import type { MainNavItem, SidebarNavItem } from "types/nav";
import allNav from "../../content/doc-nav.json";
export interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
  name: "posts";
}

const name: DocsConfig["name"] = "posts";

// // TODO: this behavior will case route direct from /docs/theming to /docs/docs/theming
// const sidebarNavItems: SidebarNavItem[] = staticRoutes.docs
//   .filter((doc) => doc.slug[0] !== "index")
//   .map((doc) => ({
//     title: doc.slug[0]!,
//     href: `${name}/${doc.slug[0]}`,
//     items: [],
//   }));

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Posts",
      href: `/${name}`,
    },
    {
      title: "Category",
      href: "/category",
    },
    {
      title: "Archive",
      href: "/archive",
    },
    ...allNav,
  ],
  sidebarNav: [],
  name,
};
