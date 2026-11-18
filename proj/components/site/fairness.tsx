import { History, Lock, PackageSearch, Vote } from 'lucide-react'
import { Reveal, SectionHeading } from './primitives'

const PRINCIPLES = [
  {
    icon: History,
    title: 'Fairness Memory',
    body: 'Rotates work priority across orders, so the same members aren’t always first — or always last — in line for bundles.',
    visual: (
      <div className="flex gap-1.5" aria-hidden>
        {['A', 'B', 'C', 'D', 'E'].map((l, i) => (
          <span
            key={l}
            className={`flex size-8 items-center justify-center rounded-full text-xs font-semibold ${i === 2 ? 'bg-terracotta text-ivory' : 'bg-sage text-forest'}`}
          >
            {l}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: Lock,
    title: 'Locked Piece Rates',
    body: 'Every member knows the agreed payment per piece before she starts. The rate cannot quietly change mid-order.',
    visual: (
      <div className="flex items-center gap-2 font-serif text-3xl text-forest" aria-hidden>
        ₹36 <Lock className="size-5 text-terracotta" /> <span className="font-sans text-xs text-ink/50">per piece</span>
      </div>
    ),
  },
  {
    icon: PackageSearch,
    title: 'Supplier-Batch Defect Attribution',
    body: 'Helps tell apart defects caused by a faulty material batch from individual workmanship, so no one is blamed for bad cloth.',
    visual: (
      <div className="flex items-center gap-2 text-xs" aria-hidden>
        <span className="rounded-full bg-terracotta/15 px-2.5 py-1 font-semibold text-terracotta-deep">Batch #J-14 · thread</span>
        <span className="text-ink/50">not member error</span>
      </div>
    ),
  },
  {
    icon: Vote,
    title: 'Democratic Governance',
    body: 'The group decides disputes and approves payouts together. The system shows the evidence; people make the call.',
    visual: (
      <div className="flex items-center gap-1" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={`h-6 w-2 rounded-full ${i < 10 ? 'bg-forest' : 'bg-sage'}`} />
        ))}
        <span className="ml-2 text-xs text-ink/50">10 of 12 approve</span>
      </div>
    ),
  },
]

export function Fairness() {
  return (
    <section id="about" className="relative border-t border-forest/10 bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Fairness by design"
              title={
                <>
                  Technology should support decisions, <span className="italic text-terracotta">not take away people&apos;s voices.</span>
                </>
              }
              intro="SamaPalu means “Fair Share” in Kannada. Fairness isn't a settings toggle — it's built into how work is assigned, how it's paid, and who has the final word."
            />
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-forest/10 bg-forest/10 sm:grid-cols-2">
            {PRINCIPLES.map(({ icon: Icon, title, body, visual }, i) => (
              <Reveal key={title} delay={i * 0.06} className="flex flex-col gap-5 bg-ivory p-7 md:p-8">
                <Icon className="size-6 text-terracotta" aria-hidden />
                <h3 className="font-serif text-2xl leading-tight text-forest">{title}</h3>
                <p className="leading-relaxed text-ink/70">{body}</p>
                <div className="mt-auto pt-4">{visual}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
