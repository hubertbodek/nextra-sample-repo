import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  classGroups: {
    "font-size": [
      "text-body1",
      "text-body1-mobile",
      "text-body2",
      "text-body2-mobile",
      "text-body3",
      "text-button-large",
      "text-button-small",
      "text-h1",
      "text-h1-mobile",
      "text-h2",
      "text-h2-mobile",
      "text-h3",
      "text-h3-mobile",
      "text-h4",
      "text-h4-mobile",
      "text-h5",
      "text-h5-mobile",
      "text-subhead1",
      "text-subhead1-mobile",
      "text-tag",
      "text-tag2",
      // new brand
      "text-new-brand-body1",
      "text-new-brand-body2",
      "text-new-brand-body3",
      "text-new-brand-body4",
      "text-new-brand-body5",
      "text-new-brand-body6",
      "text-new-brand-heading",
      "text-new-brand-tag",
    ],
  },
});

export { twMerge };
