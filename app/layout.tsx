import type { Metadata } from "next";
import { Montserrat, Noto_Sans_KR } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getSiteConfig } from "@/lib/content";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700"],
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  weight: ["400", "500", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();

  return {
    metadataBase: new URL(config.site.url),
    title: {
      default: config.site.title,
      template: `%s | ${config.site.title}`,
    },
    description: config.site.description,
    openGraph: {
      title: config.site.title,
      description: config.site.description,
      url: config.site.url,
      siteName: config.site.title,
      locale: config.site.locale,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const config = await getSiteConfig();

  return (
    <html lang="ko">
      <body className={`${montserrat.variable} ${notoSansKr.variable} min-h-screen text-ink antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header brandName={config.brand.name} navigation={config.navigation.header} />
          <main className="flex-1">{children}</main>
          <Footer config={config} />
        </div>
      </body>
    </html>
  );
}
