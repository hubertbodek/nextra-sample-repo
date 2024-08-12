import { forwardRef } from "react";
import type { IconProps } from "./types";

export const Terraform = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      ref={ref}
    >
      <g clipPath="url(#clip0_58_250)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M62.898 32.07V62.38L33.082 47.226V16.916L62.898 32.07ZM66.168 62.38L95.998 47.226V16.916L66.168 32.07V62.38ZM0 30.31L29.816 45.464V15.154L0 0V30.31ZM62.9 65.704L33.084 50.55V80.846L62.9 96V65.704Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_58_250">
          <rect width="96" height="96" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
});

Terraform.displayName = "Terraform";
