export interface SeoMetadata {
  title: string;
  description: string;
  ogImage?: string;
}

export interface PortfolioItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  featured: boolean;
  date: string;
  seo: SeoMetadata;
}

export interface ShootService {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  pricing: string;
  duration: string;
  deliverables: string[];
  images: string[];
  bookingUrl: string;
  featured: boolean;
  order: number;
  seo: SeoMetadata;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteConfig {
  site: {
    title: string;
    description: string;
    url: string;
    locale: string;
  };
  brand: {
    name: string;
    tagline: string;
    bio: string;
    email: string;
    phone: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  navigation: {
    header: NavItem[];
    footer: NavItem[];
  };
  analytics: {
    gaId?: string;
    vercelAnalytics: boolean;
  };
}
