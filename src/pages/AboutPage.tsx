import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Layout/Header';
import HeroSection from '@/components/About/HeroSection';
import TimelineSection from '@/components/About/TimelineSection';
import FeatureGrid from '@/components/About/FeatureGrid';
import CallToAction from '@/components/About/CallToAction';
import Footer from '@/components/Layout/Footer';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Bobby Brock Insurance | Your Trusted Medicare Partner</title>
        <meta 
          name="description" 
          content="Learn about Bobby Brock Insurance's 20+ year journey helping seniors navigate Medicare. Discover our commitment to personalized service, local expertise, and ongoing support."
        />
        <link rel="canonical" href="https://www.bobbybrockinsurance.com/about-us" />
      </Helmet>

      <Header />
      
      <main>
        <HeroSection />
        <TimelineSection />
        <FeatureGrid />
        <CallToAction />        
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;
