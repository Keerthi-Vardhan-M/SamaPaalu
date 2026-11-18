import { Building2, Crown, Truck, UserRound } from 'lucide-react'
import { Reveal, SectionHeading } from './primitives'

const GROUPS = [
  {
    icon: Crown,
    who: 'SHG Leaders',
    what: 'Better planning, pricing, allocation and oversight — without carrying the whole order in a notebook.',
  },
  {
    icon: UserRound,
    who: 'SHG Members',
    what: 'Transparent individual records, fair work allocation and earnings she can see and hear for herself.',
  },
  {
    icon: Truck,
    who: 'Bulk Buyers',
    what: 'Better visibility into order readiness and delivery reliability, before the truck is booked.',
  },
  {
    icon: Building2,
    who: 'Federations / JanAI Cafés',
    what: 'Assisted onboarding and operational support for groups getting started with digital tools.',
  },
]

export function Beneficiaries() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Who benefits" title="Clarity for everyone around the order." />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map(({ icon: Icon, who, what }, i) => (
            <Reveal
              key={who}
              delay={i * 0.06}
              className="group flex flex-col gap-10 rounded-3xl border border-forest/10 bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-forest/25 hover:shadow-[0_30px_50px_-35px_rgba(16,43,37,0.5)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-sage text-forest transition-colors group-hover:bg-forest group-hover:text-ivory">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-xs font-semibold text-ink/30">0{i + 1}</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-2xl text-forest">{who}</h3>
                <p className="leading-relaxed text-ink/70">{what}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BusinessModel() {
  return (
    <section className="border-t border-forest/10 bg-sage/40 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <SectionHeading
          eyebrow="Proposed business model"
          title={
            <>
              Aligned incentives. <span className="italic text-terracotta">Shared value.</span>
            </>
          }
          intro="The people doing the work should never be the ones paying for the tool. The model below is a proposal under exploration, not an established price."
        />

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl border border-forest/10 bg-ivory">
            <div className="grid divide-y divide-forest/10 md:grid-cols-3 md:divide-x md:divide-y-0">
              <div className="flex flex-col gap-3 p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-forest/60">SHGs</span>
                <span className="font-serif text-5xl text-forest">Free</span>
                <p className="text-sm leading-relaxed text-ink/70">No cost to groups, initially. Members never pay to see their own record.</p>
              </div>
              <div className="flex flex-col gap-3 bg-forest p-7 text-ivory">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sage/80">Buyers & aggregators</span>
                <span className="font-serif text-5xl">
                  ~2%<sup className="ml-1 align-super text-sm text-terracotta">*</sup>
                </span>
                <p className="text-sm leading-relaxed text-ivory/70">
                  A proposed verified-fulfilment fee, paid only on orders delivered through SamaPalu.
                </p>
              </div>
              <div className="flex flex-col gap-3 p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-forest/60">Federations</span>
                <span className="font-serif text-5xl text-forest">Partners</span>
                <p className="text-sm leading-relaxed text-ink/70">Local support networks help groups onboard and stay supported.</p>
              </div>
            </div>
            <p className="border-t border-forest/10 px-7 py-4 text-xs text-ink/55">
              * Indicative figure for discussion only. Not validated with buyers or groups.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
