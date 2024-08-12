import { useConfig } from "@acme/nextra-theme";

export const Heading = () => {
  const { frontMatter } = useConfig();

  return (
    <div className="relative flex flex-col gap-6">
      <div className="relative aspect-[455/240]"></div>
      <div>
        <h1 className="text-h2-mobile text-white md:text-h2-mobile">
          {frontMatter.title}
        </h1>
      </div>
      <div>
        <p className="text-subhead1-mobile text-brand-gray-300 md:text-subhead1">
          {frontMatter.description}
        </p>
      </div>
    </div>
  );
};
