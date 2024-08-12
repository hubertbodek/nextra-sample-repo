import { forwardRef } from "react";
import type { IconProps } from "./types";

export const File = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="currentColor"
      ref={ref}
      {...props}
    >
      <path
        d="M13 17.002H1.0005C0.998216 10.6297 1.00583 7.37425 1 1.00195L8.40621 1.002C9.53666 2.22122 13 6.40458 13 6.40458C13 6.40458 13 12.4305 13 17.002Z"
        stroke="#6B6A63"
        strokeWidth="0.843215"
        strokeLinecap="round"
      />
      <path
        d="M8.50004 1.10547C8.50004 2.94095 8.49757 4.77646 8.50033 6.61195H12.9084"
        stroke="#6B6A63"
        strokeWidth="0.843215"
      />
    </svg>
  );
});

File.displayName = "File";
