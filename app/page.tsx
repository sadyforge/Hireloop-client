import { Hero } from "@/components/hero"
import { StatsSection } from "@/components/stats-section"
import { JobDiscoverySection } from "@/components/job-discovery-section"
import { FeaturesSection } from "@/components/features-section"
import { PricingSection } from "@/components/pricing-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <StatsSection />
        <JobDiscoverySection />
        <FeaturesSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
