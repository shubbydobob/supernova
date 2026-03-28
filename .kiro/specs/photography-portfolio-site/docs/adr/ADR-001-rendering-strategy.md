# ADR-001: Rendering Strategy

## Status

Accepted

## Context

We need to choose a rendering strategy for the photography portfolio site. The main options are:

1. **Static Site Generation (SSG)**: Pre-render all pages at build time
2. **Server-Side Rendering (SSR)**: Render pages on each request
3. **Client-Side Rendering (CSR)**: Render pages in the browser
4. **Incremental Static Regeneration (ISR)**: Static generation with periodic revalidation

### Requirements

- Fast page loads (LCP < 2.5s)
- SEO-friendly (fully rendered HTML)
- Content changes infrequently (weekly/monthly)
- Simple deployment and maintenance
- Cost-effective for MVP

### Constraints

- Content stored in local files (not database)
- Deploying to Vercel
- No real-time content updates needed
- Image-heavy site requiring optimization

## Decision

We will use **Static Site Generation (SSG)** for all pages.

## Rationale

### Why SSG?

1. **Performance**:
   - Pages served instantly from CDN
   - No server rendering overhead
   - Optimal for Core Web Vitals
   - Best possible LCP scores

2. **SEO**:
   - Fully rendered HTML at request time
   - Search engines can crawl immediately
   - No JavaScript required for content

3. **Cost**:
   - No server costs (static files only)
   - Minimal bandwidth usage
   - Vercel free tier sufficient

4. **Simplicity**:
   - No server-side logic needed
   - Easy to reason about
   - Straightforward deployment

5. **Content Update Pattern**:
   - Portfolio items added infrequently
   - Services rarely change
   - Full rebuild acceptable for updates

### Why Not SSR?

- **Unnecessary overhead**: Content doesn't change per-request
- **Higher costs**: Requires serverless functions
- **Slower**: Server rendering adds latency
- **Complexity**: More moving parts to maintain

### Why Not CSR?

- **Poor SEO**: Search engines struggle with JavaScript-rendered content
- **Slow initial load**: Must download and execute JavaScript first
- **Poor UX**: Blank page while JavaScript loads
- **Accessibility**: Requires JavaScript to view content

### Why Not ISR?

- **Unnecessary complexity**: Content updates are intentional (not time-based)
- **Harder to reason about**: Stale content possible
- **Not needed for MVP**: Full rebuild is fast enough
- **Future option**: Can migrate to ISR when adding CMS

## Implementation

### Page Generation

```typescript
// app/portfolio/[slug]/page.tsx
export async function generateStaticParams() {
  const items = await getPortfolioItems();
  return items.map(item => ({
    slug: item.slug,
  }));
}

export default async function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const item = await getPortfolioItem(params.slug);
  // Render page
}
```

### Build Process

1. Load all content files
2. Validate content
3. Generate static pages for all routes
4. Optimize images
5. Output static HTML/CSS/JS

### Content Update Workflow

1. Edit content files locally
2. Commit to git
3. Push to trigger deployment
4. Vercel rebuilds and deploys
5. New content live in ~2 minutes

## Consequences

### Positive

- ✅ Excellent performance (instant page loads)
- ✅ Perfect SEO (fully rendered HTML)
- ✅ Low cost (static hosting)
- ✅ Simple architecture
- ✅ Easy to cache and distribute
- ✅ No server maintenance

### Negative

- ❌ Content updates require rebuild
- ❌ Build time increases with content volume
- ❌ No real-time content updates
- ❌ Preview requires deployment

### Mitigations

1. **Build Time**: 
   - Current content volume: < 100 items
   - Expected build time: < 2 minutes
   - Acceptable for MVP

2. **Content Preview**:
   - Use Vercel preview deployments
   - Create preview branch for testing
   - Merge to main when ready

3. **Future Migration**:
   - Can add ISR when adding CMS
   - Can add SSR for specific pages if needed
   - Architecture supports both

## Alternatives Considered

### Hybrid Approach (SSG + SSR)

Use SSG for most pages, SSR for specific pages (e.g., contact form).

**Rejected because**:
- Contact form doesn't need SSR (client-side submission)
- Adds complexity without clear benefit
- Can add later if needed

### ISR with Short Revalidation

Use ISR with 60-second revalidation.

**Rejected because**:
- Content doesn't change that frequently
- Adds complexity
- Harder to reason about cache state
- Better suited for CMS integration (future)

## Future Considerations

### When to Reconsider

1. **Content volume > 1000 items**: Build time may become issue
2. **CMS integration**: ISR becomes more attractive
3. **Real-time updates needed**: Consider SSR or ISR
4. **Personalization required**: Consider SSR or edge functions

### Migration Path

If we need to migrate to ISR:

```typescript
// Add revalidation to page
export const revalidate = 3600; // Revalidate every hour

export default async function Page() {
  // Same code, now with ISR
}
```

No major code changes required - Next.js makes this easy.

## References

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Static Site Generation](https://nextjs.org/docs/basic-features/pages#static-generation)
- [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)

## Decision Date

2024-01-15

## Decision Makers

- Development Team
- Product Owner
