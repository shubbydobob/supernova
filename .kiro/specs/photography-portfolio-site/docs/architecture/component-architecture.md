# Component Architecture

## Component Organization

```
components/
├── layout/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── mobile-menu.tsx
│   ├── breadcrumbs.tsx
│   └── container.tsx
├── portfolio/
│   ├── portfolio-grid.tsx
│   ├── portfolio-card.tsx
│   ├── portfolio-filter.tsx
│   └── image-gallery.tsx
├── services/
│   ├── service-grid.tsx
│   ├── service-card.tsx
│   └── service-details.tsx
├── contact/
│   ├── contact-form.tsx
│   └── contact-info.tsx
├── home/
│   ├── hero-section.tsx
│   ├── featured-portfolio.tsx
│   └── services-overview.tsx
├── shared/
│   ├── cta-button.tsx
│   ├── optimized-image.tsx
│   ├── section.tsx
│   └── error-message.tsx
└── ui/
    ├── button.tsx
    ├── input.tsx
    ├── textarea.tsx
    └── card.tsx
```

## Component Specifications

### Layout Components

#### Header

```typescript
// components/layout/header.tsx
interface HeaderProps {
  currentPath?: string;
}

export function Header({ currentPath }: HeaderProps): JSX.Element
```

**Responsibilities**:
- Render site logo and brand name
- Display primary navigation links
- Highlight active page
- Toggle mobile menu on small screens
- Provide keyboard navigation support

**State**:
- `isMobileMenuOpen`: boolean (mobile menu visibility)

**Behavior**:
- Desktop: Horizontal navigation bar
- Mobile: Hamburger icon + slide-out menu
- Sticky positioning on scroll (optional)
- Auto-close mobile menu on navigation

#### Footer

```typescript
// components/layout/footer.tsx
interface FooterProps {
  config: SiteConfig;
}

export function Footer({ config }: FooterProps): JSX.Element
```

**Responsibilities**:
- Display secondary navigation links
- Show social media links
- Display contact information
- Show copyright notice

**State**: None (stateless)

#### MobileMenu

```typescript
// components/layout/mobile-menu.tsx
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath?: string;
}

export function MobileMenu({ isOpen, onClose, currentPath }: MobileMenuProps): JSX.Element
```

**Responsibilities**:
- Render slide-out navigation menu
- Handle open/close animations
- Trap focus when open
- Close on navigation or outside click

**State**: Managed by parent (Header)

#### Breadcrumbs

```typescript
// components/layout/breadcrumbs.tsx
interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps): JSX.Element
```

**Responsibilities**:
- Display navigation path
- Render links to parent pages
- Show current page (non-linked)

**State**: None (stateless)

### Portfolio Components

#### PortfolioGrid

```typescript
// components/portfolio/portfolio-grid.tsx
interface PortfolioGridProps {
  items: PortfolioItem[];
  selectedCategory?: string;
}

export function PortfolioGrid({ items, selectedCategory }: PortfolioGridProps): JSX.Element
```

**Responsibilities**:
- Display portfolio items in responsive grid
- Filter items by category if provided
- Render PortfolioCard for each item
- Handle empty state

**Layout**:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

#### PortfolioCard

```typescript
// components/portfolio/portfolio-card.tsx
interface PortfolioCardProps {
  item: PortfolioItem;
}

export function PortfolioCard({ item }: PortfolioCardProps): JSX.Element
```

**Responsibilities**:
- Display portfolio item preview
- Show thumbnail, title, category
- Link to detail page
- Lazy load thumbnail image

**State**: None (stateless)

#### PortfolioFilter

```typescript
// components/portfolio/portfolio-filter.tsx
interface PortfolioFilterProps {
  categories: string[];
  selectedCategory?: string;
  onCategoryChange: (category: string | undefined) => void;
}

export function PortfolioFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: PortfolioFilterProps): JSX.Element
```

**Responsibilities**:
- Display category filter buttons
- Highlight selected category
- Trigger filter change callback
- Include "All" option

**State**: Managed by parent page

#### ImageGallery

```typescript
// components/portfolio/image-gallery.tsx
interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps): JSX.Element
```

**Responsibilities**:
- Display multiple images in gallery
- Lazy load images
- Support keyboard navigation
- Optimize image loading

**State**:
- `currentIndex`: number (for lightbox, optional)

**Behavior**:
- Grid layout with responsive columns
- Click to expand (optional lightbox)
- Swipe gestures on mobile (optional)

### Service Components

#### ServiceGrid

