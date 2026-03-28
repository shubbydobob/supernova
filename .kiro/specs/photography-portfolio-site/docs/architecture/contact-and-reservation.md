# Contact and Reservation Flow

## Overview

The system provides two primary conversion paths:
1. **Contact Form**: For general inquiries and portfolio-related questions
2. **Naver Booking**: External reservation system for service bookings

## Contact Form Flow

### User Journey

```
Portfolio/Service Page → Contact CTA → Contact Page → 
Fill Form → Submit → Validation → Server Processing → 
Confirmation Message
```

### Form Implementation

#### Contact Form Component

```typescript
// components/contact/contact-form.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setStatus('loading');
    setErrors({});
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Track analytics event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'contact',
          event_label: 'contact_form',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        disabled={status === 'loading'}
      />
      
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        disabled={status === 'loading'}
      />
      
      <Input
        label="Phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        required
        disabled={status === 'loading'}
      />
      
      <Textarea
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        rows={6}
        required
        disabled={status === 'loading'}
      />
      
      {status === 'error' && (
        <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">
            Failed to submit form. Please try again or contact us directly at{' '}
            <a href="mailto:hello@janedoephotography.com" className="underline">
              hello@janedoephotography.com
            </a>
          </p>
        </div>
      )}
      
      {status === 'success' && (
        <div role="status" className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800">
            Thank you for your message! We'll get back to you within 24 hours.
          </p>
        </div>
      )}
      
      <Button
        type="submit"
        disabled={status === 'loading'}
        isLoading={status === 'loading'}
        className="w-full"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
```

### API Route Handler

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ContactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(5).max(20),
  message: z.string().min(10).max(2000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validated = ContactFormSchema.parse(body);
    
    // Sanitize inputs (basic XSS prevention)
    const sanitized = {
      name: validated.name.trim(),
      email: validated.email.trim().toLowerCase(),
      phone: validated.phone.trim(),
      message: validated.message.trim(),
    };
    
    // Log inquiry (MVP: console, Future: email service)
    console.log('Contact inquiry received:', {
      ...sanitized,
      timestamp: new Date().toISOString(),
    });
    
    // Future: Send email notification
    // await sendEmail({
    //   to: 'hello@janedoephotography.com',
    //   subject: `New inquiry from ${sanitized.name}`,
    //   body: `
    //     Name: ${sanitized.name}
    //     Email: ${sanitized.email}
    //     Phone: ${sanitized.phone}
    //     Message: ${sanitized.message}
    //   `,
    // });
    
    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Email Integration (Future)

#### Recommended Email Services

1. **Resend**: Modern, developer-friendly, generous free tier
2. **SendGrid**: Reliable, well-documented
3. **Postmark**: Transactional email specialist
4. **AWS SES**: Cost-effective for high volume

#### Email Service Integration Example

```typescript
// lib/email.ts (Future implementation)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactNotification(data: ContactFormData) {
  await resend.emails.send({
    from: 'noreply@janedoephotography.com',
    to: 'hello@janedoephotography.com',
    subject: `New inquiry from ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });
}
```

---

## Naver Booking Integration

### Integration Approach

**Decision**: External link integration (no custom booking system)

**Rationale**:
- Naver Booking is established and trusted in Korean market
- Avoids complexity of building custom booking system
- Reduces maintenance burden
- Leverages Naver's payment and scheduling infrastructure

### Booking CTA Implementation

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
      <svg
        className="ml-2 w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}
```

### Sticky Booking CTA (Mobile)

```typescript
// components/services/sticky-booking-cta.tsx
'use client';

import { useEffect, useState } from 'react';

export function StickyBookingCTA({ bookingUrl, serviceName }: BookingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past hero section
      setIsVisible(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
      <BookingCTA bookingUrl={bookingUrl} serviceName={serviceName} />
    </div>
  );
}
```

### Booking Guidance

