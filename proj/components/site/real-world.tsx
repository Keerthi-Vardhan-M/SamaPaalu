import { CloudOff, FlaskConical, Hash, Mic, QrCode, ShieldCheck, Smartphone, RefreshCw } from 'lucide-react'
import { Reveal, SectionHeading } from './primitives'

const FEATURES = [
  { icon: Mic, title: 'Voice in 20+ Indian languages', body: 'Speak orders and updates in Kannada, Hindi, Tamil, Telugu, Malayalam, Marathi and more; hear answers back.' },
  { icon: CloudOff, title: 'Offline-friendly memory', body: 'Order data stays on the phone and syncs when signal returns.' },
  { icon: Smartphone, title: 'Entry-level Android', body: 'Designed for low-memory phones and small screens.' },
  { icon: Hash, title: 'Keypad-phone IVR', body: 'A voice line fallback for members without smartphones.' },
  { icon: QrCode, title: 'QR symbol cards', body: 'Picture-based cards for assisted, shared-device access.' },
  { icon: ShieldCheck, title: 'Human approval', body: 'Pricing, swaps and payouts always need a person’s yes.' },
  { icon: FlaskConical, title: 'Clearly labelled demos', body: 'Demo data is illustrative, and external integrations are simulated and disclosed.' },
]

export function RealWorld() {
  return (
    <section className="relative overflow-hidden bg-forest py-24 text-ivory md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-10">
            <SectionHeading
              tone="light"
              eyebrow="Built for real-world conditions"
              title={
                <>
                  Designed for the way work <span className="italic text-terracotta">actually happens.</span>
                </>
              }
              intro="Patchy networks, shared phones, mixed literacy and busy households are the starting conditions — not edge cases."
            />
          </div>

          <Reveal>
            <div className="relative rounded-[32px] border border-ivory/10 bg-forest-deep p-6 md:p-8">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-terracotta/20 px-3 py-1 text-xs font-semibold text-terracotta">
                  <CloudOff className="size-3.5" /> Offline · 3 updates saved
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-ivory/50">
                  <RefreshCw className="size-3.5" /> Syncs when online
                </span>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-terracotta">
                  <Mic className="size-6" aria-hidden />
                </span>
                <div className="flex h-14 flex-1 items-center gap-[3px]" aria-hidden>
                  {Array.from({ length: 48 }).map((_, i) => (
                    <span
                      key={i}
                      className="wave-bar w-1 flex-1 rounded-full bg-sage/70"
                      style={{ height: `${25 + ((i * 53) % 75)}%`, animationDelay: `${(i % 9) * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
              <p lang="kn" className="mt-5 font-kannada text-lg text-ivory">“ಇವತ್ತು ಹನ್ನೆರಡು ಚೀಲ ಮುಗಿಸಿದೆ.”</p>
              <p className="text-sm text-ivory/55">“I finished twelve bags today.” — logged to Lakshmi&apos;s passbook</p>

              <div className="mt-8 grid grid-cols-3 gap-2 text-center text-[11px]">
                {['Speak', 'Confirm', 'Recorded'].map((s, i) => (
                  <div key={s} className="rounded-xl border border-ivory/10 px-2 py-3">
                    <span className="block font-serif text-lg text-terracotta">0{i + 1}</span>
                    <span className="text-ivory/70">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className={`flex flex-col gap-3 bg-forest p-6 ${i === FEATURES.length - 1 ? 'lg:col-span-1' : ''}`}>
              <Icon className="size-5 text-terracotta" aria-hidden />
              <h3 className="font-semibold text-ivory">{title}</h3>
              <p className="text-sm leading-relaxed text-ivory/60">{body}</p>
            </li>
          ))}
          <li className="flex items-end bg-forest-deep p-6">
            <p className="font-serif text-xl italic leading-snug text-sage">Low bandwidth. High dignity.</p>
          </li>
        </ul>
      </div>
    </section>
  )
}