```typescript
// components/services/service-grid.tsx
interface ServiceGridProps {
  services: ShootService[];
}

export function ServiceGrid({ services }: ServiceGridProps): JSX.Element
```

**Responsibilities**:
- Display services in responsive grid
- Render ServiceCard for each service
- Sort by order field

**Layout**:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 2-3 columns

#### ServiceCard

```typescript
// components/services/service-card.tsx
interface ServiceCardProps {
  service: ShootService;
}

export function ServiceCard({ service }: ServiceCardProps): JSX.Element
```

**Responsibilities**:
- Display service preview
- Show name, short description, sample image
- Link to detail page
- Display pricing (if available)

**State**: None (stateless)

#### ServiceDetails

```typescript
// components/services/service-details.tsx
interface ServiceDetailsProps {
  service: ShootService;
}

export function ServiceDetails({ service }: ServiceDetailsProps): JSX.Element
```

**Responsibilities**:
- Display full service information
- Show description, pricing, duration
- List deliverables
- Display sample images

**State**: None (stateless)

### Contact Components

#### ContactForm

```typescript
// components/contact/contact-form.tsx
interface ContactFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export function ContactForm({ onSuccess, onError }: ContactFormProps): JSX.Element
```

**Responsibilities**:
- Render form fields with labels
- Validate inputs client-side
- Submit to API endpoint
- Display loading, success, error states
- Preserve form data on error

**State**:
- `formData`: FormData
- `errors`: FormErrors
- `status`: 'idle' | 'loading' | 'success' | 'error'

**Validation Rules**:
- Name: Required, min 2 characters
- Email: Required, valid email format
- Phone: Required, valid phone format
- Message: Required, min 10 characters

#### ContactInfo

```typescript
// components/contact/contact-info.tsx
interface ContactInfoProps {
  config: SiteConfig;
}

export function ContactInfo({ config }: ContactInfoProps): JSX.Element
```

**Responsibilities**:
- Display contact information
- Show email, phone
- Display social media links
- Render as complementary info to form

**State**: None (stateless)

### Home Components

#### HeroSection

```typescript
// components/home/hero-section.tsx
interface HeroSectionProps {
  title: string;
  tagline: string;
  image: string;
  ctaText: string;
  ctaHref: string;
}

export function HeroSection({ 
  title, 
  tagline, 
  image, 
  ctaText, 
  ctaHref 
}: HeroSectionProps): JSX.Element
```

**Responsibilities**:
- Display large hero image
- Show brand title and tagline
- Render primary CTA button
- Optimize for LCP

**State**: None (stateless)

**Behavior**:
- Full-width background image
- Centered text overlay
- Prominent CTA button
- Mobile-optimized layout

#### FeaturedPortfolio

```typescript
// components/home/featured-portfolio.tsx
interface FeaturedPortfolioProps {
  items: PortfolioItem[];
}

export function FeaturedPortfolio({ items }: FeaturedPortfolioProps): JSX.Element
```

**Responsibilities**:
- Display featured portfolio items
- Render in grid layout
- Link to portfolio detail pages
- Show only items with `featured: true`

**State**: None (stateless)

#### ServicesOverview

```typescript
// components/home/services-overview.tsx
interface ServicesOverviewProps {
  services: ShootService[];
}

export function ServicesOverview({ services }: ServicesOverviewProps): JSX.Element
```

**Responsibilities**:
- Display service cards
- Show brief service information
- Link to service detail pages
- Highlight featured services

**State**: None (stateless)

### Shared Components

#### CTAButton

```typescript
// components/shared/cta-button.tsx
interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  external?: boolean;
  trackingEvent?: string;
}

export function CTAButton({ 
  href, 
  onClick, 
  children, 
  variant = 'primary',
  external = false,
  trackingEvent
}: CTAButtonProps): JSX.Element
```

**Responsibilities**:
- Render styled CTA button or link
- Handle internal/external links
- Track analytics events
- Support primary/secondary variants

**Behavior**:
- If `href`: Render as Link or anchor
- If `onClick`: Render as button
- If `external`: Add target="_blank" and rel attributes
- If `trackingEvent`: Fire analytics event on click

#### OptimizedImage

```typescript
// components/shared/optimized-image.tsx
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className
}: OptimizedImageProps): JSX.Element
```

**Responsibilities**:
- Wrap Next.js Image component
- Provide consistent image optimization
- Handle responsive sizing
- Lazy load by default (unless priority)

**Behavior**:
- Use Next.js Image for optimization
- Responsive sizes based on viewport
- WebP/AVIF format with fallbacks
- Blur placeholder for loading

