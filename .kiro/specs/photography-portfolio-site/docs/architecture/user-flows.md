# User Flows

## Primary User Flows

### Flow 1: Portfolio Browse → Inquiry

**Goal**: Visitor views portfolio work and submits inquiry

```mermaid
graph TD
    A[Land on Home Page] --> B[Click 'View Portfolio']
    B --> C[Portfolio List Page]
    C --> D{Filter by Category?}
    D -->|Yes| E[Select Category Filter]
    E --> F[View Filtered Results]
    D -->|No| F
    F --> G[Click Portfolio Item]
    G --> H[Portfolio Detail Page]
    H --> I[View Images & Description]
    I --> J[Click 'Contact About This Work']
    J --> K[Contact Page]
    K --> L[Fill Contact Form]
    L --> M[Submit Form]
    M --> N{Validation}
    N -->|Pass| O[Show Success Message]
    N -->|Fail| P[Show Errors]
    P --> L
    O --> Q[End: Inquiry Submitted]
```

**Steps**:
1. Visitor lands on home page
2. Clicks "View Portfolio" CTA
3. Arrives at portfolio list page
4. (Optional) Filters by category
5. Clicks on portfolio item of interest
6. Views portfolio detail page with images and description
7. Clicks "Contact About This Work" CTA
8. Fills out contact form (name, email, phone, message)
9. Submits form
10. Sees success confirmation

**Success Criteria**:
- Form successfully submitted
- Visitor sees confirmation message
- Inquiry data captured for follow-up

### Flow 2: Service Browse → Booking

**Goal**: Visitor learns about service and books via Naver

```mermaid
graph TD
    A[Land on Home Page] --> B[Click 'Services']
    B --> C[Services List Page]
    C --> D[Click Service Card]
    D --> E[Service Detail Page]
    E --> F[Read Description & Pricing]
    F --> G[View Sample Images]
    G --> H[Click 'Book Now' CTA]
    H --> I[Redirect to Naver Booking]
    I --> J[Complete Booking on Naver]
    J --> K[End: Booking Completed]
```

**Steps**:
1. Visitor lands on home page
2. Clicks "Services" in navigation or service CTA
3. Arrives at services list page
4. Clicks on service of interest
5. Views service detail page
6. Reads description, pricing, deliverables
7. Views sample images
8. Clicks "Book Now" CTA
9. Redirected to external Naver Booking page
10. Completes booking on Naver platform

**Success Criteria**:
- Visitor clicks booking CTA
- Successfully redirected to Naver Booking
- Analytics tracks booking click

### Flow 3: Direct Contact

**Goal**: Visitor submits general inquiry

```mermaid
graph TD
    A[Land on Any Page] --> B[Click 'Contact' in Nav]
    B --> C[Contact Page]
    C --> D[Fill Contact Form]
    D --> E[Submit Form]
    E --> F{Validation}
    F -->|Pass| G[Show Success Message]
    F -->|Fail| H[Show Errors]
    H --> D
    G --> I[End: Inquiry Submitted]
```

**Steps**:
1. Visitor on any page
2. Clicks "Contact" in navigation
3. Arrives at contact page
4. Fills out contact form
5. Submits form
6. Sees success or error message

**Success Criteria**:
- Form successfully submitted
- Visitor sees confirmation
- Form data preserved on error

### Flow 4: Mobile Navigation

**Goal**: Mobile visitor navigates site

```mermaid
graph TD
    A[Land on Home Page - Mobile] --> B[Tap Hamburger Menu]
    B --> C[Menu Slides Open]
    C --> D[Tap Navigation Link]
    D --> E[Navigate to Page]
    E --> F[Menu Auto-Closes]
    F --> G[View Page Content]
```

**Steps**:
1. Visitor lands on home page (mobile)
2. Taps hamburger menu icon
3. Menu slides open
4. Taps navigation link
5. Navigates to selected page
6. Menu automatically closes
7. Views page content

**Success Criteria**:
- Menu opens smoothly
- Navigation works correctly
- Menu closes after selection

## Secondary User Flows

### Flow 5: Social Media Discovery

**Goal**: Visitor discovers site via social media

```mermaid
graph TD
    A[See Post on Instagram] --> B[Click Link in Bio]
    B --> C[Land on Home Page]
    C --> D[View Featured Work]
    D --> E{Interested?}
    E -->|Yes| F[Click Portfolio/Services]
    E -->|No| G[Click Instagram Link]
    G --> H[Return to Instagram]
```

### Flow 6: Search Engine Discovery

**Goal**: Visitor finds site via search

```mermaid
graph TD
    A[Search 'Wedding Photographer Seoul'] --> B[See Site in Results]
    B --> C[Click Search Result]
    C --> D[Land on Service Detail Page]
    D --> E[View Service Information]
    E --> F[Click Book Now]
    F --> G[Redirect to Naver Booking]
```

