'use client'

import { motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { ArrowRight, ArrowLeftRight, AudioLines, ShieldCheck, Users } from 'lucide-react'
import { DemoBadge, Eyebrow } from './primitives'
import { PassbookPhone } from './passbook-phone'

const TRUST = [
  { icon: AudioLines, label: 'Voice-first in 20+ Indian languages' },
  { icon: Users, label: 'Designed for 10–15 member SHGs' },
  { icon: ShieldCheck, label: 'Human-approved decisions' },
]

const MEMBERS = [
  { name: 'Lakshmi', pct: 86 },
  { name: 'Meena', pct: 41 },
  { name: 'Shobha', pct: 72 },
  { name: 'Roopa', pct: 64 },
]

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease },
        }

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-36 lg:pb-28">
      <div className="grain pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] size-[360px] rounded-full bg-sage/70 blur-3xl sm:size-[640px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="flex flex-col gap-8">
          <motion.div {...fadeUp(0)}>
            <Eyebrow>Fair work. Clear earnings. Stronger collectives.</Eyebrow>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="font-serif text-[44px] leading-[0.98] tracking-tight text-forest text-balance sm:text-6xl lg:text-[78px]"
          >
            Every woman&apos;s work deserves a{' '}
            <span className="relative inline-block italic text-terracotta">
              fair share.
              <svg
                viewBox="0 0 300 20"
                className="absolute -bottom-2 left-0 h-3 w-full text-terracotta/50"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M2 14 C 80 4, 200 4, 298 12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="max-w-xl text-lg leading-relaxed text-ink/70 text-pretty md:text-xl">
            Meet SamaPalu — the AI-powered companion helping Self-Help Groups price smarter, coordinate better, and make
            every rupee accountable.
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#how-it-works"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-4 font-semibold text-ivory shadow-[0_10px_30px_-10px_rgba(22,60,50,0.6)] transition-all hover:bg-forest-deep hover:shadow-[0_14px_34px_-10px_rgba(22,60,50,0.7)]"
            >
              Explore how it works
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#technology"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-forest/20 bg-ivory/60 px-6 py-4 font-semibold text-forest transition-colors hover:border-forest/40 hover:bg-card"
            >
              Discover the technology
            </a>
          </motion.div>

          <motion.ul {...fadeUp(0.32)} className="flex flex-col gap-3 border-t border-forest/10 pt-6 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {TRUST.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium text-ink/75">
                <Icon className="size-4 text-terracotta" aria-hidden />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative mx-auto h-[600px] w-full max-w-[560px] sm:h-[640px]">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease }}
            className="absolute top-6 right-0 h-[440px] w-[78%] overflow-hidden rounded-[28px] shadow-2xl sm:h-[500px]"
          >
            <Image
              src="/images/collective.png"
              alt="A group of women from a Self-Help Group stitching handmade goods together in a sunlit courtyard"
              fill
              priority
              sizes="(min-width: 1024px) 440px, 78vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent" />
            <p className="absolute right-5 bottom-5 max-w-[60%] text-right font-serif text-sm italic leading-snug text-ivory/90">
              Ten to fifteen women. One order. Every share accounted for.
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease }}
            className="absolute top-14 left-0 z-20 sm:left-2"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <PassbookPhone className="w-[250px] sm:w-[280px]" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="absolute right-0 bottom-0 z-30 w-[260px] rounded-2xl border border-forest/10 bg-card/95 p-4 shadow-[0_30px_60px_-25px_rgba(16,43,37,0.45)] backdrop-blur sm:right-[-8px] sm:w-[290px]"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-forest/60">Order · 600 jute bags</p>
              <span className="text-[10px] font-semibold text-terracotta-deep">Day 6 of 10</span>
            </div>
            <div className="mt-2 flex items-end justify-between">
              <p className="font-serif text-3xl leading-none text-forest tabular-nums">64%</p>
              <p className="text-xs text-ink/60">384 / 600 accepted</p>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sage">
              <motion.div
                className="h-full rounded-full bg-forest"
                initial={reduce ? false : { width: 0 }}
                animate={{ width: '64%' }}
                transition={{ duration: 1.4, delay: 0.9, ease }}
              />
            </div>
            <ul className="mt-3 flex flex-col gap-1.5">
              {MEMBERS.map((m) => (
                <li key={m.name} className="flex items-center gap-2 text-[11px]">
                  <span className="w-12 text-ink/70">{m.name}</span>
                  <span className="h-1 flex-1 overflow-hidden rounded-full bg-sage/70">
                    <span
                      className={m.pct < 50 ? 'block h-full bg-terracotta' : 'block h-full bg-forest/70'}
                      style={{ width: `${m.pct}%` }}
                    />
                  </span>
                  <span className="w-7 text-right tabular-nums text-ink/60">{m.pct}%</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
            className="absolute top-0 right-4 z-30 flex max-w-[250px] items-start gap-3 rounded-2xl bg-forest-deep p-3.5 pr-4 text-ivory shadow-xl"
            role="note"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-terracotta">
              <ArrowLeftRight className="size-4" aria-hidden />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold">Fair swap proposed</span>
              <span className="text-[11px] leading-snug text-ivory/70">
                12 pieces from Meena → Shobha. Waiting for both to consent.
              </span>
            </span>
          </motion.div>

          <DemoBadge className="absolute bottom-2 left-2 z-30 bg-ivory" />
        </div>
      </div>
    </section>
  )
}
