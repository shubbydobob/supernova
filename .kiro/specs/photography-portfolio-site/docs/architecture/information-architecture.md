# Information Architecture

## Site Structure

```
Home
├── About
├── Portfolio
│   ├── [Category Filter: All]
│   ├── [Category Filter: Wedding]
│   ├── [Category Filter: Portrait]
│   ├── [Category Filter: Commercial]
│   └── Portfolio Item Detail
│       ├── Image Gallery
│       ├── Description
│       ├── Metadata
│       └── Inquiry CTA
├── Services
│   └── Service Detail
│       ├── Service Description
│       ├── Pricing Information
│       ├── Sample Images
│       ├── Deliverables
│       └── Booking CTA (Naver)
├── Contact
│   └── Contact Form
└── FAQ
```

## URL Structure

| Page Type | URL Pattern | Example |
|-----------|-------------|---------|
| Home | `/` | `/` |
| About | `/about` | `/about` |
| Portfolio List | `/portfolio` | `/portfolio` |
| Portfolio List (Filtered) | `/portfolio?category={slug}` | `/portfolio?category=wedding` |
| Portfolio Detail | `/portfolio/{slug}` | `/portfolio/spring-wedding-seoul` |
| Services List | `/services` | `/services` |
| Service Detail | `/services/{slug}` | `/services/wedding-photography` |
| Contact | `/contact` | `/contact` |
| FAQ | `/faq` | `/faq` |
| 404 Error | `/404` | `/404` |

## Navigation Structure

### Primary Navigation (Header)

```
Logo  |  About  |  Portfolio  |  Services  |  Contact
```

**Mobile**: Hamburger menu with same links

### Secondary Navigation (Footer)

```
Column 1: Quick Links        Column 2: Services         Column 3: Connect
- About                      - Wedding Photography      - Instagram
- Portfolio                  - Portrait Sessions        - Facebook
- Services                   - Commercial Work          - Email
- Contact                    - FAQ                      - Phone
- FAQ
```

### Breadcrumb Navigation (Detail Pages)

```
Home > Portfolio > Spring Wedding in Seoul
Home > Services > Wedding Photography
```

## Content Hierarchy

### Home Page

```
┌─────────────────────────────────────┐
│ Hero Section                        │
│ - Large featured image              │
│ - Brand tagline                     │
│ - Primary CTA (View Portfolio)      │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Brand Introduction                  │
│ - Brief bio                         │
│ - Value proposition                 │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Featured Portfolio Items            │
│ - 3-6 featured works                │
│ - Grid layout                       │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Services Overview                   │
│ - Service cards                     │
│ - CTAs to service details           │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Call to Action Section              │
│ - Booking CTA                       │
│ - Contact CTA                       │
└─────────────────────────────────────┘
```

### Portfolio List Page

```
┌─────────────────────────────────────┐
│ Page Header                         │
│ - Title: "Portfolio"                │
│ - Brief description                 │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Filter Bar                          │
│ - All | Wedding | Portrait | etc.   │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Portfolio Grid                      │
│ - Portfolio cards (3 columns)       │
│ - Thumbnail, title, category        │
└─────────────────────────────────────┘
```

### Portfolio Detail Page

```
┌─────────────────────────────────────┐
│ Breadcrumbs                         │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Portfolio Header                    │
│ - Title                             │
│ - Category                          │
│ - Date                              │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Image Gallery                       │
│ - Multiple images                   │
│ - Optimized loading                 │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Description                         │
│ - Full project description          │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ CTA Section                         │
│ - "Interested in similar work?"     │
│ - Contact CTA                       │
└─────────────────────────────────────┘
```

### Service Detail Page

```
┌─────────────────────────────────────┐
│ Breadcrumbs                         │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Service Hero                        │
│ - Service name                      │
│ - Hero image                        │
│ - Primary booking CTA               │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Service Details                     │
│ - Description                       │
│ - Pricing information               │
│ - Duration                          │
│ - Deliverables list                 │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Sample Images                       │
│ - Gallery of sample work            │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Booking Guidance                    │
│ - How to book                       │
│ - What to expect                    │
│ - FAQ link                          │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Booking CTA (Sticky)                │
│ - "Book Now" → Naver Booking        │
└─────────────────────────────────────┘
```

### Contact Page

```
┌─────────────────────────────────────┐
│ Page Header                         │
│ - Title: "Get in Touch"             │
│ - Brief message                     │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Contact Form                        │
│ - Name field                        │
│ - Email field                       │
│ - Phone field                       │
│ - Message field                     │
│ - Submit button                     │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Contact Information                 │
│ - Email address                     │
│ - Phone number                      │
│ - Social media links                │
└─────────────────────────────────────┘
```

## Content Categorization

### Portfolio Categories

- **Wedding**: Wedding photography projects
- **Portrait**: Individual and family portraits
- **Commercial**: Business and commercial work
- **Event**: Event photography
- **Other**: Miscellaneous projects

Categories are flexible and defined by content files (not hardcoded).

### Service Types

- **Wedding Photography**: Full wedding coverage
- **Portrait Session**: Individual/family portraits
- **Commercial Photography**: Business and product photography
- **Event Coverage**: Corporate and private events

## Search and Discovery

### MVP Approach

- **No search functionality**: Simple category filtering sufficient for MVP
- **Category filtering**: Client-side filtering on portfolio page
- **Featured content**: Curated featured items on home page
- **Breadcrumbs**: Clear navigation path on detail pages

### Future Enhancements

- Full-text search across portfolio and services
- Tag-based filtering (multiple tags per item)
- Related content recommendations
- Search analytics to understand user intent

## Mobile Information Architecture

### Mobile Navigation

```
┌─────────────────────────────────────┐
│ Logo                    [☰ Menu]    │
└─────────────────────────────────────┘

[Menu Expanded]
┌─────────────────────────────────────┐
│ [✕ Close]                           │
│                                     │
│ About                               │
│ Portfolio                           │
│ Services                            │
│ Contact                             │
│ FAQ                                 │
│                                     │
│ ─────────────────────────           │
│ [Instagram] [Facebook]              │
└─────────────────────────────────────┘
```

### Mobile Content Priority

1. **Hero image and CTA** (above fold)
2. **Key information** (service name, price)
3. **Primary action** (booking/contact CTA)
4. **Supporting content** (description, details)
5. **Secondary actions** (social links, related content)

## Accessibility Considerations

- **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3)
- **Skip links**: "Skip to main content" for keyboard users
- **ARIA labels**: Where semantic HTML insufficient
- **Focus management**: Logical tab order
- **Alt text**: Descriptive alt text for all images
- **Color contrast**: Minimum 4.5:1 ratio for text
