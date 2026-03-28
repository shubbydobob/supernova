# Implementation Plan: Photography Portfolio Site

## Overview

This plan implements a Next.js 14+ photography portfolio website with TypeScript, Tailwind CSS, and static site generation. The implementation follows an MVP-first approach targeting a 14-day timeline, with tasks ordered to deliver core functionality early and enable incremental validation.

## Implementation Strategy

- **Language**: TypeScript (strict mode)
- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **Content**: Local JSON files with Zod validation
- **Deployment**: Vercel
- **Timeline**: 14 days (P0 tasks = MVP)

## Task Priority Legend

- **P0**: Critical for MVP launch (Days 1-10)
- **P1**: Important for complete experience (Days 11-13)
- **P2**: Nice-to-have enhancements (Day 14+)

## Dependencies

Tasks are ordered to respect dependencies. Each task lists prerequisites where applicable.

## Tasks

### Phase 1: Foundation (Days 1-2)

- [ ] 1. Initialize Next.js project with TypeScript and Tailwind CSS
  - Run `npx create-next-app@latest photography-portfolio-site --typescript --tailwind --app --no-src-dir`
  - Install additional dependencies: `zod`, `fast-check` (dev)
  - Configure TypeScript strict mode in `tsconfig.json`
  - Set up ESLint configuration
  - Initialize git repository
  - **Priority**: P0
  - **Dependencies**: None
  - **Done**: Project created, dependencies installed, TypeScript strict mode enabled
  - _Requirements: 18.1, 18.2, 18.3_


- [ ] 2. Create TypeScript type definitions and Zod schemas
  - [ ] 2.1 Create `types/content.ts` with interfaces for PortfolioItem, ShootService, SiteConfig, ImageAsset
    - Define all interfaces matching design document schemas
    - Include SEO metadata types
    - **Priority**: P0
    - **Dependencies**: Task 1
    - **Done**: All TypeScript interfaces created and exported
    - _Requirements: 7.4, 18.1, 22.3, 22.4_
  
  - [ ] 2.2 Create `lib/validation.ts` with Zod schemas
    - Implement portfolioItemSchema, shootServiceSchema, siteConfigSchema
    - Add validation helper functions
    - **Priority**: P0
    - **Dependencies**: Task 2.1
    - **Done**: All Zod schemas created, validation functions exported
    - _Requirements: 7.5, 22.1, 22.2_
  
  - [ ]* 2.3 Write property test for content validation
    - **Property 18: Content validation at build**
    - **Validates: Requirements 7.5, 22.1**
    - Test that valid content passes validation and invalid content fails
    - Use fast-check to generate test data
    - **Priority**: P1
    - **Dependencies**: Task 2.2

  - [ ]* 2.4 Write property test for required field validation
    - **Property 19: Required field validation**
    - **Validates: Requirements 22.3, 22.4**
    - Test that missing required fields cause validation failure
    - **Priority**: P1
    - **Dependencies**: Task 2.2

- [ ] 3. Create content loader functions
  - [ ] 3.1 Implement `lib/content.ts` with content loading functions
    - Implement `getPortfolioItems()`, `getPortfolioItem(slug)`, `getShootServices()`, `getShootService(slug)`, `getSiteConfig()`, `getPortfolioCategories()`
    - Add build-time validation with descriptive error messages
    - Validate image paths reference existing files
    - Check for duplicate slugs
    - **Priority**: P0
    - **Dependencies**: Task 2.2
    - **Done**: All content loader functions implemented with validation
    - _Requirements: 7.1, 7.2, 7.3, 7.5, 22.1, 22.5_
  
  - [ ]* 3.2 Write unit tests for content loaders
    - Test successful content loading
    - Test validation error handling
    - Test duplicate slug detection
    - **Priority**: P1
    - **Dependencies**: Task 3.1

- [ ] 4. Create sample content files
  - Create `content/config.json` with site configuration
  - Create 3-5 sample portfolio items in `content/portfolio/*.json`
  - Create 2-3 sample services in `content/services/*.json`
  - Add sample images to `public/images/` directory
  - Ensure all content validates against schemas
  - **Priority**: P0
  - **Dependencies**: Task 2.2
  - **Done**: Sample content created, all files validate successfully
  - _Requirements: 7.1, 7.2, 7.3, 7.4_


### Phase 2: Layout Components (Day 2)