### Flow 7: FAQ Consultation

**Goal**: Visitor seeks information before booking

```mermaid
graph TD
    A[On Service Detail Page] --> B[Click FAQ Link]
    B --> C[FAQ Page]
    C --> D[Read FAQs]
    D --> E{Questions Answered?}
    E -->|Yes| F[Return to Service Page]
    F --> G[Click Book Now]
    E -->|No| H[Click Contact]
    H --> I[Submit Inquiry]
```

### Flow 8: Portfolio Category Filtering

**Goal**: Visitor finds specific type of work

```mermaid
graph TD
    A[Portfolio List Page] --> B[Click Category Filter]
    B --> C[URL Updates with Query Param]
    C --> D[Portfolio Grid Filters]
    D --> E[View Filtered Results]
    E --> F{Found Desired Work?}
    F -->|Yes| G[Click Portfolio Item]
    F -->|No| H[Try Different Category]
    H --> B
```

## Error Flows

### Flow 9: Form Validation Error

```mermaid
graph TD
    A[Fill Contact Form] --> B[Submit with Missing Fields]
    B --> C[Client-Side Validation]
    C --> D[Show Inline Errors]
    D --> E[Highlight Invalid Fields]
    E --> F[User Corrects Errors]
    F --> G[Submit Again]
    G --> H[Validation Passes]
    H --> I[Form Submitted]
```

### Flow 10: Network Error

```mermaid
graph TD
    A[Submit Contact Form] --> B[Network Request]
    B --> C{Request Success?}
    C -->|No| D[Show Error Message]
    D --> E[Preserve Form Data]
    E --> F[User Retries]
    F --> B
    C -->|Yes| G[Show Success Message]
```

### Flow 11: 404 Error

```mermaid
graph TD
    A[Click Broken Link] --> B[404 Page Loads]
    B --> C[See Error Message]
    C --> D[See Navigation Links]
    D --> E[Click Link to Main Section]
    E --> F[Navigate to Valid Page]
```

## Conversion Paths

### High-Intent Path (Direct Booking)

```
Home → Services → Service Detail → Book Now (Naver) → Booking Complete
```

**Optimization Points**:
- Clear service CTAs on home page
- Prominent "Book Now" button on service detail
- Sticky booking CTA on mobile
- Booking guidance to reduce friction

### Medium-Intent Path (Portfolio → Inquiry)

```
Home → Portfolio → Portfolio Detail → Contact → Form Submit → Follow-up
```

**Optimization Points**:
- Featured portfolio on home page
- Clear inquiry CTAs on portfolio details
- Simple contact form (minimal fields)
- Immediate confirmation message

### Low-Intent Path (Browse → Social Follow)

```
Home → Portfolio → About → Instagram Link → Follow
```

**Optimization Points**:
- Visible social links in header/footer
- Instagram feed integration (future)
- Consistent brand voice across platforms

## Mobile-Specific Flows

### Mobile Portfolio Browse

```
Home (Mobile) → Hamburger Menu → Portfolio → 
Vertical Scroll → Tap Item → Swipe Gallery → 
Tap Contact CTA → Fill Form → Submit
```

**Mobile Optimizations**:
- Thumb-friendly tap targets (44x44px minimum)
- Vertical scrolling (natural mobile gesture)
- Swipe gestures for image galleries
- Sticky CTAs for easy access
- Auto-close menu after navigation

### Mobile Service Booking

```
Home (Mobile) → Services Card → Service Detail → 
Scroll to Pricing → Tap Sticky Book CTA → 
External Redirect → Naver Booking App
```

**Mobile Optimizations**:
- Sticky booking CTA always visible
- Large, prominent CTA button
- Clear pricing information above fold
- Seamless handoff to Naver app

## Analytics Tracking Points

Each flow includes tracking at key decision points:

1. **Page Views**: Track all page loads
2. **CTA Clicks**: Track all conversion actions
3. **Form Interactions**: Track form starts and completions
4. **External Links**: Track Naver Booking and social clicks
5. **Filter Usage**: Track category filter selections
6. **Error Events**: Track validation and network errors

## Flow Metrics

### Success Metrics

- **Conversion Rate**: % of visitors who click booking CTA
- **Inquiry Rate**: % of visitors who submit contact form
- **Bounce Rate**: % of visitors who leave without interaction
- **Time on Page**: Average time spent on portfolio/service pages
- **Filter Usage**: % of portfolio visitors who use filters

### Performance Metrics

- **Page Load Time**: Time to interactive for each page
- **Form Submission Time**: Time from form start to completion
- **Error Rate**: % of form submissions that fail
- **Mobile vs Desktop**: Conversion rate comparison
