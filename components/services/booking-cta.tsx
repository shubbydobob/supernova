import { CTAButton } from "@/components/shared/cta-button";

interface BookingCTAProps {
  bookingUrl: string;
  serviceName: string;
}

export function BookingCTA({ bookingUrl, serviceName }: BookingCTAProps) {
  return (
    <section className="rounded-[1.75rem] border border-stone bg-ink p-6 text-white shadow-card sm:p-8">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Reservation</p>
        <h2 className="text-2xl font-semibold">Reserve {serviceName} through Naver Booking.</h2>
        <p className="text-sm leading-6 text-white/75 sm:text-base">
          Booking stays external by design for this MVP. You will continue to Naver Booking for availability,
          scheduling, and confirmation.
        </p>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <CTAButton href={bookingUrl} external className="bg-white text-ink hover:bg-sand">
          Reserve on Naver
        </CTAButton>
        <CTAButton href="/contact" variant="secondary" className="border-white/20 bg-transparent text-white hover:bg-white/10">
          Ask a question first
        </CTAButton>
      </div>
    </section>
  );
}
