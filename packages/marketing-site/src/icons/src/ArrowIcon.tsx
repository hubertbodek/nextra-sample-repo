import React from "react";

const sizes = {
  sm: {
    height: 10,
    width: 10,
  },
  md: {
    height: 12,
    width: 12,
  },
};

export interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: keyof typeof sizes;
}

export const ArrowIcon = ({ size = "md", ...props }: IconProps) => {
  const { height, width } = sizes[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M2.86037 7.20005L5.04088 4.74463H0.799805V3.26683H5.05168L2.86037 0.800049H4.67387L7.1998 4.00573L4.67387 7.20005H2.86037Z" />
    </svg>
  );
};
