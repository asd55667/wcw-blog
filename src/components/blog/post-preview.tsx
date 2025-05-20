import { format } from "date-fns";
import Link from "next/link";
import Markdown from "react-markdown";

import { Separator } from "@/registry/default/ui/separator";
import type { IPost } from "@/types/blog";

/**
 *
 * title;
 * date;
 * md content preview;
 * jump to post;
 * @returns
 */
export function PostPreview({ post }: { post: IPost }) {
  return (
    <div className="mb-8 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
        {post.title}
      </h2>

      <p className="text-lg text-muted-foreground mt-2">{post.description}</p>

      <Markdown className="prose dark:prose-invert max-w-none pb-6 pt-4">
        {post.content}
      </Markdown>

      <Link
        href={{ pathname: `/posts/${post.id}` }}
        target="_self"
        rel="noreferrer"
        className="inline-block px-4 py-2 mt-4 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90"
      >
        Read Full Content »
      </Link>

      <Separator className="my-6" />

      <div className="flex flex-wrap gap-2 justify-end items-center text-sm text-muted-foreground italic">
        <span>Last updated by</span>
        <span className="font-medium">{post.author}</span>
        <span>on</span>
        <span className="font-medium">
          {format(post.created, "MMMM dd, yyyy")}
        </span>
      </div>
    </div>
  );
}
