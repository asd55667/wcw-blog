"use client";

import { LoaderIcon } from "lucide-react";
import useSWR from "swr";

import {
  AboutMe,
  Archives,
  AsideBlock,
  Category,
  SkeletonGroup,
  Tags,
} from "@/components/blog/page-aside";
import { PostPreview } from "@/components/blog/post-preview";
import type { ICategory, IPost, ITag } from "@/types/blog";
import { fetcher } from "@/utils/fetcher";

export default function IndexPage() {
  const { data: categories, isLoading: isLoadingCategories } =
    useSWR<ICategory>("/api/category/list", fetcher);
  const { data: tags, isLoading: isLoadingTags } = useSWR<ITag[]>(
    "/api/tag/list",
    fetcher,
  );

  return (
    <>
      <div className="border-grid border-b">
        <div className="container-wrapper">
          <div className="container py-4">
            <div className="[&>a:first-child]:text-primary flex flex-wrap lg:flex-nowrap gap-12 pt-12 px-12">
              <Preview />

              <aside className="w-full lg:w-1/4 flex flex-col gap-8">
                <AsideBlock title="About me">
                  <AboutMe />
                </AsideBlock>

                <AsideBlock title="Categories">
                  {isLoadingCategories ? (
                    <SkeletonGroup length={5} />
                  ) : !categories?.children.length ? (
                    <div>empty</div>
                  ) : (
                    <Category categories={categories.children} />
                  )}
                </AsideBlock>

                <AsideBlock title="Tags">
                  {isLoadingTags ? (
                    <SkeletonGroup length={5} />
                  ) : !tags?.length ? (
                    <div>No tags</div>
                  ) : (
                    <Tags tags={tags} />
                  )}
                </AsideBlock>

                <AsideBlock title="Archives">
                  <Archives />
                </AsideBlock>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Preview() {
  const { data: posts, isLoading } = useSWR<IPost[]>(
    "/api/content/recent-posts",
    fetcher,
  );

  let content: React.ReactNode;
  if (isLoading) {
    content = (
      <div className="flex items-center justify-center h-full w-full">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  } else if (!posts?.length) {
    content = <div>No Post Here!</div>;
  } else {
    content = posts?.map((post) => <PostPreview key={post.id} post={post} />);
  }

  return (
    <div className="flex flex-col flex-grow gap-6 overflow-auto w-full lg:w-3/4">
      {content}
    </div>
  );
}
