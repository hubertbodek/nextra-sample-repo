import type { MotionProps } from "framer-motion";
import { LazyMotion, m } from "framer-motion";

const domAnimation = await import("~/lib/framer-motion/domAnimation").then(
  (mod) => mod.default,
);

interface AppearingTextProps extends MotionProps {
  text: string;
  tag: keyof typeof m;
  className?: string;
  previousTextLength?: number;
}

const letterAnimProps = {
  variants: {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  },
  transition: {
    duration: 0.1,
  },
} satisfies MotionProps;

const sentenceAnimProps = {
  initial: "hidden",
  animate: "visible",
  transition: {
    staggerChildren: 0.02,
    delay: 0.2,
  },
} satisfies MotionProps;

export const AppearingText = ({
  text,
  tag,
  className,
  previousTextLength,
  ...rest
}: AppearingTextProps) => {
  const chars = text.split("");
  const Comp = m[tag];
  const delay =
    sentenceAnimProps.transition.staggerChildren * (previousTextLength ?? 0);
  return (
    <LazyMotion features={domAnimation}>
      <Comp
        className={className}
        {...sentenceAnimProps}
        transition={{
          ...sentenceAnimProps.transition,
          delay: delay + sentenceAnimProps.transition.delay,
        }}
        {...rest}
      >
        {chars.map((c, index) => (
          <m.span key={index} {...letterAnimProps}>
            {c}
          </m.span>
        ))}
      </Comp>
    </LazyMotion>
  );
};
