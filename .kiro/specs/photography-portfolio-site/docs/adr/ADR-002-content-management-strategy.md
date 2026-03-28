# ADR-002: Content Management Strategy

## Status

Accepted

## Context

We need to choose a content management approach for the photography portfolio site. The main options are:

1. **Headless CMS**: Use external CMS (Sanity, Contentful, Strapi)
2. **Local Files**: Store content in JSON/Markdown files in repository
3. **Database**: Use database (PostgreSQL, MongoDB) with custom admin
4. **Git-based CMS**: Use Git-based CMS (Netlify CMS, Tina CMS)

### Requirements

- Quick MVP launch (< 2 weeks)
- Easy content updates for non-technical users (future)
- Version control for content changes
- Type-safe content access
- Low maintenance overhead
- Cost-effective

### Constraints

- Small content volume (< 100 portfolio items initially)
- Content updates infrequent (weekly/monthly)
- Single content editor (photographer)
- Budget-conscious MVP
- Must support future CMS migration

## Decision

We will use **Local JSON Files** for content management in MVP, with a clear migration path to headless CMS.

## Rationale

### Why Local Files for MVP?

1. **Speed to Launch**:
   - No CMS setup required
   - No API integration needed
   - No authentication to configure
   - Can start building immediately

2. **Simplicity**:
   - Content lives in repository
   - Easy to understand and debug
   - No external dependencies
   - No API rate limits or downtime

3. **Version Control**:
   - Full git history of content changes
   - Easy rollback to previous versions
   - Diff view for content changes
   - Branching for content experiments

4. **Type Safety**:
   - TypeScript interfaces for content
   - Compile-time validation
   - IDE autocomplete
   - Zod schema validation

5. **Cost**:
   - Zero cost for content management
   - No CMS subscription fees
   - No database hosting costs

6. **Developer Experience**:
   - Familiar tools (git, text editor)
   - Fast local development
   - No network requests for content
   - Easy testing with mock data

### Why Not Headless CMS (Yet)?

- **Setup time**: 1-2 days to configure
- **Learning curve**: Team needs to learn CMS
- **Cost**: $0-99/month for CMS
- **Complexity**: API integration, authentication
- **Overkill for MVP**: Single editor, infrequent updates

### Why Not Database?

- **Infrastructure**: Requires database hosting
- **Admin UI**: Need to build custom admin panel
- **Complexity**: More moving parts
- **Cost**: Database hosting fees
- **Maintenance**: Database backups, migrations

### Why Not Git-based CMS?

- **Still requires setup**: Configuration and integration
- **Limited flexibility**: Constrained by CMS features
- **Dependency**: Another service to maintain
- **Not needed yet**: Direct file editing is fine for MVP

## Implementation

### Content Structure

```
content/
├── config.json              # Site configuration
├── portfolio/
│   ├── spring-wedding.json
│   ├── portrait-session.json
│   └── ...
└── services/
    ├── wedding-photography.json
    ├── portrait-session.json
    └── ...
```

### Content Schema

```typescript
// types/content.ts
interface PortfolioItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  featured: boolean;
  date: string;
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
}
```

### Content Loading

```typescript
// lib/content.ts
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const portfolioDir = path.join(process.cwd(), 'content/portfolio');
  const files = await fs.readdir(portfolioDir);
  
  const items = await Promise.all(
    files
      .filter(file => file.endsWith('.json'))
      .map(async file => {
        const content = await fs.readFile(path.join(portfolioDir, file), 'utf-8');
        const data = JSON.parse(content);
        return validatePortfolioItem(data); // Zod validation
      })
  );
  
  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
```

### Content Validation

```typescript
// lib/validation.ts
import { z } from 'zod';

const PortfolioItemSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(100),
  description: z.string().min(10),
  category: z.string(),
  thumbnail: z.string().startsWith('/images/'),
  images: z.array(z.string().startsWith('/images/')).min(1),
  featured: z.boolean(),
  date: z.string().datetime(),
  seo: z.object({
    title: z.string().min(10).max(60),
    description: z.string().min(50).max(160),
    ogImage: z.string().optional(),
  }),
});

export function validatePortfolioItem(data: unknown): PortfolioItem {
  return PortfolioItemSchema.parse(data);
}
```

### Content Update Workflow

1. **Edit JSON file** in `content/` directory
2. **Add images** to `public/images/` directory
3. **Run validation** locally: `npm run validate-content`
4. **Commit changes** to git
5. **Push to trigger deployment**
6. **Verify on live site**

## Consequences

### Positive

- ✅ Fast MVP launch (no CMS setup)
- ✅ Zero cost for content management
- ✅ Full version control with git
- ✅ Type-safe content access
- ✅ Simple mental model
- ✅ Easy local development
- ✅ No external dependencies
- ✅ Fast content loading (no API calls)

