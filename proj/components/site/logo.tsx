import { cn } from '@/lib/utils'

export function LogoMark({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  const fg = tone === 'dark' ? '#163C32' : '#F8F6EF'
  return (
    <svg viewBox="0 0 32 32" className={cn('size-8', className)} aria-hidden>
      <circle cx="16" cy="16" r="15" fill="none" stroke={fg} strokeWidth="1.5" />
      <path d="M16 3 A13 13 0 0 0 16 29 Z" fill={fg} />
      <path d="M16 3 A13 13 0 0 1 16 29 Z" fill="#C77B5B" />
      <circle cx="16" cy="16" r="3" fill={tone === 'dark' ? '#F8F6EF' : '#102B25'} />
    </svg>
  )
}

export function Logo({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark tone={tone} />
      <span
        className={cn(
          'font-serif text-[22px] leading-none tracking-tight',
          tone === 'dark' ? 'text-forest' : 'text-ivory',
        )}
      >
        Sama<span className="italic text-terracotta">palu</span>
      </span>
    </span>
  )
}
