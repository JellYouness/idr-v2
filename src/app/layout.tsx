import type { Metadata } from "next";
import "./globals.css";
import { siteMeta } from "@/lib/portfolio-content";
import { MediaLoadingOverlay } from "@/components/system/MediaLoadingOverlay";
import { SectionSideNav } from "@/components/layout/SectionSideNav";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: `${siteMeta.name} — ${siteMeta.roleLine}`,
  description: siteMeta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh font-sans antialiased">
        <MediaLoadingOverlay timeoutMs={1200} mobileTimeoutMs={500} />
        <SectionSideNav />
        {children}
        <SiteFooter site={siteMeta} />
      </body>
    </html>
  );
}
