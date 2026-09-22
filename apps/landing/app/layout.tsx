import "@labanaat/ui/styles.css";
import "./globals.css";
import type { ReactNode } from "react";
import { Instrument_Sans } from "next/font/google";
import { ThemeProvider } from "./theme-provider";
import { SiteChrome } from "./site-chrome";
import { Analytics } from "@vercel/analytics/react";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://labanaat.com"),
  title: {
    default: "Labanaat UI — a production-grade React component platform",
    template: "%s | Labanaat UI",
  },
  description:
    "Accessible, type-safe, composable React components built on design tokens, with full theming, localization, and slot-based customization.",
  keywords: [
    "React components",
    "component library",
    "design system",
    "UI kit",
    "TypeScript",
    "accessible components",
    "Radix UI",
    "Tailwind CSS",
    "design tokens",
    "React UI library",
  ],
  authors: [{ name: "Mohammed Saif Ibrahim" }],
  openGraph: {
    type: "website",
    siteName: "Labanaat UI",
    title: "Labanaat UI — a production-grade React component platform",
    description:
      "Accessible, type-safe, composable React components built on design tokens, with full theming, localization, and slot-based customization.",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Labanaat UI — a production-grade React component platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Labanaat UI — a production-grade React component platform",
    description:
      "Accessible, type-safe, composable React components built on design tokens, with full theming, localization, and slot-based customization.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body className="ui-flex ui-min-h-screen ui-flex-col">
        <ThemeProvider>
          <SiteChrome>
            {children}
            <Analytics />
          </SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
