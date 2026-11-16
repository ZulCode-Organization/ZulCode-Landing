import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZulCode",
    short_name: "ZulCode",
    description: "Aprenda a programar de graça, jogando.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f1115",
    theme_color: "#1892ff",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