- [ ] 5. Create root layout and utility components
  - [ ] 5.1 Create `app/layout.tsx` with root layout
    - Implement RootLayout with HTML structure, font optimization, metadata
    - Include Header and Footer components
    - Configure Tailwind CSS
    - **Priority**: P0
    - **Dependencies**: Task 4
    - **Done**: Root layout renders with header and footer
    - _Requirements: 9.1, 9.3, 19.1, 19.2_
  
  - [ ] 5.2 Create utility components in `components/shared/`
    - Create `Container.tsx` (max-width wrapper)
    - Create `Section.tsx` (vertical spacing wrapper)
    - Create `OptimizedImage.tsx` (Next.js Image wrapper)
    - **Priority**: P0
    - **Dependencies**: Task 5.1
    - **Done**: Utility components created and reusable
    - _Requirements: 8.1, 8.2_
  
  - [ ]* 5.3 Write property test for Next.js Image component usage
    - **Property 21: Next.js Image component usage**
    - **Validates: Requirements 8.1, 8.2, 8.3**
    - Test that all images use Next.js Image component with proper props
    - **Priority**: P1
    - **Dependencies**: Task 5.2

- [ ] 6. Create Header component with navigation
  - [ ] 6.1 Create `components/layout/Header.tsx`
    - Implement desktop navigation with links to Home, About, Portfolio, Services, Contact
    - Highlight active page based on current path
    - Use semantic HTML (nav, header elements)
    - **Priority**: P0
    - **Dependencies**: Task 5.1
    - **Done**: Header renders with navigation, active page highlighted
    - _Requirements: 9.1, 9.2, 9.5, 12.1_
  
  - [ ] 6.2 Create `components/layout/MobileMenu.tsx`
    - Implement hamburger menu for mobile viewports
    - Add slide-out menu with navigation links
    - Ensure keyboard accessibility
    - **Priority**: P0
    - **Dependencies**: Task 6.1
    - **Done**: Mobile menu functional, keyboard accessible
    - _Requirements: 9.4, 12.2_
  
  - [ ]* 6.3 Write property test for keyboard navigation
    - **Property 29: Keyboard navigation support**
    - **Validates: Requirements 12.2, 12.7**
    - Test that all interactive elements are keyboard accessible
    - **Priority**: P1
    - **Dependencies**: Task 6.2

- [ ] 7. Create Footer component
  - Create `components/layout/Footer.tsx`
  - Include social media links (Instagram, etc.)
  - Include secondary navigation links
  - Add copyright and contact information
  - **Priority**: P0
  - **Dependencies**: Task 5.1
  - **Done**: Footer renders with social links and navigation
  - _Requirements: 9.3, 15.1, 15.2_

- [ ] 8. Checkpoint - Verify layout components
  - Ensure all tests pass, ask the user if questions arise.


### Phase 3: Home Page (Day 3)

- [ ] 9. Create home page components
  - [ ] 9.1 Create `components/home/HeroSection.tsx`
    - Implement hero with featured image, headline, and primary CTA
    - Optimize for LCP (load critical content quickly)
    - Use Next.js Image with priority loading
    - **Priority**: P0
    - **Dependencies**: Task 5.2
    - **Done**: Hero section renders with optimized image and CTA
    - _Requirements: 16.1, 16.4, 16.5_
  
  - [ ] 9.2 Create `components/home/FeaturedPortfolio.tsx`
    - Display featured portfolio items from content
    - Use grid layout (responsive)
    - Link to portfolio detail pages
    - **Priority**: P0
    - **Dependencies**: Task 3.1
    - **Done**: Featured portfolio displays correctly
    - _Requirements: 16.2_
  
  - [ ] 9.3 Create `components/shared/CTAButton.tsx`
    - Implement reusable CTA button component
    - Consistent styling and hover states
    - Support internal and external links
    - **Priority**: P0
    - **Dependencies**: Task 5.2
    - **Done**: CTA button component reusable across pages
    - _Requirements: 21.3, 21.4_
  
  - [ ] 9.4 Create `app/page.tsx` (home page)
    - Compose HeroSection, FeaturedPortfolio, and CTAs
    - Add metadata for SEO
    - Ensure mobile-first responsive design
    - **Priority**: P0
    - **Dependencies**: Tasks 9.1, 9.2, 9.3
    - **Done**: Home page renders completely, metadata present
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5_
  
  - [ ]* 9.5 Write property test for unique SEO metadata
    - **Property 13: Unique SEO metadata**
    - **Validates: Requirements 6.1**
    - Test that each page has unique title and description
    - **Priority**: P1
    - **Dependencies**: Task 9.4


### Phase 4: Portfolio Pages (Days 4-5)