```typescript
// components/services/booking-guidance.tsx
export function BookingGuidance() {
  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold">How to Book</h3>
      
      <ol className="space-y-3 list-decimal list-inside">
        <li>Click the "Book Now" button above</li>
        <li>You'll be redirected to our Naver Booking page</li>
        <li>Select your preferred date and time</li>
        <li>Complete the booking form with your details</li>
        <li>Confirm your booking and receive confirmation email</li>
      </ol>
      
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Have questions before booking?{' '}
          <a href="/contact" className="text-blue-600 hover:underline">
            Contact us
          </a>{' '}
          or check our{' '}
          <a href="/faq" className="text-blue-600 hover:underline">
            FAQ
          </a>
        </p>
      </div>
    </div>
  );
}
```

---

## Conversion Optimization

### CTA Placement Strategy

#### Service Detail Page

```
┌─────────────────────────────────────┐
│ Service Hero                        │
│ - Service name                      │
│ - Hero image                        │
│ - [Book Now CTA] ← Primary CTA      │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Service Details                     │
│ - Description                       │
│ - Pricing                           │
│ - Duration                          │
│ - Deliverables                      │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Sample Images                       │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Booking Guidance                    │
│ - How to book                       │
│ - [Book Now CTA] ← Secondary CTA    │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Sticky CTA (Mobile)                 │
│ - [Book Now] ← Always visible       │
└─────────────────────────────────────┘
```

#### Portfolio Detail Page

```
┌─────────────────────────────────────┐
│ Portfolio Header                    │
│ - Title, category, date             │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Image Gallery                       │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Description                         │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ CTA Section                         │
│ - "Interested in similar work?"     │
│ - [Contact Us] ← Inquiry CTA        │
└─────────────────────────────────────┘
```

### CTA Copy Guidelines

**Booking CTAs**:
- "Book Now" (primary)
- "Reserve Your Session"
- "Schedule a Consultation"

**Inquiry CTAs**:
- "Get in Touch"
- "Contact About This Work"
- "Ask a Question"

**Principles**:
- Action-oriented language
- Clear value proposition
- Urgency without pressure
- Consistent across pages

### A/B Testing Opportunities (Future)

1. **CTA Button Color**: Test blue vs. green vs. red
2. **CTA Copy**: Test "Book Now" vs. "Reserve Your Session"
3. **CTA Placement**: Test hero vs. after details
4. **Form Length**: Test short vs. detailed contact form
5. **Social Proof**: Test with/without testimonials

---

## Analytics Tracking

### Contact Form Events

```typescript
// Track form interactions
gtag('event', 'form_start', {
  event_category: 'contact',
  event_label: 'contact_form',
});

gtag('event', 'form_submit', {
  event_category: 'contact',
  event_label: 'contact_form',
});

gtag('event', 'form_error', {
  event_category: 'contact',
  event_label: 'contact_form',
  error_type: 'validation',
});
```

### Booking Events

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

### Conversion Funnel

```
Page View (Service Detail) →
Booking CTA View →
Booking CTA Click →
External Redirect (Naver Booking)
```

Track each step to identify drop-off points.

---

## Error Handling

### Contact Form Errors

1. **Validation Errors**: Show inline errors, preserve data
2. **Network Errors**: Show retry option, preserve data
3. **Server Errors**: Show fallback contact info (email, phone)

### Booking Link Errors

1. **Invalid URL**: Log error, show contact form as fallback
2. **External Service Down**: Detect and show alternative contact method

### Fallback Contact Information

Always provide alternative contact methods:

```typescript
// components/contact/contact-fallback.tsx
export function ContactFallback() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-2">Having trouble with the form?</h3>
      <p className="mb-4">You can also reach us directly:</p>
      <ul className="space-y-2">
        <li>
          <strong>Email:</strong>{' '}
          <a href="mailto:hello@janedoephotography.com" className="text-blue-600 hover:underline">
            hello@janedoephotography.com
          </a>
        </li>
        <li>
          <strong>Phone:</strong>{' '}
          <a href="tel:+821012345678" className="text-blue-600 hover:underline">
            +82-10-1234-5678
          </a>
        </li>
      </ul>
    </div>
  );
}
```
