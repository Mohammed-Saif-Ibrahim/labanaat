import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

const withMDX = createMDX({
  options: {
    // remark-gfm enables GitHub-flavored tables (used by every component's
    // "Props" reference), plus strikethrough/autolinks/task lists for free.
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          // Matches the site's light/dark theme toggle: rehype-pretty-code
          // emits both palettes as CSS custom properties and switches them
          // based on the closest [data-theme] ancestor — the same
          // attribute the library's own applyTheme() sets on <html>.
          theme: { light: "github-light", dark: "github-dark" },
          keepBackground: false,
        },
      ],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@labanaat/ui"],
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default withMDX(nextConfig);
