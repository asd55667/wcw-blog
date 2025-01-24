export interface PageProps {
  params: {
    slug: string[];
  };
  link: (href: string, title: string, className?: string) => React.JSX.Element;
}

export interface Item {
  title: string;
  url: string;
  items: Item[];
}

export interface IPost {
  id: string;
  title: string;
  description: string;
  /**
   * date of the post been published
   */
  created: number;
  /**
   * date of the post been updated
   */
  updated: number;
  /**
   * markdown string of blog
   */
  content: string;
  author?: string;
  tags: string[];
  category: string[];
  /**
   * related id of post
   */
  related: string[];
  /**
   * TableOfContents
   */
  toc?: { items: Item[] };
}

export interface IPostPreview {
  id: string;
  title: string;
  created: number;
  content: string;
  author: string;
  tags: string[];
}

export interface IArchive {
  year: number;
  months: IArchiveMonth[];
  total: number;
}

export interface IArchiveMonth {
  month: number;
  total: number;
  posts: IPostPreview[];
}

export interface ICategory {
  key: string;
  title: string;
  total: number;
  children: ICategory[];
}
