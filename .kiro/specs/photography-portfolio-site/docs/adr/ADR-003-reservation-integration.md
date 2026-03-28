# ADR-003: Reservation Integration Strategy

## Status

Accepted

## Context

We need to choose how to handle service bookings/reservations for the photography portfolio site. The main options are:

1. **External Booking System**: Link to Naver Booking (or similar)
2. **Custom Booking System**: Build in-house booking functionality
3. **Embedded Widget**: Embed third-party booking widget
4. **Hybrid Approach**: Simple inquiry form + external booking

### Requirements

- Enable visitors to book photography services
- Handle scheduling and calendar management
- Process payments securely
- Send booking confirmations
- Manage booking modifications/cancellations
- Low maintenance overhead
- Quick MVP launch

### Constraints

- Limited development resources
- Budget-conscious MVP
- Korean market (Naver ecosystem important)
- Photographer already uses Naver Booking
- No PCI compliance infrastructure
- No existing booking system

## Decision

We will use **External Link to Naver Booking** for all service reservations.

## Rationale

### Why External Naver Booking?

1. **Zero Development Time**:
   - No booking system to build
   - No calendar integration needed
   - No payment processing to implement
   - Can launch immediately

2. **Established Trust**:
   - Naver is trusted in Korean market
   - Users familiar with Naver ecosystem
   - Reduces friction for Korean customers
   - Established payment methods

3. **Feature Complete**:
   - Calendar management
   - Payment processing
   - Booking confirmations
   - Modification/cancellation handling
   - SMS notifications
   - Review system

4. **No Maintenance**:
   - Naver handles all updates
   - No security vulnerabilities to patch
   - No PCI compliance requirements
   - No server infrastructure needed

5. **Cost**:
   - Zero development cost
   - Naver Booking fees only (per transaction)
   - No hosting costs for booking system
   - No payment gateway fees

6. **Existing Usage**:
   - Photographer already uses Naver Booking
   - Existing customer base on platform
   - No migration needed
   - Familiar workflow

### Why Not Custom Booking System?

- **Development time**: 2-4 weeks minimum
- **Complexity**: Calendar, payments, notifications
- **Maintenance**: Ongoing updates and bug fixes
- **Security**: PCI compliance for payments
- **Cost**: Development + hosting + payment gateway
- **Risk**: Building complex system from scratch

### Why Not Embedded Widget?

- **Limited customization**: Widget styling constraints
- **Performance**: Additional JavaScript to load
- **User experience**: Iframe or popup experience
- **Dependency**: Still dependent on third-party
- **No clear advantage**: Over simple link

### Why Not Hybrid Approach?

- **Confusion**: Two paths to booking
- **Complexity**: Managing both systems
- **Inconsistency**: Different booking experiences
- **Unnecessary**: Naver Booking handles inquiries too

## Implementation

### Booking CTA on Service Pages

```typescript
// components/services/booking-cta.tsx
'use client';

interface BookingCTAProps {
  bookingUrl: string;
  serviceName: string;
}

export function BookingCTA({ bookingUrl, serviceName }: BookingCTAProps) {
  const handleClick = () => {
    // Track analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'booking_click', {
        event_category: 'conversion',
        event_label: serviceName,
        value: bookingUrl,
      });
    }
  };
  
  return (
    <a
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
    >
      Book Now on Naver
      <ExternalLinkIcon className="ml-2 w-5 h-5" />
    </a>
  );
}
```

### Service Content Schema

```typescript
interface ShootService {
  // ... other fields
  bookingUrl: string;  // Naver Booking URL
}
```

### Booking Guidance

```typescript
// components/services/booking-guidance.tsx
export function BookingGuidance() {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">How to Book</h3>
      <ol className="space-y-3 list-decimal list-inside">
        <li>Click the "Book Now" button above</li>
        <li>You'll be redirected to our Naver Booking page</li>
        <li>Select your preferred date and time</li>
        <li>Complete the booking form with your details</li>
        <li>Confirm your booking and receive confirmation email</li>
      </ol>
    </div>
  );
}
```

### Analytics Tracking

```typescript
// Track booking clicks
gtag('event', 'booking_click', {
  event_category: 'conversion',
  event_label: serviceName,
  value: bookingUrl,
});

// Track booking CTA views
gtag('event', 'booking_cta_view', {
  event_category: 'engagement',
  event_label: serviceName,
});
```

## Consequences

### Positive

- ✅ Zero development time for booking system
- ✅ Established trust with Naver brand
- ✅ Feature-complete booking experience
- ✅ No maintenance overhead
- ✅ No PCI compliance requirements
- ✅ Familiar to Korean users
- ✅ Existing customer base
- ✅ SMS notifications included
- ✅ Payment processing handled
- ✅ Can launch immediately

### Negative

