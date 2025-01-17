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
    <div className="md:w-[720px] w-full">
      <h2 className="scroll-m-20 text-4xl font-bold tracking-tight">
        {post.title}
      </h2>

      <p className="text-lg text-muted-foreground mt-1">{post.description}</p>

      <Markdown className="pb-6 pt-4">{post.content}</Markdown>

      <Link
        href={{ pathname: `/posts/${post.id}` }}
        target="_self"
        rel="noreferrer"
        className="hover:text-accent-foreground"
      >
        <span className="text-sm italic">Read Full Content »</span>
      </Link>

      <Separator className="my-2" />

      <div className="flex gap-2 justify-end">
        Posted by
        <span>{post.author}</span>
        on
        <span>{format(post.created, "MMMM dd, yyyy")}</span>
      </div>
    </div>
  );
}