- [ ] 10. Create portfolio list page
  - [ ] 10.1 Create `components/portfolio/PortfolioCard.tsx`
    - Display portfolio item with thumbnail, title, and category
    - Link to detail page
    - Lazy load images below fold
    - **Priority**: P0
    - **Dependencies**: Task 5.2
    - **Done**: Portfolio card renders with all required fields
    - _Requirements: 1.3_
  
  - [ ] 10.2 Create `components/portfolio/PortfolioGrid.tsx`
    - Display grid of portfolio items (1 col mobile, 2 tablet, 3 desktop)
    - Filter by category if provided
    - Handle empty state
    - **Priority**: P0
    - **Dependencies**: Task 10.1
    - **Done**: Grid displays portfolio items responsively
    - _Requirements: 1.1, 5.1_
  
  - [ ] 10.3 Create `app/portfolio/page.tsx`
    - Load portfolio items using getPortfolioItems()
    - Render PortfolioGrid
    - Add metadata for SEO
    - **Priority**: P0
    - **Dependencies**: Tasks 3.1, 10.2
    - **Done**: Portfolio list page renders with all items
    - _Requirements: 1.1, 1.3, 6.1_
  
  - [ ]* 10.4 Write property test for portfolio item display completeness
    - **Property 2: Portfolio item display completeness**
    - **Validates: Requirements 1.3**
    - Test that all portfolio items show title, thumbnail, and category
    - **Priority**: P1
    - **Dependencies**: Task 10.3
  
  - [ ]* 10.5 Write unit tests for PortfolioGrid
    - Test grid rendering with items
    - Test empty state
    - Test responsive layout
    - **Priority**: P1
    - **Dependencies**: Task 10.2

- [ ] 11. Create portfolio detail page
  - [ ] 11.1 Create `components/portfolio/ImageGallery.tsx`
    - Display multiple images in gallery format
    - Optimize images with Next.js Image
    - Support keyboard navigation
    - **Priority**: P0
    - **Dependencies**: Task 5.2
    - **Done**: Image gallery displays all images
    - _Requirements: 1.4, 8.1, 8.2_
  
  - [ ] 11.2 Create `components/portfolio/PortfolioMeta.tsx`
    - Display portfolio title, description, category, date
    - Support markdown in description
    - **Priority**: P0
    - **Dependencies**: Task 5.2
    - **Done**: Portfolio metadata displays correctly
    - _Requirements: 1.4_
  
  - [ ] 11.3 Create `components/shared/Breadcrumbs.tsx`
    - Display breadcrumb navigation (Home > Portfolio > Item)
    - Use semantic HTML
    - **Priority**: P0
    - **Dependencies**: Task 5.2
    - **Done**: Breadcrumbs render on detail pages
    - _Requirements: 9.6_
  
  - [ ] 11.4 Create `app/portfolio/[slug]/page.tsx`
    - Implement generateStaticParams() to pre-render all portfolio items
    - Implement generateMetadata() for SEO
    - Load portfolio item using getPortfolioItem(slug)
    - Handle 404 for invalid slugs
    - Compose ImageGallery, PortfolioMeta, Breadcrumbs, and inquiry CTA
    - **Priority**: P0
    - **Dependencies**: Tasks 3.1, 11.1, 11.2, 11.3
    - **Done**: Portfolio detail pages statically generated, metadata present
    - _Requirements: 1.2, 1.4, 6.1, 13.2, 21.2_
  
  - [ ]* 11.5 Write property test for portfolio navigation
    - **Property 1: Portfolio item navigation**
    - **Validates: Requirements 1.2**
    - Test that clicking portfolio item navigates to correct detail page
    - **Priority**: P1
    - **Dependencies**: Task 11.4
  
  - [ ]* 11.6 Write property test for static generation
    - **Property 33: Static generation of dynamic routes**
    - **Validates: Requirements 13.2, 13.3**
    - Test that all portfolio items have static pages generated
    - **Priority**: P1
    - **Dependencies**: Task 11.4

- [ ] 12. Checkpoint - Verify portfolio pages
  - Ensure all tests pass, ask the user if questions arise.


### Phase 5: Services Pages (Days 5-6)

- [ ] 13. Create services list page
  - [ ] 13.1 Create `components/services/ServiceCard.tsx`
    - Display service with image, title, short description, and pricing
    - Link to detail page
    - **Priority**: P0
    - **Dependencies**: Task 5.2
    - **Done**: Service card renders with all fields
    - _Requirements: 2.1_
  
  - [ ] 13.2 Create `app/services/page.tsx`
    - Load services using getShootServices()
    - Render grid of ServiceCards
    - Add metadata for SEO
    - **Priority**: P0
    - **Dependencies**: Tasks 3.1, 13.1
    - **Done**: Services list page renders with all services
    - _Requirements: 2.1, 6.1_
  
  - [ ]* 13.3 Write unit tests for ServiceCard
    - Test card rendering with service data
    - Test link navigation
    - **Priority**: P1
    - **Dependencies**: Task 13.1

