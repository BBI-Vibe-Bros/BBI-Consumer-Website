import React from 'react';
import Layout from '@/components/Layout/Layout';
import HeroSection from '@/components/Home/HeroSection';
import PlanOptions from '@/components/Home/PlanOptions';
import AboutSection from '@/components/Home/AboutSection';
import ResourceSection from '@/components/Home/ResourceSection';
import CTASection from '@/components/Home/CTASection';
import MedicareCompliance from '@/components/Home/MedicareCompliance';
import SEO from '@/utils/seo';

const Index = () => {
  return (
    <Layout>
      <SEO 
        title="Bobby Brock Insurance - National Medicare Insurance Brokerage"
        description="Bobby Brock Insurance is a nationally recognized Medicare brokerage serving over 50,000 beneficiaries. Expert guidance on Medicare Advantage, Supplement, and Part D plans."
        url="https://www.bobbybrockinsurance.com/"
      />
      
      <HeroSection />
      <PlanOptions />
      <AboutSection />
      <CTASection />
      <ResourceSection />
      <MedicareCompliance />
    </Layout>
  );
};

export default Index;
