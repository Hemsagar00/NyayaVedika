import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nyayavedika.in";
  return ["", "/search/", "/drafting/", "/practice/", "/privacy/", "/terms/"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
