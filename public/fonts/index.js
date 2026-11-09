import localFont from "next/font/local";
import { Sofia_Sans } from "next/font/google";

// Google font
export const sofia = Sofia_Sans({
  subsets: ["latin"],
  display: "swap",
});

// Switzer
export const switzer = localFont({
  src: [
    {
      path: "./Switzer-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./Switzer-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./Switzer-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Switzer-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Switzer-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Switzer-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Switzer-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Switzer-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./Switzer-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["Sofia Sans", "sans-serif"],
});

// Nimbus Sans
export const nimbusSans = localFont({
  src: [
    {
      path: "./nimbus-sans-l_regular-condensed.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./nimbus-sans-l_bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["Sofia Sans", "sans-serif"],
});
