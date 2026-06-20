import Navbar from '@/components/layout/Navbar'
import Hero from '../components/home/Hero'
import LogoStrip from '../components/home/LogoStrip'
import Features from '../components/home/Features'
import StatsSection from '../components/home/StatsSection'
import ServicesPreview from '../components/home/ServicesPreview'
import CTA from '../components/home/CTA'
import Footer from '@/components/layout/Footer'
import Testimonials from '../components/home/Testimonials'
import Faq from '../components/home/Faq'
import PricingTeaser from '../components/home/PricingTeaser'

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Navbar />
      <Hero />
      <LogoStrip />
      <Features />
      <ServicesPreview />
      <StatsSection />
      <Testimonials />
      <PricingTeaser />
      <Faq />
      <CTA />
      <Footer />
    </main>
  )
}
