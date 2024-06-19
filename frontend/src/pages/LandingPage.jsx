import React from 'react'
import NavLanding from '../components/NavLanding'
import Footer from '../components/Footer';
import Faqs from '../components/Faqs';
import Offerings from '../components/Offerings'
import HeroSection from '../components/HeroSection'
import ExampleSlider from '../components/ExampleSlider';
const LandingPage = () => {
  return (
    <div>
      <NavLanding/>
      <HeroSection/>
      <Offerings/>
      <ExampleSlider/>
      <Faqs/>
      <Footer />
    </div>
  )
}

export default LandingPage;
