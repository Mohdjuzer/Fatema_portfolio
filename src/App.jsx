import { useState } from 'react'
import ThreeBackground from './components/ThreeBackground';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import SolarSystemSkills from './components/SolarSystemSkills';
import Timeline from './components/Timeline';
import ContactSection from './components/ContactSection';
import CosmicCarousel from './components/CosmicCarousel';
import NumbersSection from './components/NumbersSection';
import CosmicFooter from './components/CosmicFooter';

function App() {

  return (
    <>
    
    <ThreeBackground />
    <NavBar />
    <HeroSection />
    <NumbersSection />
    <ServicesSection />
    <SolarSystemSkills />
    <Timeline />
    <CosmicCarousel />
    <ContactSection />
    <CosmicFooter />
    </>
   );
}

export default App