- [ ] 14. Create service detail page
  - [ ] 14.1 Create `components/services/ServiceDetails.tsx`
    - Display service name, description, pricing, duration, deliverables
    - Display sample images
    - Support markdown in description
    - **Priority**: P0
    - **Dependencies**: Task 5.2
    - **Done**: Service details display completely
    - _Requirements: 2.3_
  
  - [ ] 14.2 Create `components/services/BookingCTA.tsx`
    - Display prominent Naver Booking link button
    - Open external link in new tab with security attributes
    - Track click events for analytics
    - Include booking guidance text
    - **Priority**: P0
    - **Dependencies**: Task 9.3
    - **Done**: Booking CTA renders with correct URL and tracking
    - _Requirements: 2.4, 2.5, 14.4, 21.1_
  
  - [ ] 14.3 Create `app/services/[slug]/page.tsx`
    - Implement generateStaticParams() to pre-render all services
    - Implement generateMetadata() for SEO
    - Load service using getShootService(slug)
    - Handle 404 for invalid slugs
    - Compose ServiceDetails, BookingCTA, and Breadcrumbs
    - **Priority**: P0
    - **Dependencies**: Tasks 3.1, 14.1, 14.2, 11.3
    - **Done**: Service detail pages statically generated, metadata present
    - _Requirements: 2.2, 2.3, 2.4, 6.1, 13.3_
  
  - [ ]* 14.4 Write property test for service navigation
    - **Property 4: Service navigation**
    - **Validates: Requirements 2.2**
    - Test that clicking service navigates to correct detail page
    - **Priority**: P1
    - **Dependencies**: Task 14.3
  
  - [ ]* 14.5 Write property test for booking CTA presence
    - **Property 6: Booking CTA presence on services**
    - **Validates: Requirements 2.4, 21.1**
    - Test that all service detail pages have booking CTA with correct URL
    - **Priority**: P1
    - **Dependencies**: Task 14.3
  
  - [ ]* 14.6 Write property test for external link behavior
    - **Property 7: External link behavior**
    - **Validates: Requirements 2.5, 15.3**
    - Test that external links open in new tab with security attributes
    - **Priority**: P1
    - **Dependencies**: Task 14.2

- [ ] 15. Checkpoint - Verify services pages
  - Ensure all tests pass, ask the user if questions arise.


### Phase 6: Contact Form (Day 7)

- [ ] 16. Create contact form with validation
  - [ ] 16.1 Create `components/contact/ContactForm.tsx`
    - Implement form with fields: name, email, phone, message
    - Add client-side validation with error messages
    - Associate labels with inputs using htmlFor
    - Display loading, success, and error states
    - Preserve form data on error
    - Disable submit button during submission
    - **Priority**: P0
    - **Dependencies**: Task 5.2
    - **Done**: Contact form renders with validation and state management
    - _Requirements: 3.1, 3.2, 3.3, 3.5, 3.6, 12.6_
  
  - [ ]* 16.2 Write property test for contact form validation
    - **Property 8: Contact form validation**
    - **Validates: Requirements 3.3**
    - Test that invalid submissions are prevented with error messages
    - **Priority**: P1
    - **Dependencies**: Task 16.1
  
  - [ ]* 16.3 Write property test for form error handling
    - **Property 10: Contact form error handling**
    - **Validates: Requirements 3.6**
    - Test that failed submissions preserve user input
    - **Priority**: P1
    - **Dependencies**: Task 16.1
  
  - [ ]* 16.4 Write unit tests for ContactForm
    - Test form rendering
    - Test validation logic
    - Test submission flow
    - Test error states
    - **Priority**: P1
    - **Dependencies**: Task 16.1