### UI Primitives

#### Button

```typescript
// components/ui/button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  children,
  ...props 
}: ButtonProps): JSX.Element
```

**Responsibilities**:
- Render styled button element
- Support variants and sizes
- Show loading state
- Maintain accessibility

#### Input

```typescript
// components/ui/input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export function Input({ 
  label, 
  error, 
  helperText, 
  ...props 
}: InputProps): JSX.Element
```

**Responsibilities**:
- Render labeled input field
- Display validation errors
- Show helper text
- Associate label with input

#### Textarea

```typescript
// components/ui/textarea.tsx
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export function Textarea({ 
  label, 
  error, 
  helperText, 
  ...props 
}: TextareaProps): JSX.Element
```

**Responsibilities**:
- Render labeled textarea field
- Display validation errors
- Show helper text
- Associate label with textarea

## Component Composition Patterns

### Page Composition Example

```typescript
// app/portfolio/[slug]/page.tsx
export default async function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const item = await getPortfolioItem(params.slug);
  
  if (!item) {
    notFound();
  }
  
  return (
    <>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: item.title, href: `/portfolio/${item.slug}` }
      ]} />
      
      <Container>
        <Section>
          <h1>{item.title}</h1>
          <p>{item.category}</p>
        </Section>
        
        <Section>
          <ImageGallery images={item.images} alt={item.title} />
        </Section>
        
        <Section>
          <div dangerouslySetInnerHTML={{ __html: item.description }} />
        </Section>
        
        <Section>
          <CTAButton 
            href="/contact" 
            trackingEvent="portfolio_inquiry_click"
          >
            Interested in similar work?
          </CTAButton>
        </Section>
      </Container>
    </>
  );
}
```

### Layout Composition

```typescript
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const config = await getSiteConfig();
  
  return (
    <html lang={config.site.locale}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer config={config} />
      </body>
    </html>
  );
}
```

## Component Design Principles

### 1. Server Components by Default

Use React Server Components for:
- Layout components (Header, Footer)
- Content display components (PortfolioGrid, ServiceDetails)
- Static content (HeroSection, FeaturedPortfolio)

### 2. Client Components When Needed

Use Client Components ('use client') for:
- Interactive components (ContactForm, MobileMenu)
- Components with state (PortfolioFilter)
- Components with browser APIs (analytics tracking)

### 3. Composition Over Configuration

Prefer composing small components over large configurable components:

```typescript
// Good: Composition
<Section>
  <h2>Featured Work</h2>
  <PortfolioGrid items={featured} />
</Section>

// Avoid: Over-configuration
<Section 
  title="Featured Work" 
  component={PortfolioGrid} 
  items={featured}
  showTitle={true}
  titleLevel={2}
/>
```

### 4. Prop Drilling Avoidance

For deeply nested props, use:
- React Context (sparingly)
- Server Component composition
- URL state (for filters, pagination)

### 5. Accessibility First

Every component must:
- Use semantic HTML
- Support keyboard navigation
- Provide ARIA labels where needed
- Maintain focus management
- Meet color contrast requirements

### 6. Performance Optimization

- Lazy load images below fold
- Code-split client components
- Minimize JavaScript bundle size
- Use React.memo for expensive renders (sparingly)
- Prefer CSS over JavaScript animations

## Testing Strategy

### Unit Tests

Test individual components in isolation:

```typescript
// __tests__/components/portfolio-card.test.tsx
describe('PortfolioCard', () => {
  it('should render portfolio item information', () => {
    const item = {
      slug: 'test-item',
      title: 'Test Item',
      category: 'wedding',
      thumbnail: '/images/test.jpg',
      // ...
    };
    
    render(<PortfolioCard item={item} />);
    
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('wedding')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Item');
  });
});
```

### Integration Tests

Test component interactions:

```typescript
// __tests__/components/contact-form.integration.test.tsx
describe('ContactForm Integration', () => {
  it('should submit form and show success message', async () => {
    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
  });
});
```

### Property Tests

Test component properties across many inputs:

```typescript
// __tests__/components/portfolio-grid.property.test.tsx
describe('PortfolioGrid Properties', () => {
  it('should render all provided items', () => {
    fc.assert(
      fc.property(
        fc.array(portfolioItemArbitrary),
        (items) => {
          const { container } = render(<PortfolioGrid items={items} />);
          const cards = container.querySelectorAll('[data-testid="portfolio-card"]');
          expect(cards.length).toBe(items.length);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```
