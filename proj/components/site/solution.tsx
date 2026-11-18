'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Camera, Gauge, HandCoins, Radar, Users } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Reveal, SectionHeading } from './primitives'

const STEPS = [
  {
    n: '01',
    icon: Camera,
    title: 'Capture the Order',
    body: 'The leader records a 60-second voice and photo/video walkthrough of a Golden Sample — the reference piece every member will match.',
    agent: 'Intake & Cost Agent',
    preview: (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 rounded-xl bg-forest-deep/40 p-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-terracotta text-ivory">
            <Camera className="size-4" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold">Golden Sample · Jute tote</p>
            <p className="text-xs text-ivory/60">Recording 0:42 / 1:00</p>
          </div>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-ivory/15">
          <div className="h-full w-[70%] bg-terracotta" />
        </div>
        <p className="text-xs text-ivory/60">“Double stitching on the handle, inner pocket, 14 × 16 inches…”</p>
      </div>
    ),
  },
  {
    n: '02',
    icon: Gauge,
    title: 'Price with Confidence',
    body: 'The Intake & Cost Agent estimates materials, time and margin, then shows Green / Amber / Red guidance before anyone says yes.',
    agent: 'Intake & Cost Agent',
    preview: (
      <div className="flex flex-col gap-2">
        {[
          { price: '₹42', tone: 'bg-red-400', label: 'Red · loss after materials' },
          { price: '₹52', tone: 'bg-amber-400', label: 'Amber · thin margin' },
          { price: '₹60', tone: 'bg-emerald-400', label: 'Green · fair margin' },
        ].map((r) => (
          <div key={r.price} className="flex items-center gap-3 rounded-xl bg-forest-deep/40 px-3 py-2.5">
            <span className={cn('size-2.5 rounded-full', r.tone)} />
            <span className="font-serif text-lg tabular-nums">{r.price}</span>
            <span className="text-xs text-ivory/70">{r.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: '03',
    icon: Users,
    title: 'Distribute Work Fairly',
    body: 'The system checks group capacity, locks the agreed per-piece rate, and distributes bundles using Fairness Memory across past orders.',
    agent: 'Intake & Cost Agent',
    preview: (
      <div className="grid grid-cols-5 gap-1.5">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="flex aspect-square flex-col items-center justify-center rounded-lg bg-forest-deep/40 text-[10px]">
            <span className="font-semibold tabular-nums">{40 + ((i * 3) % 5)}</span>
            <span className="text-ivory/50">pcs</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: '04',
    icon: Radar,
    title: 'Respond Before Problems Grow',
    body: 'The Pulse & Rescue Agent spots delays, simulates deadline impact and proposes peer reassignment — only with explicit consent.',
    agent: 'Pulse & Rescue Agent',
    preview: (
      <div className="flex flex-col gap-2 rounded-xl bg-forest-deep/40 p-3">
        <p className="text-xs font-semibold text-terracotta">Delay detected · bundle B-07</p>
        <p className="text-sm">At current pace, delivery slips by ~1 day.</p>
        <p className="text-xs text-ivory/60">Proposal ready: move 12 pieces to an available peer. Needs 2 consents.</p>
      </div>
    ),
  },
  {
    n: '05',
    icon: HandCoins,
    title: 'Transparent Settlement',
    body: 'The Passbook & Governance Agent keeps every individual record and supports a group-approved payout decision.',
    agent: 'Passbook & Governance Agent',
    preview: (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between rounded-xl bg-forest-deep/40 px-3 py-2.5 text-sm">
          <span>Member confirmations</span>
          <span className="tabular-nums">13 / 14</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-forest-deep/40 px-3 py-2.5 text-sm">
          <span>Group vote to release</span>
          <span className="tabular-nums">11 yes · 0 no</span>
        </div>
        <p className="text-xs text-ivory/60">Payout stays locked until the group approves.</p>
      </div>
    ),
  },
]

export function Solution() {
  const [active, setActive] = useState(0)
  const step = STEPS[active]

  return (
    <section id="solution" className="relative overflow-hidden bg-forest-deep py-24 text-ivory md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#F8F6EF_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          tone="light"
          eyebrow="Our Solution"
          title={
            <>
              One connected system. <span className="italic text-terracotta">From the first quote</span> to the final payout.
            </>
          }
          intro="SamaPalu brings every stage of a bulk order into a single, voice-first workflow — so the leader isn't the only one holding the plan, and every member can follow her own share."
        />

        <div id="how-it-works" className="mt-16 grid scroll-mt-28 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <ol className="relative flex flex-col" role="tablist" aria-label="Order stages" aria-orientation="vertical">
            <span className="absolute top-10 bottom-10 left-[23px] w-px bg-ivory/15" aria-hidden>
              <motion.span
                className="block h-full w-px origin-top bg-terracotta"
                initial={false}
                animate={{ scaleY: active / (STEPS.length - 1) }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
            {STEPS.map((s, i) => {
              const isActive = i === active
              const Icon = s.icon
              return (
                <li key={s.n} className="relative">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="stage-panel"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      'group flex w-full items-start gap-5 rounded-2xl py-4 pr-4 text-left transition-colors focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:outline-none',
                    )}
                  >
                    <span
                      className={cn(
                        'relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                        isActive
                          ? 'border-terracotta bg-terracotta text-ivory'
                          : i < active
                            ? 'border-terracotta/60 bg-forest-deep text-terracotta'
                            : 'border-ivory/20 bg-forest-deep text-ivory/60',
                      )}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="flex flex-col gap-1.5 pt-1">
                      <span className="text-xs font-semibold tracking-[0.18em] text-ivory/40">{s.n}</span>
                      <span
                        className={cn(
                          'font-serif text-2xl transition-colors md:text-3xl',
                          isActive ? 'text-ivory' : 'text-ivory/55 group-hover:text-ivory/80',
                        )}
                      >
                        {s.title}
                      </span>
                      <span
                        className={cn(
                          'grid transition-all duration-500',
                          isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                        )}
                      >
                        <span className="overflow-hidden leading-relaxed text-ivory/70">{s.body}</span>
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div id="stage-panel" role="tabpanel" className="rounded-3xl border border-ivory/10 bg-forest p-6 shadow-2xl md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-serif text-6xl leading-none text-terracotta/80">{step.n}</span>
                <span className="rounded-full border border-ivory/15 px-3 py-1 text-[11px] font-semibold text-sage">
                  {step.agent}
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="min-h-[220px]"
                >
                  <p className="mb-4 font-serif text-2xl">{step.title}</p>
                  {step.preview}
                </motion.div>
              </AnimatePresence>
              <div className="mt-6 flex items-center justify-between border-t border-ivory/10 pt-5">
                <span className="text-[11px] uppercase tracking-[0.16em] text-ivory/40">Illustrative interface</span>
                <div className="flex gap-1.5">
                  {STEPS.map((s, i) => (
                    <button
                      key={s.n}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Show stage ${s.n}`}
                      className={cn('h-1.5 rounded-full transition-all', i === active ? 'w-6 bg-terracotta' : 'w-1.5 bg-ivory/25')}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