- [ ] 17. Create contact form API route
  - [ ] 17.1 Create `app/api/contact/route.ts`
    - Implement POST handler with Zod validation
    - Sanitize inputs to prevent injection
    - Log inquiry to console (MVP)
    - Return appropriate status codes (200, 400, 500)
    - Add descriptive error messages
    - **Priority**: P0
    - **Dependencies**: Task 2.2
    - **Done**: API route handles form submissions with validation
    - _Requirements: 3.3, 3.4, 3.5, 3.6_
  
  - [ ]* 17.2 Write property test for contact form submission success
    - **Property 9: Contact form submission success**
    - **Validates: Requirements 3.4, 3.5**
    - Test that valid submissions return success response
    - **Priority**: P1
    - **Dependencies**: Task 17.1
  
  - [ ]* 17.3 Write unit tests for API route
    - Test valid submission handling
    - Test validation error responses
    - Test server error handling
    - **Priority**: P1
    - **Dependencies**: Task 17.1

- [ ] 18. Create contact page
  - Create `app/contact/page.tsx`
  - Render ContactForm component
  - Add contact information and social links
  - Add metadata for SEO
  - **Priority**: P0
  - **Dependencies**: Task 16.1
  - **Done**: Contact page renders with form and metadata
  - _Requirements: 3.1, 6.1_

- [ ] 19. Checkpoint - Verify contact form
  - Ensure all tests pass, ask the user if questions arise.


### Phase 7: SEO and Performance (Days 8-9)

- [ ] 20. Implement SEO optimization
  - [ ] 20.1 Add metadata to all pages
    - Ensure unique title and description for each page
    - Add Open Graph tags for social sharing
    - Add canonical URLs
    - **Priority**: P0
    - **Dependencies**: Tasks 9.4, 10.3, 11.4, 13.2, 14.3, 18
    - **Done**: All pages have unique, complete metadata
    - _Requirements: 6.1_
  
  - [ ] 20.2 Create `app/sitemap.ts`
    - Generate sitemap.xml with all static pages
    - Include portfolio and service detail pages
    - **Priority**: P0
    - **Dependencies**: Task 3.1
    - **Done**: Sitemap generates with all pages
    - _Requirements: 6.3_
  
  - [ ] 20.3 Create `app/robots.ts`
    - Configure robots.txt for search engine crawlers
    - Allow all pages
    - **Priority**: P0
    - **Dependencies**: None
    - **Done**: Robots.txt configured
    - _Requirements: 6.4_
  
  - [ ] 20.4 Add structured data (JSON-LD)
    - Add structured data to portfolio detail pages
    - Add structured data to service detail pages
    - Use schema.org types (CreativeWork, Service)
    - **Priority**: P0
    - **Dependencies**: Tasks 11.4, 14.3
    - **Done**: Structured data present on detail pages
    - _Requirements: 6.5_
  
  - [ ]* 20.5 Write property test for structured data presence
    - **Property 15: Structured data presence**
    - **Validates: Requirements 6.5**
    - Test that portfolio and service pages include valid JSON-LD
    - **Priority**: P1
    - **Dependencies**: Task 20.4
  
  - [ ] 20.6 Add descriptive alt text to all images
    - Audit all images for meaningful alt text
    - Update OptimizedImage component to require alt prop
    - **Priority**: P0
    - **Dependencies**: Task 5.2
    - **Done**: All images have descriptive alt text
    - _Requirements: 6.6, 12.4_
  
  - [ ]* 20.7 Write property test for image alt text
    - **Property 16: Image alt text**
    - **Validates: Requirements 6.6, 12.4**
    - Test that all images have non-empty, meaningful alt text
    - **Priority**: P1
    - **Dependencies**: Task 20.6
  
  - [ ]* 20.8 Write property test for semantic HTML structure
    - **Property 14: Semantic HTML structure**
    - **Validates: Requirements 6.2**
    - Test that pages use semantic elements and proper heading hierarchy
    - **Priority**: P1
    - **Dependencies**: Task 20.1

- [ ] 21. Optimize image performance
  - [ ] 21.1 Configure Next.js Image component settings
    - Set up image domains in next.config.js
    - Configure responsive image sizes
    - Enable lazy loading for below-fold images
    - Set priority loading for hero images
    - **Priority**: P0
    - **Dependencies**: Task 5.2
    - **Done**: Image optimization configured
    - _Requirements: 8.1, 8.2, 8.3, 8.4_
  
  - [ ] 21.2 Compress and optimize image assets
    - Compress all images in public/images/
    - Target < 200KB per image
    - Convert to WebP format where possible
    - **Priority**: P0
    - **Dependencies**: Task 4
    - **Done**: All images optimized and compressed
    - _Requirements: 8.5, 8.6_
  
  - [ ] 21.3 Configure font optimization
    - Use next/font for web font loading
    - Set font-display: swap or optional
    - Preload critical fonts
    - Minimize font weights loaded
    - **Priority**: P0
    - **Dependencies**: Task 5.1
    - **Done**: Fonts optimized with zero layout shift
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5_
  
  - [ ]* 21.4 Write property test for font optimization
    - **Property 35: Font optimization**
    - **Validates: Requirements 19.1, 19.3**
    - Test that fonts use Next.js optimization with proper font-display
    - **Priority**: P1
    - **Dependencies**: Task 21.3

