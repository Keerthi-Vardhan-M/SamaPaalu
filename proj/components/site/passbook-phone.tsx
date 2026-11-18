'use client'

import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2, Clock3, IndianRupee, Package, Pause, Play, Volume2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const TRANSCRIPT = [
  { kn: 'ಈ ಆರ್ಡರ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಕೆಲಸ.', en: 'Your work this order.' },
  { kn: 'ಸ್ವೀಕರಿಸಿದ ತುಣುಕುಗಳು: ಮೂವತ್ತೊಂಬತ್ತು.', en: 'Accepted pieces: thirty-nine.' },
  { kn: 'ಪ್ರತಿ ತುಣುಕಿಗೆ ದರ: ಮೂವತ್ತಾರು ರೂಪಾಯಿ.', en: 'Rate per piece: thirty-six rupees.' },
  { kn: 'ನಿಮ್ಮ ಗಳಿಕೆ: ಒಂದು ಸಾವಿರದ ನಾನೂರ ನಾಲ್ಕು ರೂಪಾಯಿ.', en: 'Your earnings: one thousand four hundred and four rupees.' },
]

const DURATION_MS = 9000
const BARS = 28

export function usePassbookPlayback() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const startRef = useRef<number | null>(null)
  const baseRef = useRef(0)

  useEffect(() => {
    if (!playing) return
    let raf = 0
    startRef.current = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, baseRef.current + (t - (startRef.current ?? t)) / DURATION_MS)
      setProgress(p)
      if (p >= 1) {
        setPlaying(false)
        baseRef.current = 0
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
    }
  }, [playing])

  const toggle = () => {
    if (playing) {
      baseRef.current = progress
      setPlaying(false)
    } else {
      if (progress >= 1) baseRef.current = 0
      else baseRef.current = progress
      setPlaying(true)
    }
  }

  const line = Math.min(TRANSCRIPT.length - 1, Math.floor(progress * TRANSCRIPT.length))
  return { playing, progress, toggle, line: progress > 0 ? TRANSCRIPT[line] : null }
}

function Waveform({ progress, playing, dark }: { progress: number; playing: boolean; dark?: boolean }) {
  return (
    <div className="flex h-8 flex-1 items-center gap-[3px]" aria-hidden>
      {Array.from({ length: BARS }).map((_, i) => {
        const active = i / BARS < progress
        const h = 30 + ((i * 37) % 70)
        return (
          <span
            key={i}
            className={cn(
              'w-[3px] rounded-full transition-colors',
              active ? 'bg-terracotta' : dark ? 'bg-ivory/25' : 'bg-forest/20',
              playing && active && 'wave-bar',
            )}
            style={{ height: `${h}%`, animationDelay: `${(i % 7) * 0.09}s` }}
          />
        )
      })}
    </div>
  )
}

export function PassbookPhone({
  variant = 'hero',
  className,
}: {
  variant?: 'hero' | 'full'
  className?: string
}) {
  const { playing, progress, toggle, line } = usePassbookPlayback()
  const full = variant === 'full'

  return (
    <div
      className={cn(
        'relative w-[280px] rounded-[44px] bg-forest-deep p-2.5 shadow-[0_40px_80px_-30px_rgba(16,43,37,0.55),0_0_0_1px_rgba(16,43,37,0.4)] sm:w-[300px]',
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[36px] bg-ivory">
        <div className="absolute top-2 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-forest-deep" aria-hidden />
        <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-semibold text-ink/60">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-3 rounded-sm bg-ink/50" />
            <span className="h-2 w-4 rounded-sm border border-ink/50" />
          </span>
        </div>

        <div className="flex flex-col gap-3 px-4 pt-5 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-forest/60">Acoustic Passbook</p>
              <p className="font-serif text-xl leading-tight text-forest">Your work this order</p>
              <p lang="kn" className="font-kannada text-xs text-ink/60">ಈ ಆರ್ಡರ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಕೆಲಸ</p>
            </div>
            <span className="flex size-10 items-center justify-center rounded-full bg-sage font-serif text-sm text-forest">
              L
            </span>
          </div>

          <div className="rounded-2xl border border-forest/10 bg-card p-3">
            <dl className="flex flex-col divide-y divide-forest/10 text-sm">
              <div className="flex items-center justify-between py-2">
                <dt className="flex items-center gap-2 text-ink/70">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-sage text-forest">
                    <Package className="size-3.5" />
                  </span>
                  Accepted pieces
                </dt>
                <dd className="font-semibold tabular-nums text-forest">39</dd>
              </div>
              <div className="flex items-center justify-between py-2">
                <dt className="flex items-center gap-2 text-ink/70">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-sage text-forest">
                    <IndianRupee className="size-3.5" />
                  </span>
                  Rate per piece
                </dt>
                <dd className="font-semibold tabular-nums text-forest">₹36</dd>
              </div>
              {full && (
                <div className="flex items-center justify-between py-2">
                  <dt className="flex items-center gap-2 text-ink/70">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-terracotta/15 text-terracotta-deep">
                      <Clock3 className="size-3.5" />
                    </span>
                    Pending confirmation
                  </dt>
                  <dd className="font-semibold tabular-nums text-terracotta-deep">4 pcs</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="rounded-2xl bg-forest p-4 text-ivory">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ivory/60">Your earnings</p>
            <p className="font-serif text-4xl leading-none tabular-nums">₹1,404</p>
            <p className="mt-1.5 flex items-center gap-1 text-[11px] text-sage/80">
              <CheckCircle2 className="size-3" /> 39 × ₹36 · rate locked before start
            </p>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-pressed={playing}
            className="group flex items-center gap-3 rounded-2xl border border-terracotta/30 bg-terracotta/10 p-2.5 pr-3 text-left transition-colors hover:bg-terracotta/15 focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:outline-none"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-terracotta text-ivory shadow-md transition-transform group-active:scale-95">
              {playing ? <Pause className="size-5" /> : <Play className="size-5 translate-x-0.5" />}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-forest">
                <Volume2 className="size-3.5" /> Listen in your language
              </span>
              <Waveform progress={progress} playing={playing} />
            </span>
          </button>

          <div className="min-h-[38px]" aria-live="polite">
            <AnimatePresence mode="wait">
              {line ? (
                <motion.div
                  key={line.en}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-center"
                >
                  <p lang="kn" className="font-kannada text-xs text-forest">{line.kn}</p>
                  <p className="text-[10px] text-ink/50">{line.en}</p>
                </motion.div>
              ) : (
                <p className="text-center text-[10px] leading-snug text-ink/50">
                  Demo playback · simulated voice, no recording
                </p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
