import type { HTMLAttributes } from "react";
import { forwardRef, useEffect, useId } from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cn } from "~/utils/cn";

const portalId = "21944879";
const region = "na1";

const formVariants = cva("hs-base-form", {
  variants: {
    variant: {
      contact: "",
      "newsletter-cta": "hs-newsletter-form",
      "newsletter-footer": "hs-newsletter-form hs-newsletter-form-footer",
    },
  },
});

type Variant = NonNullable<VariantProps<typeof formVariants>["variant"]>;

const formsIds = {
  contact: "b9c260d5-8626-4940-a803-a06d6b3c69f3",
  "newsletter-cta": "2f9d352e-bcb9-4b97-8348-50e65e36d309",
  "newsletter-footer": "2f9d352e-bcb9-4b97-8348-50e65e36d309",
} satisfies Record<Variant, string>;

interface HubSpotFormProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof formVariants>, "variant"> {
  variant: Variant;
}

export const HubSpotForm = forwardRef<HTMLDivElement, HubSpotFormProps>(
  ({ className, variant, ...props }, ref) => {
    const id = useId().replace(/:/g, "");

    useEffect(() => {
      const script = document.createElement("script");
      script.setAttribute("rel", "preconnect");
      script.src = "https://js.hsforms.net/forms/v2.js";
      document.body.appendChild(script);

      script.addEventListener("load", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (window.hbspt) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          window.hbspt.forms.create({
            formId: formsIds[variant],
            portalId,
            region,
            target: `#${id}`,
          });
        }
      });
    }, [id, variant]);

    return (
      <div
        className={cn(formVariants({ className, variant }))}
        id={id}
        ref={ref}
        {...props}
      />
    );
  },
);
HubSpotForm.displayName = "HubSpotForm";
