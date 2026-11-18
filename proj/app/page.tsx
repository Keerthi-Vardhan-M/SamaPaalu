import { MotionProvider } from '@/components/site/motion-provider'
import { SiteNav } from '@/components/site/site-nav'
import { Hero } from '@/components/site/hero'
import { Problem } from '@/components/site/problem'
import { Solution } from '@/components/site/solution'
import { Agents } from '@/components/site/agents'
import { ReassignmentDemo } from '@/components/site/reassignment-demo'
import { PassbookSection } from '@/components/site/passbook-section'
import { Fairness } from '@/components/site/fairness'
import { RealWorld } from '@/components/site/real-world'
import { Beneficiaries, BusinessModel } from '@/components/site/beneficiaries'
import { Faq } from '@/components/site/faq'
import { FinalCta, SiteFooter } from '@/components/site/closing'

export default function Page() {
  return (
    <MotionProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main">
        <Hero />
        <Problem />
        <Solution />
        <Agents />
        <ReassignmentDemo />
        <PassbookSection />
        <Fairness />
        <RealWorld />
        <Beneficiaries />
        <BusinessModel />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </MotionProvider>
  )
}
