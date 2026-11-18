'use client'

import { AnimatePresence, motion } from 'motion/react'
import { AlertTriangle, ArrowLeftRight, Check, CheckCircle2, Clock, RotateCcw, ShieldCheck, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { DemoBadge, Reveal, SectionHeading } from './primitives'

type Stage = 'idle' | 'delay' | 'impact' | 'proposal' | 'consent' | 'updated' | 'declined'

const TIMELINE: { key: Exclude<Stage, 'idle' | 'declined'>; label: string }[] = [
  { key: 'delay', label: 'Delay detected' },
  { key: 'impact', label: 'Impact simulated' },
  { key: 'proposal', label: 'Proposal sent' },
  { key: 'consent', label: 'Consent received' },
  { key: 'updated', label: 'Assignment updated' },
]

const ORDER: Stage[] = ['idle', 'delay', 'impact', 'proposal', 'consent', 'updated']
const SWAP = 12
const RATE = 36

const NARRATION: Record<Stage, string> = {
  idle: 'All 14 members are on pace. Nothing needs attention yet.',
  delay: 'Meena has logged no progress for two days. The Pulse & Rescue Agent flags bundle B-07.',
  impact: 'Simulation: at the current pace, the order would miss its Day 10 deadline by about one day.',
  proposal: 'A fair swap is proposed to both women, in their own language, by voice and text. Nothing moves until both say yes.',
  consent: 'Both members have agreed. The change is timestamped in the evidence timeline.',
  updated: 'Assignment updated. Each woman is paid only for the pieces she completes, at the same locked rate.',
  declined: 'A member declined. The proposal is withdrawn and the original assignment stays exactly as it was.',
}

export function ReassignmentDemo() {
  const [stage, setStage] = useState<Stage>('idle')
  const [consentA, setConsentA] = useState(false)
  const [consentB, setConsentB] = useState(false)

  useEffect(() => {
    if (stage === 'delay') {
      const t = setTimeout(() => setStage('impact'), 1400)
      return () => clearTimeout(t)
    }
    if (stage === 'consent') {
      const t = setTimeout(() => setStage('updated'), 1400)
      return () => clearTimeout(t)
    }
  }, [stage])

  useEffect(() => {
    if (stage === 'proposal' && consentA && consentB) setStage('consent')
  }, [consentA, consentB, stage])

  const reset = () => {
    setStage('idle')
    setConsentA(false)
    setConsentB(false)
  }

  const idx = ORDER.indexOf(stage)
  const swapped = stage === 'updated'
  const meenaPcs = swapped ? 28 : 40
  const shobhaPcs = swapped ? 40 + SWAP : 40
  const canPropose = stage === 'impact'
  const awaiting = stage === 'proposal'

  return (
    <section id="experience" className="relative overflow-hidden border-y border-forest/10 bg-sage/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Signature feature · Proposes, then reassigns with consent"
            title={
              <>
                When plans change, <span className="italic text-terracotta">fairness shouldn&apos;t.</span>
              </>
            }
          />
          <DemoBadge label="Simulated scenario" className="self-start md:self-end" />
        </div>

        <ol className="mt-12 grid grid-cols-5 gap-2" aria-label="Reassignment progress">
          {TIMELINE.map((t, i) => {
            const done = stage !== 'declined' && idx >= i + 1
            const current = stage !== 'declined' && idx === i + 1
            return (
              <li key={t.key} className="flex flex-col gap-2">
                <span className="h-1 overflow-hidden rounded-full bg-forest/10">
                  <motion.span
                    className="block h-full bg-forest"
                    initial={false}
                    animate={{ width: done ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                </span>
                <span
                  className={cn(
                    'hidden text-[10px] font-semibold uppercase tracking-[0.12em] sm:block sm:text-xs',
                    current ? 'text-terracotta-deep' : done ? 'text-forest' : 'text-ink/40',
                  )}
                  aria-current={current ? 'step' : undefined}
                >
                  {t.label}
                </span>
              </li>
            )
          })}
        </ol>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-forest sm:hidden" aria-hidden>
          {stage === 'declined'
            ? 'Swap declined'
            : idx >= 1
              ? `Step ${idx} of ${TIMELINE.length} · ${TIMELINE[idx - 1].label}`
              : 'Ready to start'}
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.4fr]">
          <Reveal className="flex flex-col gap-5 rounded-3xl bg-forest-deep p-7 text-ivory md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage/70">Order · 600 jute bags · Day 6 of 10</p>
            <div aria-live="polite" className="min-h-[96px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={stage}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="font-serif text-2xl leading-snug text-balance"
                >
                  {NARRATION[stage]}
                </motion.p>
              </AnimatePresence>
            </div>

            <DeadlineBar stage={stage} />

            <div className="grid grid-cols-2 gap-2 pt-2">
              <DemoButton onClick={() => setStage('delay')} disabled={stage !== 'idle'} step="1">
                Simulate a delay
              </DemoButton>
              <DemoButton onClick={() => setStage('proposal')} disabled={!canPropose} step="2">
                Propose a fair swap
              </DemoButton>
              <DemoButton onClick={() => setConsentA(true)} disabled={!awaiting || consentA} step="3">
                Approve as Member A
              </DemoButton>
              <DemoButton onClick={() => setConsentB(true)} disabled={!awaiting || consentB} step="4">
                Approve as Member B
              </DemoButton>
            </div>
            <div className="flex items-center justify-between gap-3 text-sm">
              <button
                type="button"
                onClick={() => setStage('declined')}
                disabled={!awaiting}
                className="py-2 text-ivory/60 underline-offset-4 hover:text-ivory hover:underline disabled:pointer-events-none disabled:opacity-30"
              >
                Decline instead
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 py-2 text-ivory/60 hover:text-ivory"
              >
                <RotateCcw className="size-3.5" /> Reset
              </button>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            <MemberCard
              tag="Member A"
              name="Meena"
              pieces={meenaPcs}
              done={22}
              flagged={idx >= 1 && stage !== 'updated'}
              request={awaiting || stage === 'consent' || stage === 'updated'}
              consented={consentA || stage === 'consent' || stage === 'updated'}
              declined={stage === 'declined'}
              kn={`ನಿಮ್ಮ ${SWAP} ತುಣುಕುಗಳನ್ನು ಶೋಭಾ ಅವರಿಗೆ ವರ್ಗಾಯಿಸಲು ನೀವು ಒಪ್ಪುತ್ತೀರಾ?`}
              en={`Do you agree to pass ${SWAP} of your remaining pieces to Shobha? You keep full pay for all pieces you complete.`}
            />
            <MemberCard
              tag="Member B"
              name="Shobha"
              pieces={shobhaPcs}
              done={40}
              request={awaiting || stage === 'consent' || stage === 'updated'}
              consented={consentB || stage === 'consent' || stage === 'updated'}
              declined={stage === 'declined'}
              kn={`ಮೀನಾ ಅವರ ${SWAP} ತುಣುಕುಗಳನ್ನು ₹${RATE} ದರದಲ್ಲಿ ತೆಗೆದುಕೊಳ್ಳಲು ನೀವು ಒಪ್ಪುತ್ತೀರಾ?`}
              en={`Will you take on ${SWAP} pieces from Meena at the locked ₹${RATE} rate? Extra earnings: ₹${SWAP * RATE}.`}
            />
            <div className="flex items-start gap-3 rounded-2xl border border-forest/10 bg-ivory p-4 text-sm text-ink/70 sm:col-span-2">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden />
              <p>
                SamaPalu can only <strong className="font-semibold text-forest">propose</strong>. It cannot move anyone&apos;s
                work on its own — a reassignment happens only when both women explicitly agree, and either can say no without
                penalty.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DemoButton({
  children,
  onClick,
  disabled,
  step,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  step: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group flex flex-col items-start gap-1 rounded-2xl border border-ivory/15 bg-ivory/5 p-3 text-left text-sm font-semibold transition-all hover:border-terracotta hover:bg-terracotta/15 focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-ivory/15 disabled:hover:bg-ivory/5"
    >
      <span className="text-[10px] font-semibold tracking-[0.16em] text-terracotta">0{step}</span>
      {children}
    </button>
  )
}

function DeadlineBar({ stage }: { stage: Stage }) {
  const late = stage === 'impact' || stage === 'proposal'
  const recovered = stage === 'updated' || stage === 'consent'
  const projected = late ? 110 : 100
  return (
    <div className="rounded-2xl bg-ivory/5 p-4">
      <div className="flex items-center justify-between text-xs text-ivory/60">
        <span>Projected finish</span>
        <span
          className={cn(
            'font-semibold',
            late ? 'text-terracotta' : recovered ? 'text-sage' : stage === 'declined' ? 'text-terracotta' : 'text-ivory/80',
          )}
        >
          {late ? 'Day 11 · 1 day late' : recovered ? 'Day 10 · on time' : stage === 'declined' ? 'Leader to review' : 'Day 10 · on time'}
        </span>
      </div>
      <div className="relative mt-3 h-2 rounded-full bg-ivory/10">
        <motion.div
          className={cn('h-full rounded-full', late ? 'bg-terracotta' : 'bg-sage')}
          initial={false}
          animate={{ width: `${(projected / 110) * 100}%` }}
          transition={{ duration: 0.6 }}
        />
        <span className="absolute -top-1 h-4 w-px bg-ivory" style={{ left: `${(100 / 110) * 100}%` }} aria-hidden />
      </div>
      <p className="mt-2 text-right text-[10px] text-ivory/40">Deadline · Day 10</p>
    </div>
  )
}

function MemberCard({
  tag,
  name,
  pieces,
  done,
  flagged,
  request,
  consented,
  declined,
  kn,
  en,
}: {
  tag: string
  name: string
  pieces: number
  done: number
  flagged?: boolean
  request: boolean
  consented: boolean
  declined: boolean
  kn: string
  en: string
}) {
  return (
    <motion.div
      layout
      className={cn(
        'flex flex-col gap-4 rounded-3xl border bg-card p-5 transition-colors',
        flagged ? 'border-terracotta/50' : 'border-forest/10',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-sage font-serif text-forest">{name[0]}</span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/50">{tag}</p>
            <p className="font-serif text-xl text-forest">{name}</p>
          </div>
        </div>
        {flagged ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-terracotta/15 px-2 py-1 text-[10px] font-semibold text-terracotta-deep">
            <AlertTriangle className="size-3" /> Delayed
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-sage px-2 py-1 text-[10px] font-semibold text-forest">
            <Clock className="size-3" /> On pace
          </span>
        )}
      </div>

      <div>
        <div className="flex items-baseline justify-between text-sm">
          <span className="text-ink/60">Assigned bundle</span>
          <motion.span key={pieces} initial={{ scale: 1.3, color: '#C77B5B' }} animate={{ scale: 1, color: '#163C32' }} className="font-semibold tabular-nums">
            {pieces} pcs
          </motion.span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sage/70">
          <div className="h-full rounded-full bg-forest/70" style={{ width: `${Math.min(100, (done / pieces) * 100)}%` }} />
        </div>
        <p className="mt-1.5 text-[11px] text-ink/50 tabular-nums">
          {done} accepted · ₹{done * RATE} earned so far
        </p>
      </div>

      <div className="min-h-[150px]">
        <AnimatePresence mode="wait">
          {declined ? (
            <motion.div key="declined" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 rounded-2xl bg-muted p-4 text-sm text-ink/60">
              <X className="size-4" /> Proposal withdrawn. No changes made.
            </motion.div>
          ) : request ? (
            <motion.div
              key="request"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2 rounded-2xl bg-forest p-4 text-ivory"
            >
              <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-sage/80">
                <ArrowLeftRight className="size-3" /> Swap request · ಕನ್ನಡ
              </p>
              <p lang="kn" className="font-kannada text-sm leading-relaxed">{kn}</p>
              <p className="text-xs leading-relaxed text-ivory/60">{en}</p>
              <p className={cn('mt-1 flex items-center gap-1.5 text-xs font-semibold', consented ? 'text-sage' : 'text-terracotta')}>
                {consented ? <CheckCircle2 className="size-3.5" /> : <Clock className="size-3.5" />}
                {consented ? `${name} agreed` : 'Awaiting her answer'}
              </p>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full min-h-[150px] items-center justify-center rounded-2xl border border-dashed border-forest/15 text-xs text-ink/40">
              <Check className="mr-1.5 size-3.5" /> No pending requests
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