### Negative

- ❌ No visual content editor
- ❌ Requires git knowledge for updates
- ❌ No real-time preview
- ❌ Content updates require deployment
- ❌ Not suitable for non-technical users

### Mitigations

1. **Content Editor**:
   - Create JSON templates for easy copying
   - Document content schema clearly
   - Provide validation script for immediate feedback

2. **Non-Technical Users**:
   - Plan migration to CMS within 3-6 months
   - Design schema for easy CMS migration
   - Keep content structure CMS-friendly

3. **Preview**:
   - Use Vercel preview deployments
   - Create preview branch for testing
   - Local development server for immediate preview

## Migration Path to CMS

### When to Migrate

Migrate to headless CMS when:
- Content editor is non-technical
- Content updates become frequent (daily)
- Need real-time preview
- Need content scheduling
- Need multi-user editing

### Recommended CMS Options

1. **Sanity** (Recommended):
   - Excellent TypeScript support
   - Real-time preview
   - Flexible schema
   - Generous free tier
   - Great developer experience

2. **Contentful**:
   - Enterprise-grade
   - Good documentation
   - Strong TypeScript support
   - Higher cost

3. **Strapi**:
   - Self-hosted option
   - Full control
   - Open source
   - More maintenance

### Migration Steps

1. **Schema Mapping**:
   ```typescript
   // Sanity schema (example)
   export default {
     name: 'portfolioItem',
     type: 'document',
     fields: [
       { name: 'slug', type: 'slug' },
       { name: 'title', type: 'string' },
       { name: 'description', type: 'text' },
       { name: 'category', type: 'string' },
       { name: 'images', type: 'array', of: [{ type: 'image' }] },
       // ... other fields
     ],
   };
   ```

2. **Content Import**:
   - Export JSON files
   - Write import script
   - Bulk import to CMS
   - Verify data integrity

3. **Code Changes**:
   ```typescript
   // Before (file-based)
   export async function getPortfolioItems(): Promise<PortfolioItem[]> {
     // Read from files
   }
   
   // After (CMS-based)
   export async function getPortfolioItems(): Promise<PortfolioItem[]> {
     const query = `*[_type == "portfolioItem"] | order(date desc)`;
     return await sanityClient.fetch(query);
   }
   ```

4. **Enable ISR**:
   ```typescript
   // Add revalidation for CMS updates
   export const revalidate = 60; // Revalidate every minute
   ```

5. **Testing**:
   - Test content loading
   - Verify image URLs
   - Check SEO metadata
   - Test preview mode

### Estimated Migration Time

- Schema setup: 1 day
- Content import: 0.5 days
- Code changes: 1 day
- Testing: 0.5 days
- **Total**: 3 days

### Estimated Migration Cost

- CMS subscription: $0-99/month (Sanity free tier likely sufficient)
- Developer time: 3 days
- No infrastructure changes needed

## Content Schema Design Principles

To ensure smooth CMS migration:

1. **Flat Structure**: Avoid deep nesting
2. **Standard Fields**: Use common field names (title, description, slug)
3. **Explicit Types**: Clear field types (string, number, array)
4. **Relationships**: Use slugs for references (not file paths)
5. **Metadata**: Separate SEO metadata into own object

## Alternatives Considered

### Start with Headless CMS

Use Sanity from day one.

**Rejected because**:
- Adds 1-2 days to MVP timeline
- Unnecessary complexity for single editor
- Can migrate later without major refactoring
- Want to validate product-market fit first

### Use Markdown Files

Use Markdown with frontmatter instead of JSON.

**Rejected because**:
- JSON is more structured
- Better TypeScript support
- Easier validation with Zod
- Simpler parsing (no frontmatter library needed)
- CMS migration easier from JSON

### Use Database with Prisma

Use PostgreSQL with Prisma ORM.

**Rejected because**:
- Requires database hosting
- Need to build admin UI
- More complex deployment
- Higher cost
- Overkill for MVP

## Future Considerations

### Content Localization

If adding multi-language support:
- Add `locale` field to content schema
- Organize files by locale: `content/en/`, `content/ko/`
- Or migrate to CMS with built-in i18n (Sanity, Contentful)

### Content Versioning

If need content versioning:
- Git provides basic versioning
- CMS provides advanced versioning (drafts, scheduled publishing)
- Consider CMS migration if versioning becomes critical

### Content Collaboration

If multiple editors:
- Git workflow becomes cumbersome
- CMS provides better collaboration (roles, permissions, workflows)
- Migrate to CMS when team grows

## References

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Zod Validation](https://zod.dev/)
- [Sanity CMS](https://www.sanity.io/)
- [Contentful](https://www.contentful.com/)

## Decision Date

2024-01-15

## Decision Makers

- Development Team
- Product Owner
- Content Editor (Photographer)
