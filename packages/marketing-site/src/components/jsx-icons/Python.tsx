import { forwardRef } from "react";
import type { IconProps } from "./types";

export const Python = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <svg
      ref={ref}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="pyth">
        <path
          id="Vector"
          d="M11.8576 -0.000166037C10.9305 0.000944335 10.0051 0.0792145 9.09105 0.233834C6.64196 0.66147 6.19687 1.55765 6.19687 3.20983V5.39165H11.9858V6.11929H4.02433C2.34214 6.11929 0.868871 7.11965 0.407962 9.0222C-0.123311 11.2029 -0.147311 12.5644 0.407962 14.8411C0.81978 16.5364 1.80214 17.744 3.48433 17.744H5.47524V15.128C5.47524 13.2386 7.12796 11.5717 9.0916 11.5717H14.8734C16.4831 11.5717 17.7681 10.2604 17.7681 8.66165V3.21038C17.7681 1.65856 16.4443 0.492925 14.8734 0.234379C13.8764 0.0728813 12.8676 -0.00556992 11.8576 -0.000166037ZM8.72669 1.75511C9.32505 1.75511 9.81324 2.24602 9.81324 2.84929C9.81648 2.99399 9.79078 3.13788 9.73765 3.27251C9.68451 3.40714 9.60502 3.5298 9.50383 3.63328C9.40264 3.73676 9.28179 3.81899 9.14838 3.87512C9.01498 3.93126 8.8717 3.96018 8.72696 3.96018C8.58223 3.96018 8.43895 3.93126 8.30554 3.87512C8.17214 3.81899 8.05129 3.73676 7.9501 3.63328C7.84891 3.5298 7.76941 3.40714 7.71628 3.27251C7.66315 3.13788 7.63745 2.99399 7.64069 2.84929C7.63982 2.56006 7.75385 2.28232 7.9577 2.07713C8.16156 1.87195 8.43855 1.75612 8.72778 1.75511H8.72669Z"
          fill="currentColor"
        />
        <path
          id="Vector_2"
          d="M18.4883 6.12011V8.66193C18.4883 10.6337 16.7985 12.2925 14.872 12.2925H9.09013C7.50613 12.2925 6.1954 13.6332 6.1954 15.2019V20.6543C6.1954 22.2061 7.55959 23.1187 9.09013 23.5638C10.9223 24.0967 12.6792 24.1932 14.872 23.5638C16.3294 23.1465 17.7667 22.3065 17.7667 20.6543V18.4725H11.9843V17.7448H20.6609C22.343 17.7448 22.9703 16.5841 23.5556 14.8419C24.16 13.0485 24.1338 11.3238 23.5556 9.02248C23.1394 7.36593 22.3452 6.11957 20.6609 6.11957H18.4883V6.12011ZM15.2363 19.9267C15.8363 19.9267 16.3229 20.4132 16.3229 21.0148C16.3237 21.304 16.2098 21.5816 16.006 21.7868C15.8023 21.992 15.5255 22.1079 15.2363 22.109C14.6385 22.109 14.1503 21.6181 14.1503 21.0143C14.1503 20.4132 14.6385 19.9267 15.2363 19.9267Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
});

Python.displayName = "PythonIcon";
