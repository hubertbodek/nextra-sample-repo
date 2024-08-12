import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: false,
  fallback: ["system-ui", "sans-serif"],
});

export const twkEverett = localFont({
  src: [
    {
      path: "../../../public/fonts/TWKEverett-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "../../../public/fonts/TWKEverett-BoldItalic.woff2",
      style: "italic",
      weight: "400",
    },
    {
      path: "../../../public/fonts/TWKEverett-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../../public/fonts/TWKEverett-RegularItalic.woff2",
      style: "italic",
      weight: "400",
    },
  ],
  variable: "--font-twk-everett",
});

export const twkEverettMono = localFont({
  src: [
    {
      path: "../../../public/fonts/TWKEverettMono-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "../../../public/fonts/TWKEverettMono-BoldItalic.woff2",
      style: "italic",
      weight: "400",
    },
    {
      path: "../../../public/fonts/TWKEverettMono-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../../public/fonts/TWKEverettMono-Regular.woff2",
      style: "italic",
      weight: "400",
    },
  ],
  variable: "--font-twk-everett-mono",
});

export const jetbrainsMono = localFont({
  src: [
    {
      path: "../../../public/fonts/JetBrainsMono-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "../../../public/fonts/JetBrainsMono-BoldItalic.woff2",
      style: "italic",
      weight: "400",
    },
    {
      path: "../../../public/fonts/JetBrainsMono-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../../public/fonts/JetBrainsMono-Regular.woff2",
      style: "italic",
      weight: "400",
    },
  ],
  preload: false,
  fallback: ["system-ui", "sans-serif"],
  variable: "--font-jetbrains-mono",
});
