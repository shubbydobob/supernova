import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

import type { PortfolioItem, ShootService, SiteConfig } from "@/types/content";
import {
  validatePortfolioItem,
  validateShootService,
  validateSiteConfig,
} from "@/lib/validation";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");

async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await readFile(filePath, "utf8");

  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${filePath}\n${String(error)}`);
  }
}

async function assertPublicAssetExists(assetPath: string, context: string) {
  const normalizedPath = assetPath.replace(/^\/+/, "");
  const fullPath = path.join(PUBLIC_DIR, normalizedPath);

  try {
    const fileStats = await stat(fullPath);
    if (!fileStats.isFile()) {
      throw new Error();
    }
  } catch {
    throw new Error(`Missing image asset for ${context}: ${assetPath}`);
  }
}

async function assertUniqueSlugs<T extends { slug: string }>(items: T[], label: string) {
  const seen = new Set<string>();

  for (const item of items) {
    if (seen.has(item.slug)) {
      throw new Error(`Duplicate ${label} slug detected: ${item.slug}`);
    }

    seen.add(item.slug);
  }
}

async function validatePortfolioAssets(item: PortfolioItem, source: string) {
  await assertPublicAssetExists(item.thumbnail, `${source} thumbnail`);
  await Promise.all(
    item.images.map((imagePath, index) =>
      assertPublicAssetExists(imagePath, `${source} image ${index + 1}`),
    ),
  );
  if (item.seo.ogImage) {
    await assertPublicAssetExists(item.seo.ogImage, `${source} seo.ogImage`);
  }
}

async function validateServiceAssets(service: ShootService, source: string) {
  await Promise.all(
    service.images.map((imagePath, index) =>
      assertPublicAssetExists(imagePath, `${source} image ${index + 1}`),
    ),
  );
  if (service.seo.ogImage) {
    await assertPublicAssetExists(service.seo.ogImage, `${source} seo.ogImage`);
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const filePath = path.join(CONTENT_DIR, "config.json");
  const data = await readJsonFile<unknown>(filePath);
  return validateSiteConfig(data, "content/config.json");
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const directory = path.join(CONTENT_DIR, "portfolio");
  const files = (await readdir(directory)).filter((file) => file.endsWith(".json"));

  const items = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directory, file);
      const data = await readJsonFile<unknown>(filePath);
      const item = validatePortfolioItem(data, `portfolio content file "${file}"`);
      await validatePortfolioAssets(item, `portfolio file "${file}"`);
      return item;
    }),
  );

  await assertUniqueSlugs(items, "portfolio");

  return items.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPortfolioItem(slug: string): Promise<PortfolioItem | undefined> {
  const items = await getPortfolioItems();
  return items.find((item) => item.slug === slug);
}

export async function getFeaturedPortfolioItems(limit = 3): Promise<PortfolioItem[]> {
  const items = await getPortfolioItems();
  return items.filter((item) => item.featured).slice(0, limit);
}

export async function getShootServices(): Promise<ShootService[]> {
  const directory = path.join(CONTENT_DIR, "services");
  const files = (await readdir(directory)).filter((file) => file.endsWith(".json"));

  const services = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directory, file);
      const data = await readJsonFile<unknown>(filePath);
      const service = validateShootService(data, `service content file "${file}"`);
      await validateServiceAssets(service, `service file "${file}"`);
      return service;
    }),
  );

  await assertUniqueSlugs(services, "service");

  return services.sort((a, b) => a.order - b.order);
}

export async function getShootService(slug: string): Promise<ShootService | undefined> {
  const services = await getShootServices();
  return services.find((service) => service.slug === slug);
}

export async function getFeaturedShootServices(limit = 3): Promise<ShootService[]> {
  const services = await getShootServices();
  return services.filter((service) => service.featured).slice(0, limit);
}

export async function getPortfolioCategories(): Promise<string[]> {
  const items = await getPortfolioItems();
  return [...new Set(items.map((item) => item.category))];
}
