# System Overview

## Purpose

Photography portfolio website serving as a brand showcase and conversion tool. The system guides visitors from portfolio browsing to booking consultations via external Naver Booking integration.

## Core Functionality

1. **Portfolio Showcase**: Display photography work in organized, filterable galleries
2. **Service Presentation**: Present photography services with pricing and booking CTAs
3. **Contact Management**: Handle inquiry submissions via contact form
4. **Brand Storytelling**: Communicate photographer's background and approach
5. **Conversion Optimization**: Guide visitors toward booking and inquiry actions

## Technology Stack

- **Framework**: Next.js 14+ (App Router, React Server Components)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Content**: Local JSON/Markdown files
- **Images**: Next.js Image component with automatic optimization
- **Deployment**: Vercel (edge network, automatic deployments)
- **Forms**: Next.js Route Handler for server-side processing

## Key Constraints

### What This System IS

- Static portfolio and service showcase
- Contact inquiry collection system
- SEO-optimized marketing site
- Mobile-first responsive website
- Fast-loading image gallery

### What This System IS NOT

- E-commerce platform (no cart, checkout, payments)
- Custom booking system (uses external Naver Booking)
- User authentication system (no login, membership)
- Content management system (local files, not CMS)
- Inventory management system

## Architecture Principles

1. **Static-First**: Pre-render all content at build time for maximum performance
2. **MVP-First**: Deliver core functionality quickly; avoid over-engineering
3. **Mobile-First**: Optimize for mobile as primary use case
4. **Content-Driven**: Design for easy content updates and future CMS migration
5. **Conversion-Focused**: Every page guides toward booking or inquiry
6. **Performance-Obsessed**: Target sub-2.5s LCP, minimal layout shift

## System Boundaries

```
┌─────────────────────────────────────────────────────────┐
│                  Photography Portfolio Site              │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Portfolio  │  │   Services   │  │   Contact    │ │
│  │   Showcase   │  │  Presentation│  │     Form     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │     SEO      │  │    Image     │  │  Analytics   │ │
│  │ Optimization │  │ Optimization │  │   Tracking   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
           │                    │                │
           ▼                    ▼                ▼
    ┌─────────────┐      ┌──────────┐    ┌──────────┐
    │   Naver     │      │  Email   │    │   GA4    │
    │   Booking   │      │ Service  │    │ Vercel   │
    │  (External) │      │ (Future) │    │Analytics │
    └─────────────┘      └──────────┘    └──────────┘
```

## Performance Targets

- **LCP**: < 2.5 seconds
- **FID**: < 100 milliseconds
- **CLS**: < 0.1
- **Time to Interactive**: < 3.5 seconds
- **Mobile Load Time**: < 2.5 seconds on 4G

## Deployment Model

- **Platform**: Vercel
- **Build**: Static site generation (SSG)
- **Deployment**: Automatic on git push to main branch
- **Preview**: Automatic preview deployments for pull requests
- **CDN**: Vercel Edge Network (global distribution)
- **Revalidation**: Full rebuild on content changes (acceptable for MVP)

## Future Extensibility

The system is designed to support future additions:

- **Headless CMS**: Content schema ready for migration
- **Authentication**: Modular architecture supports adding auth
- **Multi-language**: Component structure supports i18n
- **Admin Panel**: Separation of concerns enables admin UI
- **Direct Booking**: Architecture can accommodate custom booking (beyond MVP)
