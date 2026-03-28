import type { ReactNode } from "react";

import { Section } from "@/components/shared/section";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}

export function PageIntro({ eyebrow, title, description, actions }: PageIntroProps) {
  return (
    <Section className="pt-6 sm:pt-10">
      <div className="space-y-5 border-b border-stone/80 pb-8">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">{eyebrow}</p>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-ink sm:text-4xl">{title}</h1>
          {description ? <p className="max-w-xl text-sm leading-6 text-ink/70 sm:text-base">{description}</p> : null}
        </div>
        {actions ? <div className="mt-6 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
      </div>
    </Section>
  );
}
