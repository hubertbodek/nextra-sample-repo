/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { MdxFile } from "nextra";
import Link from "~/lib/next";
import { Card } from "../home/recipes/Card";

type Post = MdxFile & { category: string };

interface TimelineProps {
  categorized?: boolean;
  posts: Post[];
}

export const Timeline = ({ categorized, posts }: TimelineProps) => {
  if (categorized) {
    const categorizedPosts = posts.reduce(
      (acc, post) => {
        if (!acc[post.category]) {
          acc[post.category] = [];
        }
        acc?.[post.category]?.push(post);
        return acc;
      },
      {} as Record<string, Post[]>,
    );

    return Object.entries(categorizedPosts).map(([category, posts]) => {
      return (
        <div key={category} className="mt-16">
          <h2 className="text-h4-mobile text-white md:text-h4">{category}</h2>
          <div className="my-8 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2">
            {posts.map(({ frontMatter, route }, i) => {
              return (
                <div key={route}>
                  <Link href={route} key={i}>
                    <Card
                      key={frontMatter?.title ?? i}
                      title={frontMatter?.title ?? ""}
                      description={frontMatter?.description ?? ""}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  }

  return (
    <div className="my-8 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2">
      {posts.map(({ frontMatter, route }, i) => {
        return (
          <div key={route}>
            <Link href={route} key={i}>
              <Card
                key={frontMatter?.title ?? i}
                title={frontMatter?.title ?? ""}
                description={frontMatter?.description ?? ""}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
