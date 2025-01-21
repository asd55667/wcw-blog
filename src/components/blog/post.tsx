import { format } from "date-fns";
import Markdown from "react-markdown";
import Balance from "react-wrap-balancer";

import { Badge } from "@/registry/new-york/ui/badge";
import type { IPost } from "@/types/blog";
import { cn } from "@/utils";

/**
 *
 * title;
 * date;
 * md content;
 * tags;
 * category belong;
 * related
 * @returns
 */
export function Post({ post }: { post: IPost }) {
  return (
    <div className="px-24 w-4/5">
      {post.tags.length ? (
        <div className={cn("flex gap-2 mb-2", !post.toc && "justify-end")}>
          {post.tags.map((tag) => (
            <Badge key={tag}> {tag} </Badge>
          ))}
        </div>
      ) : null}

      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
        {post.title}
      </h1>

      <Balance className="text-lg text-muted-foreground sm:text-xl">
        {post.description}
      </Balance>

      <Markdown className="pb-6 pt-4">{post.content}</Markdown>

      <div className="flex gap-2 justify-end">
        Updated by
        <span>{post.author}</span>
        on
        <span>{format(post.updated, "MMMM dd, yyyy")}</span>
      </div>
    </div>
  );
}
