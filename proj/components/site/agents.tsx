'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ClipboardList, Radar, ScrollText, Check, Pause, Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Reveal, SectionHeading } from './primitives'

const AGENTS = [
  {
    key: 'plan',
    role: 'Plan',
    name: 'Intake & Cost Agent',
    icon: ClipboardList,
    summary: 'Turns a buyer’s request into a realistic, priced, deliverable plan.',
    tasks: [
      'Understand the buyer’s order',
      'Process Golden Sample information',
      'Estimate materials and labour',
      'Generate Traffic-Light Price guidance',
      'Check whether the group can meet the deadline',
      'Lock the agreed per-piece rate after approval',
    ],
    handoff: 'Hands a locked rate and fair allocation to Pulse & Rescue.',
    pos: { x: 50, y: 16 },
  },
  {
    key: 'act',
    role: 'Act + Recover',
    name: 'Pulse & Rescue Agent',
    icon: Radar,
    summary: 'Watches production and proposes recovery before deadlines slip.',
    tasks: [
      'Monitor production progress',
      'Identify delays and inactivity',
      'Simulate what happens if an order falls behind',
      'Find suitable peers for reassignment',
      'Ask both members for explicit consent',
      'Update the order records',
    ],
    handoff: 'Hands verified piece counts and changes to Passbook & Governance.',
    pos: { x: 83, y: 73 },
  },
  {
    key: 'verify',
    role: 'Verify + Settle',
    name: 'Passbook & Governance Agent',
    icon: ScrollText,
    summary: 'Keeps the record honest and the final decision with the group.',
    tasks: [
      'Maintain individual work and earnings records',
      'Explain allocations and calculations',
      'Build timestamped evidence timelines for disputes',
      'Support member confirmations and group voting',
      'Require human approval before payouts',
    ],
    handoff: 'Feeds Fairness Memory back into the next order’s plan.',
    pos: { x: 17, y: 73 },
  },
]

export function Agents() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const reduce = useReducedMotion()
  const agent = AGENTS[active]

  useEffect(() => {
    if (!auto || reduce) return
    const id = setInterval(() => setActive((a) => (a + 1) % AGENTS.length), 4500)
    return () => clearInterval(id)
  }, [auto, reduce])

  const select = (i: number) => {
    setActive(i)
    setAuto(false)
  }

  return (
    <section id="technology" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="The Three Agents"
          title={
            <>
              Not just an assistant. A system that <span className="italic text-terracotta">plans, acts, and verifies.</span>
            </>
          }
          intro="Three cooperating agents share one order record. Each has a narrow job, hands off to the next, and stops for people whenever a decision affects someone’s work or money."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-[480px]">
              <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                    <path d="M0 0 L10 5 L0 10 z" fill="#C77B5B" />
                  </marker>
                </defs>
                <circle cx="50" cy="54" r="38" fill="none" stroke="#163C32" strokeOpacity="0.1" strokeWidth="0.4" />
                <circle
                  cx="50"
                  cy="54"
                  r="38"
                  fill="none"
                  stroke="#C77B5B"
                  strokeWidth="0.6"
                  strokeDasharray="2 2"
                  strokeLinecap="round"
                  className={reduce ? '' : 'orbit-dash'}
                />
                <circle cx="50" cy="54" r="24" fill="#DDE8DA" fillOpacity="0.5" />
              </svg>

              <div className="absolute top-[54%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-forest/60">Shared order record</span>
                <span className="mt-1 font-serif text-2xl text-forest">Plan → Act → Verify</span>
                <span className="text-xs text-ink/50">→ Plan</span>
              </div>

              {AGENTS.map((a, i) => {
                const Icon = a.icon
                const isActive = i === active
                return (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={isActive}
                    aria-label={`${a.name} — ${a.role}`}
                    style={{ left: `${a.pos.x}%`, top: `${a.pos.y}%` }}
                    className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 focus-visible:outline-none"
                  >
                    <span className="relative flex items-center justify-center">
                      {isActive && !reduce && (
                        <motion.span
                          layoutId="agent-halo"
                          className="absolute inset-[-10px] rounded-full border border-terracotta/50 bg-terracotta/10"
                          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                        />
                      )}
                      <span
                        className={cn(
                          'relative flex size-16 items-center justify-center rounded-full border shadow-lg transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-terracotta md:size-20',
                          isActive ? 'border-forest bg-forest text-ivory' : 'border-forest/15 bg-card text-forest group-hover:border-forest/40',
                        )}
                      >
                        <Icon className="size-6 md:size-7" />
                      </span>
                    </span>
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap transition-colors',
                        isActive ? 'bg-terracotta text-ivory' : 'bg-ivory text-forest/70',
                      )}
                    >
                      {a.role}
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          <div className="relative">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex gap-2" role="tablist" aria-label="Agents">
                {AGENTS.map((a, i) => (
                  <button
                    key={a.key}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    onClick={() => select(i)}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                      i === active ? 'border-forest bg-forest text-ivory' : 'border-forest/15 text-forest/70 hover:border-forest/40',
                    )}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>
              {!reduce && (
                <button
                  type="button"
                  onClick={() => setAuto((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-ink/60 hover:text-forest"
                >
                  {auto ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                  {auto ? 'Pause loop' : 'Play loop'}
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={agent.key}
                role="tabpanel"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-forest/10 bg-card p-7 shadow-[0_30px_60px_-40px_rgba(16,43,37,0.4)] md:p-9"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-deep">Role · {agent.role}</p>
                <h3 className="mt-2 font-serif text-3xl text-forest md:text-4xl">{agent.name}</h3>
                <p className="mt-3 text-ink/70">{agent.summary}</p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {agent.tasks.map((t, i) => (
                    <motion.li
                      key={t}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i + 0.1 }}
                      className="flex items-start gap-2.5 text-sm text-ink/80"
                    >
                      <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-sage text-forest">
                        <Check className="size-3" aria-hidden />
                      </span>
                      {t}
                    </motion.li>
                  ))}
                </ul>
                <p className="mt-7 border-t border-forest/10 pt-5 text-sm text-ink/60">
                  <span className="font-semibold text-forest">Hand-off · </span>
                  {agent.handoff}
                </p>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
