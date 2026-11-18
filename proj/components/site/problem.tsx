import { Calculator, MessagesSquare, ScanSearch, Scale } from 'lucide-react'
import { Reveal, SectionHeading } from './primitives'

const PROBLEMS = [
  {
    n: '01',
    icon: Calculator,
    title: 'Guesswork pricing',
    body: 'Groups risk accepting orders without a clear picture of material, labour and profit — and only learn the margin once the work is done.',
    vignette: '“₹40 a bag sounds fine…” — but thread, zips and 3 extra hours were never counted.',
  },
  {
    n: '02',
    icon: MessagesSquare,
    title: 'Manual coordination',
    body: 'Assignments happen verbally and progress lives in paper registers, so the leader carries the whole order in her head.',
    vignette: 'One notebook. Fifteen names. Counts updated whenever someone remembers.',
  },
  {
    n: '03',
    icon: ScanSearch,
    title: 'Late quality checks',
    body: 'Defects and delays often surface only near delivery, when there is no time left to recover without rushing everyone.',
    vignette: 'The buyer arrives on Friday. The faulty batch is discovered on Thursday night.',
  },
  {
    n: '04',
    icon: Scale,
    title: 'Unclear payments',
    body: 'Rough calculations at the end of an order can leave members unsure of what they earned — and quietly erode trust.',
    vignette: '“Why did I get less?” is a hard question to answer without a record.',
  },
]

export function Problem() {
  return (
    <section id="problem" className="relative border-t border-forest/10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <SectionHeading eyebrow="The Problem" title="Great work deserves better systems." />
          <Reveal delay={0.1}>
            <p className="max-w-xl text-lg leading-relaxed text-ink/70 text-pretty lg:ml-auto">
              Self-Help Groups already have the skill, the discipline and the collective spirit. What they often lack are
              tools built for how they actually work — so careful effort gets lost in guesswork.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-forest/10 bg-forest/10 md:grid-cols-2">
          {PROBLEMS.map(({ n, icon: Icon, title, body, vignette }, i) => (
            <Reveal key={n} delay={i * 0.06} className="group relative flex flex-col gap-6 bg-ivory p-8 transition-colors hover:bg-card md:p-10">
              <div className="flex items-start justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl border border-forest/15 bg-sage/60 text-forest transition-transform group-hover:-rotate-6">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-serif text-5xl leading-none text-forest/10 transition-colors group-hover:text-terracotta/30">
                  {n}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-2xl text-forest md:text-3xl">{title}</h3>
                <p className="leading-relaxed text-ink/70">{body}</p>
              </div>
              <p className="mt-auto border-l-2 border-terracotta/60 pl-4 font-serif text-[15px] italic leading-snug text-ink/60">
                {vignette}
              </p>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink/50">Scenarios above are illustrative, not drawn from a specific group.</p>
      </div>
    </section>
  )
}