- [ ] 22. Checkpoint - Verify SEO and performance
  - Ensure all tests pass, ask the user if questions arise.


### Phase 8: Error Handling and Accessibility (Day 10)

- [ ] 23. Create error pages
  - [ ] 23.1 Create `app/not-found.tsx`
    - Implement 404 error page
    - Include navigation links back to main sections
    - Add helpful error message
    - **Priority**: P0
    - **Dependencies**: Task 5.1
    - **Done**: 404 page renders with navigation
    - _Requirements: 10.1, 10.2_
  
  - [ ] 23.2 Create `app/error.tsx`
    - Implement error boundary for runtime errors
    - Display user-friendly error message
    - Log errors for debugging
    - **Priority**: P0
    - **Dependencies**: Task 5.1
    - **Done**: Error boundary catches and displays errors
    - _Requirements: 10.3, 10.4, 10.5_
  
  - [ ]* 23.3 Write property test for 404 error handling
    - **Property 25: 404 error handling**
    - **Validates: Requirements 10.1**
    - Test that non-existent URLs show 404 page
    - **Priority**: P1
    - **Dependencies**: Task 23.1
  
  - [ ]* 23.4 Write property test for error logging
    - **Property 27: Error logging**
    - **Validates: Requirements 10.5**
    - Test that errors are logged with sufficient context
    - **Priority**: P1
    - **Dependencies**: Task 23.2

- [ ] 24. Implement accessibility features
  - [ ] 24.1 Audit and fix keyboard navigation
    - Ensure all interactive elements are keyboard accessible
    - Add visible focus indicators
    - Test tab order
    - **Priority**: P0
    - **Dependencies**: All component tasks
    - **Done**: All interactive elements keyboard accessible
    - _Requirements: 12.2, 12.7_
  
  - [ ] 24.2 Audit and fix semantic HTML
    - Ensure proper use of semantic elements (header, nav, main, article, footer)
    - Verify heading hierarchy (no skipped levels)
    - Use button vs link appropriately
    - **Priority**: P0
    - **Dependencies**: All component tasks
    - **Done**: All pages use semantic HTML correctly
    - _Requirements: 12.1, 12.5_
  
  - [ ]* 24.3 Write property test for semantic link and button distinction
    - **Property 31: Semantic link and button distinction**
    - **Validates: Requirements 12.5**
    - Test that navigation uses links and actions use buttons
    - **Priority**: P1
    - **Dependencies**: Task 24.2
  
  - [ ] 24.4 Audit color contrast
    - Check all text meets 4.5:1 contrast ratio
    - Update Tailwind colors if needed
    - **Priority**: P0
    - **Dependencies**: All component tasks
    - **Done**: All text meets contrast requirements
    - _Requirements: 12.3_
  
  - [ ]* 24.5 Write property test for color contrast compliance
    - **Property 30: Color contrast compliance**
    - **Validates: Requirements 12.3**
    - Test that text elements meet minimum contrast ratio
    - **Priority**: P1
    - **Dependencies**: Task 24.4
  
  - [ ]* 24.6 Write property test for form label association
    - **Property 32: Form label association**
    - **Validates: Requirements 12.6**
    - Test that all form inputs have associated labels
    - **Priority**: P1
    - **Dependencies**: Task 16.1

- [ ] 25. Checkpoint - Verify error handling and accessibility
  - Ensure all tests pass, ask the user if questions arise.


### Phase 9: Additional Features (Days 11-13)

- [ ] 26. Implement portfolio filtering (P1)
  - [ ] 26.1 Create `components/portfolio/FilterBar.tsx`
    - Display category filter buttons
    - Highlight active filter
    - Update URL query parameters on filter change
    - **Priority**: P1
    - **Dependencies**: Task 3.1
    - **Done**: Filter bar renders and updates URL
    - _Requirements: 20.1, 20.4_
  
  - [ ] 26.2 Update `app/portfolio/page.tsx` to support filtering
    - Read category from URL query parameters
    - Filter portfolio items by category
    - Display empty state when no items match
    - **Priority**: P1
    - **Dependencies**: Tasks 10.3, 26.1
    - **Done**: Portfolio filtering works without page reload
    - _Requirements: 20.1, 20.2, 20.5_
  
  - [ ]* 26.3 Write property test for portfolio filtering functionality
    - **Property 36: Portfolio filtering functionality**
    - **Validates: Requirements 20.1, 20.2, 20.4**
    - Test that filtering updates display and URL
    - **Priority**: P1
    - **Dependencies**: Task 26.2
  
  - [ ]* 26.4 Write property test for category display
    - **Property 37: Category display on portfolio items**
    - **Validates: Requirements 20.3**
    - Test that all portfolio items show category
    - **Priority**: P1
    - **Dependencies**: Task 26.2

