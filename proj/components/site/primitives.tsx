'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({
  children,
  className,
  tone = 'dark',
}: {
  children: ReactNode
  className?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]',
        tone === 'dark' ? 'text-forest/70' : 'text-sage/80',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn('h-px w-6', tone === 'dark' ? 'bg-terracotta' : 'bg-terracotta')}
      />
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = 'dark',
  align = 'left',
  className,
}: {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        'flex max-w-3xl flex-col gap-5',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          'font-serif text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl lg:text-6xl',
          tone === 'dark' ? 'text-forest' : 'text-ivory',
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            'max-w-2xl text-lg leading-relaxed text-pretty',
            tone === 'dark' ? 'text-ink/70' : 'text-ivory/70',
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  )
}

export function DemoBadge({ className, label = 'Illustrative demo data' }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-terracotta/40 bg-terracotta/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-terracotta-deep',
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-terracotta" />
      {label}
    </span>
  )
}