- ❌ No control over booking UX
- ❌ External dependency on Naver
- ❌ User leaves site to book
- ❌ Limited customization
- ❌ Naver Booking fees per transaction
- ❌ No direct access to booking data
- ❌ Cannot customize booking flow

### Mitigations

1. **User Leaves Site**:
   - Clear communication about redirect
   - Open in new tab (preserves portfolio site)
   - Provide booking guidance on site
   - Track clicks for conversion metrics

2. **Limited Customization**:
   - Acceptable for MVP
   - Focus on driving traffic to booking page
   - Optimize portfolio site for conversion
   - Can build custom system later if needed

3. **No Booking Data**:
   - Track booking clicks in analytics
   - Naver provides booking dashboard
   - Sufficient for MVP
   - Can integrate API later if needed

4. **Naver Dependency**:
   - Acceptable risk for MVP
   - Naver is stable platform
   - Can migrate later if needed
   - Have contact form as backup

## User Experience Flow

```
Portfolio Site → Service Detail Page → 
"Book Now" CTA → Naver Booking Page → 
Complete Booking → Confirmation Email
```

### Optimization Points

1. **Clear CTA**: Prominent "Book Now" button
2. **Booking Guidance**: Explain process before redirect
3. **Trust Signals**: Mention Naver for credibility
4. **Sticky CTA**: Mobile sticky button for easy access
5. **Analytics**: Track all booking clicks

## Alternative Booking Options

### Contact Form as Backup

Provide contact form for users who:
- Have questions before booking
- Want custom packages
- Prefer email communication
- Have issues with Naver Booking

```typescript
// On service detail page
<div className="space-y-4">
  <BookingCTA bookingUrl={service.bookingUrl} serviceName={service.title} />
  <p className="text-sm text-gray-600">
    Have questions?{' '}
    <a href="/contact" className="text-blue-600 hover:underline">
      Contact us
    </a>
  </p>
</div>
```

## Future Considerations

### When to Build Custom Booking System

Consider custom booking system when:
- Naver Booking fees become significant (> $500/month)
- Need custom booking workflows
- Want to own customer data
- Need integration with other systems
- Expanding beyond Korean market

### Custom Booking System Requirements

If building custom system:
- Calendar management (Google Calendar API)
- Payment processing (Stripe, Toss Payments)
- Email notifications (Resend, SendGrid)
- SMS notifications (Twilio)
- Booking dashboard
- Cancellation/modification handling
- Time zone support
- Availability management

### Estimated Custom System Cost

- Development time: 4-6 weeks
- Payment gateway: 2.9% + $0.30 per transaction
- SMS service: $0.01-0.05 per message
- Email service: $0-20/month
- Hosting: Included in Vercel
- Maintenance: Ongoing

### Naver Booking API Integration (Future)

Naver provides API for:
- Fetching booking data
- Displaying availability
- Embedding booking widget

Could integrate API to:
- Show availability on site
- Display upcoming bookings
- Sync with internal calendar

## Alternatives Considered

### Calendly Integration

Use Calendly for scheduling.

**Rejected because**:
- No payment processing
- Less familiar to Korean users
- Additional service to manage
- Naver Booking more feature-complete
- Photographer already uses Naver

### Custom Simple Booking Form

Build simple form that emails booking requests.

**Rejected because**:
- Manual booking confirmation needed
- No payment processing
- No calendar integration
- Poor user experience
- More work than Naver Booking link

### Embedded Naver Booking Widget

Embed Naver Booking widget on site.

**Rejected because**:
- Limited customization
- Performance impact (additional JavaScript)
- Iframe security concerns
- No clear UX advantage over link
- More complex implementation

## Monitoring and Optimization

### Metrics to Track

1. **Booking CTA Clicks**: Track all booking button clicks
2. **Conversion Rate**: % of service page views → booking clicks
3. **Drop-off**: Users who click but don't complete booking
4. **Alternative Contact**: Users who use contact form instead

### Optimization Strategies

1. **A/B Test CTA Copy**: "Book Now" vs "Reserve Your Session"
2. **A/B Test CTA Color**: Blue vs Green vs Red
3. **A/B Test CTA Placement**: Hero vs After Details
4. **Add Social Proof**: Testimonials near booking CTA
5. **Reduce Friction**: Clear booking guidance

## References

- [Naver Booking](https://booking.naver.com/)
- [External Link Best Practices](https://web.dev/external-anchors-use-rel-noopener/)
- [Conversion Optimization](https://cxl.com/blog/conversion-optimization/)

## Decision Date

2024-01-15

## Decision Makers

- Development Team
- Product Owner
- Photographer (Content Owner)

## Review Date

Review this decision after 3 months of operation:
- Analyze booking conversion rates
- Gather user feedback
- Assess Naver Booking fees
- Evaluate need for custom system
