import { Plus } from 'lucide-react'
import { Reveal, SectionHeading } from './primitives'

const FAQS = [
  {
    q: 'Which languages does SamaPalu support?',
    a: 'SamaPalu is designed for voice in 20+ Indian languages, including Kannada, Hindi, Tamil, Telugu, Malayalam and Marathi, so members can speak and listen in the language they are most comfortable with.',
  },
  {
    q: 'Do members need a smartphone?',
    a: 'No. Members can use the app, a printed QR symbol card scanned by a leader or JanAI Café volunteer, or a basic keypad phone through the IVR line.',
  },
  {
    q: 'Does the AI make decisions about money or work?',
    a: 'No. The leader approves quotes, both members must agree before any work is swapped, and the group approves every payout. The AI proposes and explains; people decide.',
  },
  {
    q: 'What happens when the network is patchy?',
    a: 'Order data is kept on the phone and syncs when the signal returns, so groups can keep working in low-connectivity areas.',
  },
  {
    q: 'Is the data on this site real?',
    a: 'No. The numbers, names and scenarios shown here are illustrative demo data, and external integrations such as bank or UPI payouts are simulated and clearly labelled.',
  },
  {
    q: 'Who pays for SamaPalu?',
    a: 'The proposal is that it stays free for SHGs initially, with bulk buyers and aggregators paying a small verified-fulfilment fee on delivered orders. The figure is indicative and has not yet been validated with buyers or groups.',
  },
]

export function Faq() {
  return (
    <section id="faq" className="relative border-t border-forest/10 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.3fr]">
        <SectionHeading eyebrow="FAQ" title="Questions, answered simply." />

        <Reveal delay={0.1}>
          <ul className="flex flex-col divide-y divide-forest/10 border-y border-forest/10">
            {FAQS.map(({ q, a }) => (
              <li key={q}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-lg focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                    <h3 className="font-serif text-xl text-forest">{q}</h3>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-forest/15 text-forest transition-colors group-open:bg-forest group-open:text-ivory">
                      <Plus className="size-4 transition-transform duration-300 group-open:rotate-45" aria-hidden />
                    </span>
                  </summary>
                  <p className="mt-3 max-w-xl leading-relaxed text-ink/70">{a}</p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
