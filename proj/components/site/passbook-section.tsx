import Image from 'next/image'
import { PhoneCall, QrCode, Smartphone } from 'lucide-react'
import { DemoBadge, Reveal, SectionHeading } from './primitives'
import { PassbookPhone } from './passbook-phone'

const CHANNELS = [
  {
    icon: Smartphone,
    title: 'In the app',
    body: 'Large numbers, familiar icons and a single tap to hear the record read aloud in her own language.',
  },
  {
    icon: QrCode,
    title: 'Assisted QR symbol cards',
    body: 'A printed card with pictures and a QR code. A leader or JanAI Café volunteer scans it to play her record.',
  },
  {
    icon: PhoneCall,
    title: 'IVR phone line',
    body: 'Works on a basic keypad phone: call, press a number, and listen to pieces and earnings.',
  },
]

export function PassbookSection() {
  return (
    <section id="passbook" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-2">
        <div className="relative order-2 mx-auto h-[640px] w-full max-w-[520px] lg:order-1">
          <div className="absolute inset-y-10 left-0 w-[70%] overflow-hidden rounded-[32px]">
            <Image
              src="/images/hands.png"
              alt="A woman's hands holding a basic Android phone above a stack of handmade jute bags"
              fill
              sizes="(min-width: 1024px) 360px, 70vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-forest/20" />
          </div>
          <div className="absolute top-0 right-0">
            <PassbookPhone variant="full" />
          </div>
          <DemoBadge className="absolute bottom-0 left-4 bg-ivory" />
        </div>

        <div className="order-1 flex flex-col gap-10 lg:order-2">
          <SectionHeading
            eyebrow="Acoustic Passbook"
            title={
              <>
                Every woman can see it. <span className="italic text-terracotta">Every woman can hear it.</span>
              </>
            }
            intro="The Acoustic Passbook is each member's own record of the pieces she completed, the rate she agreed to, and what she has earned — readable at a glance and audible in her language, whether or not she reads comfortably."
          />

          <Reveal delay={0.1}>
            <ul className="flex flex-col divide-y divide-forest/10 border-y border-forest/10">
              {CHANNELS.map(({ icon: Icon, title, body }) => (
                <li key={title} className="group flex gap-5 py-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-forest/15 text-forest transition-colors group-hover:bg-forest group-hover:text-ivory">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-forest">{title}</h3>
                    <p className="mt-1 leading-relaxed text-ink/70">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <p className="text-sm text-ink/55">
            Tap <span className="font-semibold text-forest">Listen in your language</span> on the phone to try a simulated playback with a
            live transcript (shown here in Kannada as an example). No real recording is used in this prototype.
          </p>
        </div>
      </div>
    </section>
  )
}
