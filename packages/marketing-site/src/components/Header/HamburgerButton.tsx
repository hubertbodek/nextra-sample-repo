import * as React from "react";
import type { HTMLAttributes } from "react";
import type { SVGMotionProps } from "framer-motion";
import { LazyMotion, m } from "framer-motion";
import { ButtonIcon } from "~/components";

const domAnimation = await import("~/lib/framer-motion/domAnimation").then(
  (mod) => mod.default,
);

interface PathProps extends SVGMotionProps<SVGPathElement> {
  isOpen?: boolean;
}

const Path = ({ ...props }: PathProps) => (
  <LazyMotion features={domAnimation}>
    <m.path fill="transparent" stroke="hsl(var(--dark-500))" {...props} />
  </LazyMotion>
);

interface HamburgerButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
}

export const HamburgerButton = ({
  onClick,
  isOpen,
  ...props
}: HamburgerButtonProps) => {
  const pathProps: SVGMotionProps<SVGElement> = {
    initial: "closed",
    animate: isOpen ? "open" : "closed",
    className: "fill-current",
    transition: { duration: 0.2, delay: 0.2 },
    vectorEffect: "non-scaling-stroke",
  };
  return (
    <ButtonIcon
      aria-label="Hamburger"
      onClick={onClick}
      {...props}
      icon={
        <svg height={32} width={32} viewBox="0 0 33 32" fill="none">
          <g>
            <Path
              {...pathProps}
              style={{ originX: "50%", originY: "50%" }}
              d="M8.72783 8H24.7724L25.5339 10L23.8123 10.6667H7.65717L6.86719 8.66667L8.72783 8Z"
              variants={{
                open: {
                  rotate: 45,
                  translateY: 6,
                  translateX: -4,
                },
                closed: {
                  rotate: 0,
                  translateY: 0,
                  translateX: 0,
                },
              }}
            />
            <Path
              {...pathProps}
              d="M8.72783 14.6666H24.7724L25.5339 16.6666L23.8123 17.3333H7.65717L6.86719 15.3333L8.72783 14.6666Z"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
            />
            <Path
              {...pathProps}
              style={{ originX: "50%", originY: "50%" }}
              d="M8.72783 21.3334H24.7724L25.5339 23.3334L23.8123 24H7.65717L6.86719 22L8.72783 21.3334Z"
              variants={{
                open: {
                  rotate: -45,
                  translateY: -4,
                  translateX: -5,
                },
                closed: {
                  rotate: 0,
                  translateY: 0,
                  translateX: 0,
                },
              }}
            />
          </g>
        </svg>
      }
    />
  );
};