- [ ] 27. Create About page (P1)
  - Create `app/about/page.tsx`
  - Display photographer biography and brand story
  - Display contact information and social media links
  - Display brand images
  - Add metadata for SEO
  - **Priority**: P1
  - **Dependencies**: Task 5.1
  - **Done**: About page renders with complete content
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 28. Create FAQ page (P1)
  - Create `app/faq/page.tsx`
  - Display FAQ content with questions about booking, pricing, deliverables, policies
  - Include booking guidance for Naver Booking
  - Link from footer navigation
  - Add metadata for SEO
  - **Priority**: P1
  - **Dependencies**: Task 5.1
  - **Done**: FAQ page renders with complete content
  - _Requirements: 14.1, 14.2, 14.3_

- [ ] 29. Implement analytics tracking (P1)
  - [ ] 29.1 Create `lib/analytics.ts` with tracking functions
    - Implement trackEvent() function
    - Use consistent naming convention: {category}_{action}
    - Support Vercel Analytics or GA4
    - **Priority**: P1
    - **Dependencies**: None
    - **Done**: Analytics tracking functions implemented
    - _Requirements: 11.7_
  
  - [ ] 29.2 Add analytics tracking to key interactions
    - Track portfolio detail page views
    - Track service detail page views
    - Track Naver Booking link clicks
    - Track contact form submissions
    - Track social media link clicks
    - Track CTA button clicks
    - **Priority**: P1
    - **Dependencies**: Tasks 29.1, all page tasks
    - **Done**: All key interactions tracked
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_
  
  - [ ]* 29.3 Write property test for analytics event tracking
    - **Property 28: Analytics event tracking**
    - **Validates: Requirements 11.1-11.7**
    - Test that tracked actions fire events with correct naming
    - **Priority**: P1
    - **Dependencies**: Task 29.2

- [ ] 30. Checkpoint - Verify additional features
  - Ensure all tests pass, ask the user if questions arise.


### Phase 10: Testing and Deployment (Day 14)

- [ ] 31. Set up testing infrastructure (P1)
  - [ ] 31.1 Configure Jest and React Testing Library
    - Install dependencies: `@testing-library/react`, `@testing-library/jest-dom`, `jest`, `jest-environment-jsdom`
    - Create `jest.config.js` and `jest.setup.js`
    - Add test scripts to package.json
    - **Priority**: P1
    - **Dependencies**: Task 1
    - **Done**: Testing framework configured and working
    - _Requirements: 18.6_
  
  - [ ] 31.2 Configure fast-check for property-based testing
    - Install `fast-check` as dev dependency
    - Create property test utilities
    - Set minimum 100 iterations per test
    - **Priority**: P1
    - **Dependencies**: Task 31.1
    - **Done**: Property-based testing configured
    - _Requirements: Testing strategy from design_

- [ ] 32. Run comprehensive testing (P1)
  - [ ] 32.1 Run all unit tests
    - Execute `npm test`
    - Fix any failing tests
    - **Priority**: P1
    - **Dependencies**: All test tasks
    - **Done**: All unit tests passing
  
  - [ ] 32.2 Run all property-based tests
    - Execute property tests
    - Fix any failing properties
    - **Priority**: P1
    - **Dependencies**: All property test tasks
    - **Done**: All property tests passing
  
  - [ ] 32.3 Manual testing checklist
    - Test all pages on mobile, tablet, desktop
    - Test contact form submission
    - Test portfolio filtering
    - Test navigation and links
    - Test keyboard navigation
    - Test external links (Naver Booking, social media)
    - **Priority**: P1
    - **Dependencies**: All implementation tasks
    - **Done**: Manual testing complete, issues resolved

