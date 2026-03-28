import { z } from "zod";

const slugPattern = /^[a-z0-9-]+$/;
const imagePathPattern = /^\/images\/.+/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export const seoMetadataSchema = z.object({
  title: z.string().min(10).max(60),
  description: z.string().min(50).max(160),
  ogImage: z.string().regex(imagePathPattern).optional(),
});

export const portfolioItemSchema = z.object({
  slug: z.string().regex(slugPattern),
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(5000),
  category: z.string().min(1).max(50),
  thumbnail: z.string().regex(imagePathPattern),
  images: z.array(z.string().regex(imagePathPattern)).min(1),
  featured: z.boolean(),
  date: z
    .string()
    .regex(isoDatePattern)
    .refine((value) => !Number.isNaN(Date.parse(value)), "Must be a valid ISO date"),
  seo: seoMetadataSchema,
});

export const shootServiceSchema = z.object({
  slug: z.string().regex(slugPattern),
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(5000),
  shortDescription: z.string().min(10).max(200),
  pricing: z.string().min(1).max(100),
  duration: z.string().min(1).max(50),
  deliverables: z.array(z.string().min(1).max(160)).min(1),
  images: z.array(z.string().regex(imagePathPattern)).min(1),
  bookingUrl: z.string().url().startsWith("https://"),
  featured: z.boolean(),
  order: z.number().int().positive(),
  seo: seoMetadataSchema,
});

export const navItemSchema = z.object({
  label: z.string().min(1).max(40),
  href: z.string().min(1),
  external: z.boolean().optional(),
});

export const siteConfigSchema = z.object({
  site: z.object({
    title: z.string().min(1).max(80),
    description: z.string().min(50).max(160),
    url: z.string().url().startsWith("https://"),
    locale: z.string().min(2).max(10),
  }),
  brand: z.object({
    name: z.string().min(1).max(80),
    tagline: z.string().min(10).max(120),
    bio: z.string().min(10).max(1000),
    email: z.string().email(),
    phone: z.string().min(7).max(30),
  }),
  social: z.object({
    instagram: z.string().url().optional(),
    facebook: z.string().url().optional(),
    youtube: z.string().url().optional(),
  }),
  navigation: z.object({
    header: z.array(navItemSchema).min(1),
    footer: z.array(navItemSchema).min(1),
  }),
  analytics: z.object({
    gaId: z.string().optional(),
    vercelAnalytics: z.boolean(),
  }),
});

function formatZodError(error: z.ZodError, context: string) {
  const details = error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "root";
      return `${path}: ${issue.message}`;
    })
    .join("; ");

  return new Error(`Invalid ${context}. ${details}`);
}

export function validatePortfolioItem(input: unknown, context = "portfolio item") {
  const parsed = portfolioItemSchema.safeParse(input);
  if (!parsed.success) {
    throw formatZodError(parsed.error, context);
  }

  return parsed.data;
}

export function validateShootService(input: unknown, context = "service") {
  const parsed = shootServiceSchema.safeParse(input);
  if (!parsed.success) {
    throw formatZodError(parsed.error, context);
  }

  return parsed.data;
}

export function validateSiteConfig(input: unknown, context = "site config") {
  const parsed = siteConfigSchema.safeParse(input);
  if (!parsed.success) {
    throw formatZodError(parsed.error, context);
  }

  return parsed.data;
}
