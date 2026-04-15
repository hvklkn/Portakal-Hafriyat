import Navbar from './components/Navbar'
import Footer from './sections/Footer'
import AboutSection from './sections/AboutSection'
import ContactCtaSection from './sections/ContactCtaSection'
import HeroSection from './sections/HeroSection'
import ProjectsSection from './sections/ProjectsSection'
import ServicesSection from './sections/ServicesSection'
import WhyChooseUsSection from './sections/WhyChooseUsSection'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <ProjectsSection />
        <ContactCtaSection />
      </main>
      <Footer />
    </>
  )
}

export default App
