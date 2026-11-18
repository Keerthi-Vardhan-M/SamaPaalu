'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { NAV_LINKS } from './nav-links'

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open
          ? 'border-b border-forest/10 bg-ivory/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-8"
      >
        <a href="#top" className="rounded-md focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none" aria-label="SamaPalu home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-forest/5 hover:text-forest"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#experience"
            className="group hidden items-center gap-1.5 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-ivory transition-all hover:bg-forest-deep sm:inline-flex"
          >
            Explore the Experience
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex size-10 items-center justify-center rounded-full border border-forest/15 text-forest lg:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 64px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pt-6">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-forest/10 py-4 font-serif text-3xl text-forest"
                  >
                    {l.label}
                    <span className="font-sans text-xs text-ink/40">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="px-5 pt-8">
              <a
                href="#experience"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-4 font-semibold text-ivory"
              >
                Explore the Experience <ArrowUpRight className="size-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
