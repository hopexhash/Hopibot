import type { MetadataRoute } from "next";

/** Name and icons when someone adds the website to their phone's home screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HOPI",
    short_name: "HOPI",
    description: "Webdesign bureau voor Nederland en België: eerst zien, dan betalen.",
    start_url: "/",
    display: "browser",
    background_color: "#0c0c0d",
    theme_color: "#0c0c0d",
    icons: [
      { src: "/site/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/site/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
