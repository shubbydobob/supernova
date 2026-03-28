# Content Model

## Overview

The content model uses local file-based storage with JSON format. This approach provides:
- Simple content updates without database
- Version control for content changes
- Type-safe content with TypeScript interfaces
- Easy migration path to headless CMS

## Content Types

### 1. Portfolio Item

**File Location**: `content/portfolio/*.json`

**Schema**:

```typescript
interface PortfolioItem {
  slug: string;              // URL-friendly identifier (unique)
  title: string;             // Display title
  description: string;       // Full description (HTML supported)
  category: string;          // Category for filtering
  thumbnail: string;         // Path to thumbnail image
  images: string[];          // Array of image paths for gallery
  featured: boolean;         // Show on home page
  date: string;              // ISO date string (for sorting)
  seo: {
    title: string;           // SEO title (defaults to title)
    description: string;     // Meta description
    ogImage?: string;        // Open Graph image path
  };
}
```

**Example**:

```json
{
  "slug": "spring-wedding-seoul",
  "title": "Spring Wedding in Seoul",
  "description": "<p>A beautiful spring wedding at a historic venue in Seoul...</p>",
  "category": "wedding",
  "thumbnail": "/images/portfolio/spring-wedding/thumb.jpg",
  "images": [
    "/images/portfolio/spring-wedding/01.jpg",
    "/images/portfolio/spring-wedding/02.jpg",
    "/images/portfolio/spring-wedding/03.jpg"
  ],
  "featured": true,
  "date": "2024-03-15",
  "seo": {
    "title": "Spring Wedding Photography - Seoul",
    "description": "Professional wedding photography capturing a beautiful spring wedding in Seoul",
    "ogImage": "/images/portfolio/spring-wedding/og.jpg"
  }
}
```

**Validation Rules**:
- `slug`: Required, unique, lowercase, hyphen-separated
- `title`: Required, 1-100 characters
- `description`: Required, 10-5000 characters
- `category`: Required, must match existing category
- `thumbnail`: Required, must reference existing file
- `images`: Required, array with at least 1 image, all must reference existing files
- `featured`: Required, boolean
- `date`: Required, valid ISO date string
- `seo.title`: Required, 10-60 characters
- `seo.description`: Required, 50-160 characters

### 2. Shoot Service

**File Location**: `content/services/*.json`

**Schema**:

```typescript
interface ShootService {
  slug: string;              // URL-friendly identifier (unique)
  title: string;             // Service name
  description: string;       // Full description (HTML supported)
  shortDescription: string;  // Brief summary for list view
  pricing: string;           // Pricing information (text format)
  duration: string;          // Typical duration (e.g., "2-3 hours")
  deliverables: string[];    // What client receives
  images: string[];          // Sample images
  bookingUrl: string;        // Naver Booking URL
  featured: boolean;         // Show on home page
  order: number;             // Display order (lower = first)
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
}
```

**Example**:

```json
{
  "slug": "wedding-photography",
  "title": "Wedding Photography",
  "description": "<p>Comprehensive wedding photography coverage...</p>",
  "shortDescription": "Full-day wedding coverage with professional editing",
  "pricing": "Starting from ₩2,000,000",
  "duration": "8-10 hours",
  "deliverables": [
    "300-500 edited high-resolution images",
    "Online gallery for 1 year",
    "Print release for personal use",
    "USB drive with all images"
  ],
  "images": [
    "/images/services/wedding/sample-01.jpg",
    "/images/services/wedding/sample-02.jpg"
  ],
  "bookingUrl": "https://booking.naver.com/booking/12/bizes/123456",
  "featured": true,
  "order": 1,
  "seo": {
    "title": "Wedding Photography Services - Seoul",
    "description": "Professional wedding photography in Seoul with full-day coverage",
    "ogImage": "/images/services/wedding/og.jpg"
  }
}
```

**Validation Rules**:
- `slug`: Required, unique, lowercase, hyphen-separated
- `title`: Required, 1-100 characters
- `description`: Required, 10-5000 characters
- `shortDescription`: Required, 10-200 characters
- `pricing`: Required, 1-100 characters
- `duration`: Required, 1-50 characters
- `deliverables`: Required, array with at least 1 item
- `images`: Required, array with at least 1 image
- `bookingUrl`: Required, valid URL starting with https://
- `featured`: Required, boolean
- `order`: Required, positive integer
- `seo.title`: Required, 10-60 characters
- `seo.description`: Required, 50-160 characters

### 3. Site Configuration

**File Location**: `content/config.json`

**Schema**:

```typescript
interface SiteConfig {
  site: {
    title: string;           // Site title
    description: string;     // Site description
    url: string;             // Production URL
    locale: string;          // Language locale (e.g., "ko-KR")
  };
  brand: {
    name: string;            // Brand/photographer name
    tagline: string;         // Brand tagline
    bio: string;             // Short bio for about page (HTML supported)
    email: string;           // Contact email
    phone: string;           // Contact phone
  };
  social: {
    instagram?: string;      // Instagram URL
    facebook?: string;       // Facebook URL
    youtube?: string;        // YouTube URL
  };
  navigation: {
    header: NavItem[];       // Header nav items
    footer: NavItem[];       // Footer nav items
  };
  analytics: {
    gaId?: string;           // Google Analytics ID (future)
    vercelAnalytics: boolean; // Enable Vercel Analytics
  };
}

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}
```

**Example**:

```json
{
  "site": {
    "title": "Jane Doe Photography",
    "description": "Professional photography services in Seoul",
    "url": "https://janedoephotography.com",
    "locale": "ko-KR"
  },
  "brand": {
    "name": "Jane Doe",
    "tagline": "Capturing moments that matter",
    "bio": "<p>Professional photographer based in Seoul...</p>",
    "email": "hello@janedoephotography.com",
    "phone": "+82-10-1234-5678"
  },
  "social": {
    "instagram": "https://instagram.com/janedoephoto",
    "facebook": "https://facebook.com/janedoephoto"
  },
  "navigation": {
    "header": [
      { "label": "About", "href": "/about" },
      { "label": "Portfolio", "href": "/portfolio" },
      { "label": "Services", "href": "/services" },
      { "label": "Contact", "href": "/contact" }
    ],
    "footer": [
      { "label": "About", "href": "/about" },
      { "label": "Portfolio", "href": "/portfolio" },
      { "label": "Services", "href": "/services" },
      { "label": "Contact", "href": "/contact" },
      { "label": "FAQ", "href": "/faq" }
    ]
  },
  "analytics": {
    "vercelAnalytics": true
  }
}
```

## Content Loading

### Content Loader Functions

```typescript
// lib/content.ts

import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Load all portfolio items from content files
 */
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const portfolioDir = path.join(CONTENT_DIR, 'portfolio');
  const files = await fs.readdir(portfolioDir);
  
  const items = await Promise.all(
    files
      .filter(file => file.endsWith('.json'))
      .map(async file => {
        const content = await fs.readFile(path.join(portfolioDir, file), 'utf-8');
        const data = JSON.parse(content);
        return validatePortfolioItem(data);
      })
  );
  
  // Sort by date (newest first)
  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Load single portfolio item by slug
 */
export async function getPortfolioItem(slug: string): Promise<PortfolioItem | null> {
  try {
    const filePath = path.join(CONTENT_DIR, 'portfolio', `${slug}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    return validatePortfolioItem(data);
  } catch (error) {
    return null;
  }
}

/**
 * Load all shoot services from content files
 */
export async function getShootServices(): Promise<ShootService[]> {
  const servicesDir = path.join(CONTENT_DIR, 'services');
  const files = await fs.readdir(servicesDir);
  
  const services = await Promise.all(
    files
      .filter(file => file.endsWith('.json'))
      .map(async file => {
        const content = await fs.readFile(path.join(servicesDir, file), 'utf-8');
        const data = JSON.parse(content);
        return validateShootService(data);
      })
  );
  
  // Sort by order
  return services.sort((a, b) => a.order - b.order);
}

/**
 * Load single shoot service by slug
 */
