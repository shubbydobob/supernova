# SEO, Performance, and Accessibility Strategy

## SEO Strategy

### Meta Tags

#### Page-Level Meta Tags

```typescript
// app/portfolio/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const item = await getPortfolioItem(params.slug);
  
  if (!item) {
    return {
      title: 'Portfolio Item Not Found',
    };
  }
  
  return {
    title: item.seo.title,
    description: item.seo.description,
    openGraph: {
      title: item.seo.title,
      description: item.seo.description,
      images: [item.seo.ogImage || item.thumbnail],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: item.seo.title,
      description: item.seo.description,
      images: [item.seo.ogImage || item.thumbnail],
    },
  };
}
```

#### Site-Level Meta Tags

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://janedoephotography.com'),
  title: {
    default: 'Jane Doe Photography - Professional Photography in Seoul',
    template: '%s | Jane Doe Photography',
  },
  description: 'Professional photography services in Seoul specializing in weddings, portraits, and commercial work',
  keywords: ['photography', 'Seoul', 'wedding photographer', 'portrait photographer'],
  authors: [{ name: 'Jane Doe' }],
  creator: 'Jane Doe',
  publisher: 'Jane Doe Photography',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};
```

### Structured Data

#### Portfolio Item Structured Data

```typescript
// app/portfolio/[slug]/page.tsx
export default async function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const item = await getPortfolioItem(params.slug);
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.title,
    description: item.description,
    image: item.images,
    creator: {
      '@type': 'Person',
      name: 'Jane Doe',
    },
    datePublished: item.date,
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Page content */}
    </>
  );
}
```

#### Service Structured Data

```typescript
// app/services/[slug]/page.tsx
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  description: service.description,
  provider: {
    '@type': 'Person',
    name: 'Jane Doe',
  },
  offers: {
    '@type': 'Offer',
    price: service.pricing,
    priceCurrency: 'KRW',
  },
  image: service.images,
};
```

#### Organization Structured Data

```typescript
// app/layout.tsx
const organizationData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Jane Doe Photography',
  description: 'Professional photography services in Seoul',
  url: 'https://janedoephotography.com',
  telephone: '+82-10-1234-5678',
  email: 'hello@janedoephotography.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Seoul',
    addressCountry: 'KR',
  },
  sameAs: [
    'https://instagram.com/janedoephoto',
    'https://facebook.com/janedoephoto',
  ],
};
```

### Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getPortfolioItems, getShootServices } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://janedoephotography.com';
  
  const portfolioItems = await getPortfolioItems();
  const services = await getShootServices();
  
  const portfolioUrls = portfolioItems.map(item => ({
    url: `${baseUrl}/portfolio/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  
  const serviceUrls = services.map(service => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...portfolioUrls,
    ...serviceUrls,
  ];
}
```

### Robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://janedoephotography.com/sitemap.xml',
  };
}
```

### URL Structure Best Practices

- **Descriptive slugs**: `/portfolio/spring-wedding-seoul` (not `/portfolio/123`)
- **Consistent structure**: All portfolio items under `/portfolio/`, all services under `/services/`
- **No unnecessary parameters**: Use clean URLs without query strings where possible
- **Lowercase**: All URLs lowercase for consistency
- **Hyphens**: Use hyphens (not underscores) for word separation

---

## Performance Strategy

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.5 seconds
- **FID (First Input Delay)**: < 100 milliseconds
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTI (Time to Interactive)**: < 3.5 seconds

### Image Optimization

#### Next.js Image Component

```typescript
// components/shared/optimized-image.tsx
import Image from 'next/image';

export function OptimizedImage({ src, alt, priority = false }: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={800}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={priority}
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Low-quality placeholder
    />
  );
}
```

#### Image Optimization Checklist

- ✅ Use Next.js Image component for all images
- ✅ Serve WebP/AVIF with JPEG fallback
- ✅ Lazy load images below the fold
- ✅ Use responsive image sizes
- ✅ Compress images before upload (target < 200KB)
- ✅ Use blur placeholder for loading state
- ✅ Prioritize hero/LCP images
- ✅ Set explicit width/height to prevent CLS

### Font Optimization

