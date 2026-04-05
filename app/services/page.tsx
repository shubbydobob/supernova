import type { Metadata } from "next";

import { getSiteConfig } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();

  return {
    title: "Lookbook",
    description: "Explore available photography services with key details and external Naver reservation compatibility.",
    openGraph: {
      title: `Lookbook | ${config.site.title}`,
      description: "Explore available photography services with key details and external Naver reservation compatibility.",
      url: `${config.site.url}/services`,
    },
  };
}

export default async function ServicesPage() {
  return null;
}
