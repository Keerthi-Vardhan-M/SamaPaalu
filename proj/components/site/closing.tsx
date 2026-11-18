import { ArrowRight } from 'lucide-react'
import { Logo, LogoMark } from './logo'
import { Reveal } from './primitives'
import { NAV_LINKS } from './nav-links'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-forest-deep py-28 text-ivory md:py-40">
      <div className="pointer-events-none absolute -right-40 -bottom-40 opacity-[0.07]" aria-hidden>
        <LogoMark tone="light" className="size-[640px]" />
      </div>
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-5 text-center md:px-8">
        <Reveal>
          <LogoMark tone="light" className="size-14" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl lg:text-7xl">
            Fairness isn&apos;t an extra feature.{' '}
            <span className="italic text-terracotta">It&apos;s how work should work.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-lg leading-relaxed text-ivory/70 text-pretty">
            SamaPalu brings clarity, coordination and accountability to every order — so every member&apos;s contribution is
            recognised.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <a
            href="#experience"
            className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-4 font-semibold text-ivory shadow-[0_20px_40px_-15px_rgba(199,123,91,0.7)] transition-all hover:bg-terracotta-deep"
          >
            Explore the SamaPalu experience
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-ivory">
      <div className="mx-auto max-w-7xl border-t border-ivory/10 px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-3">
            <Logo tone="light" />
            <p className="font-serif text-lg italic text-sage/80">Fair Share. Stronger Together.</p>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-ivory/40">Navigate</p>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-ivory/70 hover:text-ivory">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2 text-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-ivory/40">Product</p>
            <a href="#solution" className="text-ivory/70 hover:text-ivory">Product overview</a>
            <a href="#technology" className="text-ivory/70 hover:text-ivory">Technology</a>
            <a href="#experience" className="text-ivory/70 hover:text-ivory">Consent-based swaps</a>
            <a href="#passbook" className="text-ivory/70 hover:text-ivory">Acoustic Passbook</a>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-ivory/40">Contact</p>
            <p className="text-ivory/60">Contact details coming soon.</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-xs text-ivory/45 md:flex-row md:justify-between">
          <p>Concept prototype. Some workflows and integrations are demonstrated using simulated data.</p>
          <p>
            SamaPalu · <span lang="kn" className="font-kannada">ಸಮಪಾಲು</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
