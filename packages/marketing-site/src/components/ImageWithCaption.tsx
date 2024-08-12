import type { ImageProps } from "next/image";
import Image from "next/image";

interface ImageWithCaptionProps extends ImageProps {
  caption: string;
}

export const ImageWithCaption = ({
  src,
  alt,
  width,
  height,
  caption,
}: ImageWithCaptionProps) => {
  return (
    <figure className="relative block h-max">
      <div
        className="relative w-full"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image src={src} alt={alt} fill />
      </div>
      <figcaption className="md:text-body-1 mt-4 text-center text-body1-mobile text-brand-gray-500">
        {caption}
      </figcaption>
    </figure>
  );
};
