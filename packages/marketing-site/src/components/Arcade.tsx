import type { HTMLAttributes } from "react";

interface ArcadeProps extends HTMLAttributes<HTMLDivElement> {
  url: string;
  title: string;
}

export const Arcade = ({ url, title }: ArcadeProps) => (
  <div
    className="relative my-8 w-full"
    style={{ paddingBottom: "calc(50.33434650455927% + 41px)" }}
  >
    <iframe
      src={url}
      loading="lazy"
      allowFullScreen
      className="absolute left-0 top-0 h-full w-full bg-white"
      title={title}
    />
  </div>
);
