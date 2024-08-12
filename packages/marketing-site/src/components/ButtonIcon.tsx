import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cloneElement } from "react";
import type { ButtonProps } from "./Button";
import { Button } from "./Button";

interface ButtonIconProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  icon: ReactElement;
}

export const ButtonIcon = ({ icon, ...props }: ButtonIconProps) => {
  return (
    <Button size="icon" {...props}>
      {cloneElement(icon, { className: "h-8 w-8" })}
    </Button>
  );
};
