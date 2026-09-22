import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "https://labanaat.com";

const templateSlugs = ["analytics-dashboard", "project-board", "team-workspace"];

const staticGuidePages = ["introduction", "installation", "theming", "accessibility", "localization"];

/** Reads the real component doc directories at build time, so a new component page is automatically included here without this file needing a manual update. */
function getComponentSlugs(): string[] {
  const dir = path.join(process.cwd(), "app", "docs", "components");
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/docs/components`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/templates`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  const guideRoutes: MetadataRoute.Sitemap = staticGuidePages.map((slug) => ({
    url: `${BASE_URL}/docs/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const componentRoutes: MetadataRoute.Sitemap = getComponentSlugs().map((slug) => ({
    url: `${BASE_URL}/docs/components/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const templateRoutes: MetadataRoute.Sitemap = templateSlugs.map((slug) => ({
    url: `${BASE_URL}/templates/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...guideRoutes, ...componentRoutes, ...templateRoutes];
}
