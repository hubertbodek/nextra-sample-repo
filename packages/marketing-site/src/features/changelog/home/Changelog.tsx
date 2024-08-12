import { useMemo } from "react";
import { sortDate, useMdx } from "@acme/nextra-theme";
import type { MdxFile } from "nextra";
import { Timeline } from "../recipes";

const getCategoryFromDate = (post: MdxFile) => {
  const date = new Date(post.frontMatter?.date as string);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
};

export const Changelog = () => {
  const changelogData = useMdx("changelog");

  const posts = useMemo(() => {
    const categorizedPosts = changelogData.map((post) => {
      const category = getCategoryFromDate(post);
      return { ...post, category };
    });
    return categorizedPosts.sort(sortDate);
  }, [changelogData]);

  return (
    <section className="relative overflow-x-hidden">
      <Timeline posts={posts} categorized />
    </section>
  );
};
