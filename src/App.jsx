import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import TrustSection from './components/TrustSection'
import WorkflowTimeline from './components/WorkflowTimeline'
import Features from './components/Features'
import DashboardShowcase from './components/DashboardShowcase'
import CompareSection from './components/CompareSection'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App() {
  // Global reveal-on-scroll for .reveal elements
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{ background: '#071E26', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navigation />
      <main>
        <Hero />
        <TrustSection />
        <Features />
        <WorkflowTimeline />
        <CompareSection />
        <DashboardShowcase />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