- [ ] 33. Performance and accessibility audit (P1)
  - [ ] 33.1 Run Lighthouse audit
    - Test home page, portfolio list, portfolio detail, service detail, contact
    - Target scores: Performance > 90, Accessibility > 90, Best Practices > 90, SEO > 90
    - Fix any issues found
    - **Priority**: P1
    - **Dependencies**: All implementation tasks
    - **Done**: Lighthouse scores meet targets
    - _Requirements: 8.5, 8.6_
  
  - [ ] 33.2 Verify Core Web Vitals
    - LCP < 2.5s
    - FID < 100ms
    - CLS < 0.1
    - **Priority**: P1
    - **Dependencies**: Task 33.1
    - **Done**: Core Web Vitals meet targets
    - _Requirements: 8.5, 8.6_
  
  - [ ]* 33.3 Write property test for responsive layout adaptation
    - **Property 11: Responsive layout adaptation**
    - **Validates: Requirements 5.1**
    - Test that pages adapt to different viewport sizes
    - **Priority**: P1
    - **Dependencies**: All page tasks
  
  - [ ]* 33.4 Write property test for touch target sizing
    - **Property 12: Touch target sizing**
    - **Validates: Requirements 5.3**
    - Test that interactive elements meet minimum size
    - **Priority**: P1
    - **Dependencies**: All component tasks

- [ ] 34. Deploy to Vercel (P0)
  - [ ] 34.1 Create Vercel project
    - Connect GitHub repository to Vercel
    - Configure build settings
    - Set environment variables (if any)
    - **Priority**: P0
    - **Dependencies**: All implementation tasks
    - **Done**: Vercel project created and connected
    - _Requirements: 17.1, 17.2_
  
  - [ ] 34.2 Deploy to production
    - Trigger production deployment
    - Verify build succeeds
    - Test live site
    - **Priority**: P0
    - **Dependencies**: Task 34.1
    - **Done**: Site deployed and accessible
    - _Requirements: 17.1, 17.4_
  
  - [ ] 34.3 Configure custom domain (if applicable)
    - Add custom domain in Vercel
    - Configure DNS settings
    - Verify SSL certificate
    - **Priority**: P0
    - **Dependencies**: Task 34.2
    - **Done**: Custom domain configured and working
    - _Requirements: 17.5_

- [ ] 35. Create documentation (P2)
  - Create README.md with setup instructions
  - Document content file schema and structure
  - Document component architecture
  - Document deployment process
  - Document analytics event naming conventions
  - **Priority**: P2
  - **Dependencies**: All implementation tasks
  - **Done**: Documentation complete and accurate
  - _Requirements: 23.1, 23.2, 23.3, 23.4, 23.5_

- [ ] 36. Final checkpoint - Production ready
  - Ensure all tests pass, ask the user if questions arise.


## Notes

- Tasks marked with `*` are optional property-based and unit tests that can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- P0 tasks (Days 1-10) constitute the MVP and must be completed first
- P1 tasks (Days 11-13) complete the full experience
- P2 tasks (Day 14+) are enhancements and documentation

## Task Completion Criteria

Each task is considered complete when:
1. All code is written and follows TypeScript strict mode
2. All referenced files are created or modified
3. Code passes ESLint and TypeScript compiler checks
4. Manual testing confirms functionality works as expected
5. The "Done" criteria specified in the task is met

## Implementation Tips

1. **Start with foundation**: Complete Phase 1 before moving to other phases
2. **Test incrementally**: Run tests after each phase checkpoint
3. **Mobile-first**: Test on mobile viewport first, then desktop
4. **Use design document**: Reference design document for code examples and patterns
5. **Validate content**: Ensure all content files validate before building pages
6. **Optimize images**: Compress images before adding to public directory
7. **Check accessibility**: Test keyboard navigation and screen reader compatibility
8. **Monitor performance**: Run Lighthouse audits regularly during development

## Dependencies Summary

- **Phase 2-10** depend on **Phase 1** (foundation)
- **Portfolio pages** depend on **content loaders** and **layout components**
- **Services pages** depend on **content loaders** and **layout components**
- **Contact form** depends on **layout components** and **validation schemas**
- **SEO** depends on **all pages** being implemented
- **Testing** depends on **all implementation** being complete
- **Deployment** depends on **all testing** passing

## Timeline Overview

- **Days 1-2**: Foundation (project setup, types, content, layout)
- **Day 3**: Home page
- **Days 4-5**: Portfolio pages
- **Days 5-6**: Services pages
- **Day 7**: Contact form
- **Days 8-9**: SEO and performance
- **Day 10**: Error handling and accessibility
- **Days 11-13**: Additional features (filtering, about, FAQ, analytics)
- **Day 14**: Testing, deployment, documentation

**Total MVP Timeline**: 10 days (P0 tasks only)
**Total Complete Timeline**: 14 days (P0 + P1 tasks)