```typescript
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

#### Font Loading Strategy

- Use `next/font` for automatic optimization
- Limit to 2 font families maximum
- Load only necessary weights (400, 700)
- Use `font-display: swap` to prevent FOIT
- Preload critical fonts

### Code Splitting

```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const ImageGallery = dynamic(() => import('@/components/portfolio/image-gallery'), {
  loading: () => <div>Loading gallery...</div>,
  ssr: false, // Client-side only if needed
});
```

### Bundle Size Optimization

- Minimize dependencies (use only essential packages)
- Tree-shake unused code
- Use dynamic imports for large components
- Analyze bundle with `@next/bundle-analyzer`
- Target < 200KB initial JavaScript bundle

### Caching Strategy

#### Static Assets

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

#### API Routes

```typescript
// app/api/contact/route.ts
export async function POST(request: Request) {
  // No caching for POST requests
  return Response.json(data, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
```

### Performance Monitoring

#### Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Web Vitals Tracking

```typescript
// app/web-vitals.tsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric);
    // Send to analytics service
  });
  
  return null;
}
```

---

## Accessibility Strategy

### WCAG 2.1 Level AA Compliance

Target: Meet WCAG 2.1 Level AA standards

### Semantic HTML

```typescript
// Good: Semantic structure
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Portfolio Item Title</h1>
    <section>
      <h2>Description</h2>
      <p>Content...</p>
    </section>
  </article>
</main>

<footer>
  <nav aria-label="Footer navigation">
    {/* Footer links */}
  </nav>
</footer>
```

### Heading Hierarchy

```typescript
// Correct heading hierarchy
<h1>Page Title</h1>
  <h2>Section Title</h2>
    <h3>Subsection Title</h3>
  <h2>Another Section</h2>

// Avoid skipping levels
// ❌ <h1> → <h3> (skips h2)
// ✅ <h1> → <h2> → <h3>
```

### Keyboard Navigation

```typescript
// components/layout/mobile-menu.tsx
'use client';

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      // Trap focus within menu
      const menu = document.getElementById('mobile-menu');
      const focusableElements = menu?.querySelectorAll(
        'a, button, input, [tabindex]:not([tabindex="-1"])'
      );
      
      // Focus first element
      (focusableElements?.[0] as HTMLElement)?.focus();
      
      // Handle Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);
  
  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* Menu content */}
    </div>
  );
}
```

### Focus Indicators

```css
/* tailwind.config.js - Custom focus styles */
module.exports = {
  theme: {
    extend: {
      ringWidth: {
        DEFAULT: '2px',
      },
      ringColor: {
        DEFAULT: '#3b82f6',
      },
    },
  },
};
```

```typescript
// Apply focus styles to interactive elements
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Click me
</button>
```

### Color Contrast

```typescript
// Tailwind config with accessible colors
module.exports = {
  theme: {
    extend: {
      colors: {
        // Ensure 4.5:1 contrast ratio for text
        primary: {
          DEFAULT: '#1e40af', // Dark enough for white text
          light: '#3b82f6',   // Use with dark text
        },
        text: {
          primary: '#111827',   // Near black (high contrast)
          secondary: '#4b5563', // Gray (still meets 4.5:1)
        },
      },
    },
  },
};
```

### Alt Text Guidelines

```typescript
// Good alt text examples
<OptimizedImage 
  src="/images/portfolio/wedding.jpg" 
  alt="Bride and groom exchanging vows at outdoor ceremony in Seoul" 
/>

// Decorative images
<OptimizedImage 
  src="/images/decorative-pattern.jpg" 
  alt="" // Empty alt for decorative images
  role="presentation"
/>

// Avoid redundant "image of" or "photo of"
// ❌ alt="Image of a wedding ceremony"
// ✅ alt="Wedding ceremony at sunset"
```

### Form Accessibility

```typescript
// components/ui/input.tsx
export function Input({ label, error, id, ...props }: InputProps) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${inputId}-error`;
  
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="text-red-600 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
```

### ARIA Labels

```typescript
// Use ARIA labels for context
<button aria-label="Close mobile menu" onClick={onClose}>
  <XIcon className="w-6 h-6" aria-hidden="true" />
</button>

<nav aria-label="Main navigation">
  {/* Navigation links */}
</nav>

<nav aria-label="Footer navigation">
  {/* Footer links */}
</nav>

// Loading states
<button disabled aria-busy="true">
  <span className="sr-only">Loading...</span>
  <Spinner aria-hidden="true" />
</button>
```

### Skip Links

```typescript
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### Screen Reader Only Content

```css
/* globals.css */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### Accessibility Testing

#### Automated Testing

```typescript
// __tests__/accessibility.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

#### Manual Testing Checklist

- ✅ Keyboard navigation (Tab, Shift+Tab, Enter, Escape)
- ✅ Screen reader testing (NVDA, VoiceOver)
- ✅ Color contrast (use browser DevTools)
- ✅ Focus indicators visible
- ✅ Form labels associated
- ✅ Alt text for images
- ✅ Heading hierarchy
- ✅ ARIA labels where needed

### Accessibility Statement

Include accessibility statement page:

```markdown
# Accessibility Statement

We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.

## Conformance Status

This website aims to conform to WCAG 2.1 Level AA standards.

## Feedback

We welcome your feedback on the accessibility of this site. Please contact us at accessibility@janedoephotography.com.
```
