import { redirect } from "next/navigation";

interface ServicesSlugRedirectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServicesSlugRedirectPage({ params }: ServicesSlugRedirectPageProps) {
  const { slug } = await params;
  redirect(`/lookbook/${slug}`);
}
