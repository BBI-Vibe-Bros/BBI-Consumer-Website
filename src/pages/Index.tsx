
import React from 'react';
import Layout from '@/components/Layout/Layout';
import HeroSection from '@/components/Home/HeroSection';
import PlanOptions from '@/components/Home/PlanOptions';
import AboutSection from '@/components/Home/AboutSection';
import ResourceSection from '@/components/Home/ResourceSection';
import CTASection from '@/components/Home/CTASection';
import MedicareCompliance from '@/components/Home/MedicareCompliance';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Bobby Brock Insurance - National Medicare Insurance Brokerage</title>
        <meta name="description" content="Bobby Brock Insurance is a nationally recognized Medicare brokerage serving over 50,000 beneficiaries. Expert guidance on Medicare Advantage, Supplement, and Part D plans." />
        <meta name="keywords" content="Medicare, insurance brokerage, Medicare Advantage, Medicare Supplement, Medigap, Part D, senior insurance" />
        {/* Schema markup for insurance agency */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "InsuranceAgency",
              "name": "Bobby Brock Insurance",
              "url": "https://bobbybrock.com",
              "logo": "https://bobbybrock.com/logo.png",
              "description": "A nationally recognized Medicare insurance brokerage serving over 50,000 beneficiaries across the United States. We provide personalized guidance on Medicare Advantage, Medicare Supplements, and Part D plans from multiple carriers.",
              "foundingDate": "1992",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "499 Air Park Rd",
                "addressLocality": "Tupelo",
                "addressRegion": "MS",
                "postalCode": "38801",
                "addressCountry": "US"
              },
              "telephone": "+16626421512",
              "openingHours": "Mo,Tu,We,Th,Fr 08:00-17:00",
              "sameAs": [
                "https://www.facebook.com/bobbybrockinsurance",
                "https://www.instagram.com/bobbybrockinsurance"
              ]
            }
          `}
        </script>
      </Helmet>
      
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
