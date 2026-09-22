import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ReactNode } from "react";
import { LiveDemo } from "./app/docs/live-demo";
import { PropsTable } from "./app/docs/props-table";
import { MdxPre } from "./app/docs/mdx-pre";

/**
 * Maps every element Markdown/MDX can produce onto the site's real design
 * tokens and type scale, so a docs page reads like part of the same
 * product as the marketing pages — not a separately-styled prose theme.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="ui-mb-4 ui-text-3xl ui-font-semibold ui-tracking-tight ui-text-[var(--ui-fg)]"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="ui-mb-4 ui-mt-14 ui-text-xl ui-font-semibold ui-tracking-tight ui-text-[var(--ui-fg)]"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="ui-mb-3 ui-mt-10 ui-text-[var(--ui-text-lg)] ui-font-semibold ui-text-[var(--ui-fg)]"
        {...props}
      />
    ),
    p: (props) => (
      <p className="ui-mb-5 ui-leading-relaxed ui-text-[var(--ui-fg)]" {...props} />
    ),
    a: ({ href, ...props }: { href?: string } & Record<string, unknown>) => {
      const className =
        "ui-text-[var(--ui-primary)] ui-underline-offset-4 hover:ui-underline";
      if (href?.startsWith("/")) {
        return <Link href={href} className={className} {...(props as object)} />;
      }
      return <a href={href} className={className} {...(props as object)} />;
    },
    ul: (props) => (
      <ul className="ui-mb-5 ui-list-disc ui-space-y-2 ui-pl-6 ui-text-[var(--ui-fg)]" {...props} />
    ),
    ol: (props) => (
      <ol className="ui-mb-5 ui-list-decimal ui-space-y-2 ui-pl-6 ui-text-[var(--ui-fg)]" {...props} />
    ),
    li: (props) => <li className="ui-leading-relaxed" {...props} />,
    strong: (props) => <strong className="ui-font-semibold ui-text-[var(--ui-fg)]" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="ui-mb-4 ui-border-l-2 ui-border-[var(--ui-primary)] ui-pl-4 ui-text-[var(--ui-fg-muted)]"
        {...props}
      />
    ),
    hr: (props) => <hr className="ui-my-8 ui-border-[var(--ui-border)]" {...props} />,

    // `code` is used for BOTH inline `code` spans and the <code> inside a
    // fenced ```block```. rehype-pretty-code tags block code with
    // data-language/data-theme; that's the signal used to tell them apart
    // so each gets the right treatment instead of double-boxing block code.
    code: (props: { "data-language"?: string } & Record<string, unknown>) => {
      const isBlockCode = "data-language" in props;
      if (isBlockCode) return <code {...props} />;
      return (
        <code
          className="ui-rounded-[var(--ui-radius-sm)] ui-bg-[var(--ui-bg-muted)] ui-px-1.5 ui-py-0.5 ui-text-[13px] ui-text-[var(--ui-fg)]"
          {...props}
        />
      );
    },
    pre: (props) => <MdxPre {...props} />,

    table: (props) => (
      <div className="ui-mb-7 ui-overflow-x-auto ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)]">
        <table className="ui-w-full ui-border-collapse ui-text-[var(--ui-text-sm)]" {...props} />
      </div>
    ),
    thead: (props) => <thead className="ui-bg-[var(--ui-bg-subtle)]" {...props} />,
    th: (props) => (
      <th
        className="ui-border-b ui-border-[var(--ui-border)] ui-px-3 ui-py-2 ui-text-left ui-font-medium ui-text-[var(--ui-fg-muted)]"
        {...props}
      />
    ),
    td: (props) => (
      <td className="ui-border-b ui-border-[var(--ui-border)] ui-px-3 ui-py-2 ui-text-[var(--ui-fg)]" {...props} />
    ),

    ...components,
    LiveDemo,
    PropsTable,
  };
}