export async function getShootService(slug: string): Promise<ShootService | null> {
  try {
    const filePath = path.join(CONTENT_DIR, 'services', `${slug}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    return validateShootService(data);
  } catch (error) {
    return null;
  }
}

/**
 * Load site configuration
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  const filePath = path.join(CONTENT_DIR, 'config.json');
  const content = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(content);
  return validateSiteConfig(data);
}

/**
 * Get unique categories from portfolio items
 */
export async function getPortfolioCategories(): Promise<string[]> {
  const items = await getPortfolioItems();
  const categories = [...new Set(items.map(item => item.category))];
  return categories.sort();
}
```

## Content Validation

### Zod Schemas

```typescript
// lib/validation.ts

import { z } from 'zod';

const PortfolioItemSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(5000),
  category: z.string().min(1),
  thumbnail: z.string().startsWith('/images/'),
  images: z.array(z.string().startsWith('/images/')).min(1),
  featured: z.boolean(),
  date: z.string().datetime(),
  seo: z.object({
    title: z.string().min(10).max(60),
    description: z.string().min(50).max(160),
    ogImage: z.string().startsWith('/images/').optional(),
  }),
});

const ShootServiceSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(5000),
  shortDescription: z.string().min(10).max(200),
  pricing: z.string().min(1).max(100),
  duration: z.string().min(1).max(50),
  deliverables: z.array(z.string()).min(1),
  images: z.array(z.string().startsWith('/images/')).min(1),
  bookingUrl: z.string().url().startsWith('https://'),
  featured: z.boolean(),
  order: z.number().int().positive(),
  seo: z.object({
    title: z.string().min(10).max(60),
    description: z.string().min(50).max(160),
    ogImage: z.string().startsWith('/images/').optional(),
  }),
});

const SiteConfigSchema = z.object({
  site: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    url: z.string().url(),
    locale: z.string().min(2),
  }),
  brand: z.object({
    name: z.string().min(1),
    tagline: z.string().min(1),
    bio: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
  }),
  social: z.object({
    instagram: z.string().url().optional(),
    facebook: z.string().url().optional(),
    youtube: z.string().url().optional(),
  }),
  navigation: z.object({
    header: z.array(z.object({
      label: z.string(),
      href: z.string(),
      external: z.boolean().optional(),
    })),
    footer: z.array(z.object({
      label: z.string(),
      href: z.string(),
      external: z.boolean().optional(),
    })),
  }),
  analytics: z.object({
    gaId: z.string().optional(),
    vercelAnalytics: z.boolean(),
  }),
});

export function validatePortfolioItem(data: unknown): PortfolioItem {
  return PortfolioItemSchema.parse(data);
}

export function validateShootService(data: unknown): ShootService {
  return ShootServiceSchema.parse(data);
}

export function validateSiteConfig(data: unknown): SiteConfig {
  return SiteConfigSchema.parse(data);
}
```

### Image Path Validation

```typescript
// lib/validation.ts (continued)

import fs from 'fs/promises';
import path from 'path';

/**
 * Validate that all image paths reference existing files
 */
export async function validateImagePaths(item: PortfolioItem | ShootService): Promise<void> {
  const publicDir = path.join(process.cwd(), 'public');
  
  const imagePaths = 'thumbnail' in item 
    ? [item.thumbnail, ...item.images]
    : item.images;
  
  if (item.seo.ogImage) {
    imagePaths.push(item.seo.ogImage);
  }
  
  for (const imagePath of imagePaths) {
    const fullPath = path.join(publicDir, imagePath);
    try {
      await fs.access(fullPath);
    } catch (error) {
      throw new Error(`Image not found: ${imagePath}`);
    }
  }
}
```

## Content Management Workflow

### Adding New Portfolio Item

1. Create new JSON file in `content/portfolio/`
2. Add images to `public/images/portfolio/{slug}/`
3. Fill in all required fields
4. Run build to validate
5. Commit and push to trigger deployment

### Adding New Service

1. Create new JSON file in `content/services/`
2. Add images to `public/images/services/{slug}/`
3. Fill in all required fields including booking URL
4. Set appropriate `order` value
5. Run build to validate
6. Commit and push to trigger deployment

### Updating Content

1. Edit JSON file directly
2. Update images if needed
3. Run build to validate
4. Commit and push to trigger deployment

## Migration Path to CMS

The content model is designed for easy migration to a headless CMS:

### Recommended CMS Options

1. **Sanity**: Flexible schema, real-time preview
2. **Contentful**: Enterprise-grade, good TypeScript support
3. **Strapi**: Self-hosted, full control
4. **Payload CMS**: Modern, TypeScript-native

### Migration Steps

1. **Schema Mapping**: Map JSON schema to CMS content types
2. **Content Import**: Bulk import existing JSON files
3. **API Integration**: Replace file reading with CMS API calls
4. **Incremental Static Regeneration**: Enable ISR for real-time updates
5. **Preview Mode**: Add preview functionality for draft content

### Code Changes Required

```typescript
// Before (file-based)
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  // Read from files
}

// After (CMS-based)
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const response = await fetch('https://api.cms.com/portfolio');
  const data = await response.json();
  return data.items;
}
```

The TypeScript interfaces remain the same, ensuring type safety throughout migration.

## Content Backup Strategy

### Version Control

- All content files committed to git
- Full history of content changes
- Easy rollback to previous versions

### Automated Backups

- Vercel deployment includes content snapshot
- Git repository serves as backup
- Optional: Periodic exports to cloud storage

## Content Guidelines

### Writing Guidelines

- **Titles**: Clear, descriptive, 50-60 characters
- **Descriptions**: Engaging, informative, 150-300 words
- **SEO Titles**: Include keywords, 50-60 characters
- **Meta Descriptions**: Compelling, include CTA, 150-160 characters

### Image Guidelines

- **Format**: JPEG for photos, PNG for graphics
- **Size**: Max 2MB per image (compress before upload)
- **Dimensions**: Minimum 1200px width for portfolio images
- **Naming**: Descriptive, lowercase, hyphen-separated
- **Alt Text**: Descriptive, include context

### URL Slug Guidelines

- **Format**: Lowercase, hyphen-separated
- **Length**: 3-5 words maximum
- **Keywords**: Include relevant keywords
- **Uniqueness**: Must be unique within content type
- **Permanence**: Avoid changing slugs after publication
