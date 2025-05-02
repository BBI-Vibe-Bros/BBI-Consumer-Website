
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout/Layout';
import HeroSection from '@/components/Plans/AdvantageHero';
import PlanComparison from '@/components/Plans/PlanComparison';
import AdvantageFeatures from '@/components/Plans/AdvantageFeatures';
import AdvantageEnrollment from '@/components/Plans/AdvantageEnrollment';
import AdvantageCompliance from '@/components/Plans/AdvantageCompliance';
import AdvantageResources from '@/components/Plans/AdvantageResources';
import CTASection from '@/components/Home/CTASection';

const MedicareAdvantage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Medicare Advantage Plans | Bobby Brock Insurance</title>
        <meta 
          name="description" 
          content="Compare Medicare Advantage (Part C) plans in Tupelo, MS. Get all-in-one coverage with our expert guidance on Medicare Advantage options." 
        />
        <meta 
          name="keywords" 
          content="Medicare Advantage, Part C, Medicare HMO, Medicare PPO, Special Needs Plans, Medicare insurance, Tupelo MS" 
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "InsurancePlan",
              "name": "Medicare Advantage Plans",
              "url": "https://bobbybrock.com/plans/advantage",
              "description": "Medicare Advantage (Part C) plans combine hospital, medical, and often prescription drug coverage in one plan.",
              "insurancePlanProvider": {
                "@type": "InsuranceAgency",
                "name": "Bobby Brock Insurance",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "499 Air Park Rd",
                  "addressLocality": "Tupelo",
                  "addressRegion": "MS",
                  "postalCode": "38801",
                  "addressCountry": "US"
                }
              }
            }
          `}
        </script>
      </Helmet>
      
      <HeroSection />
      <AdvantageFeatures />
      <PlanComparison />
      <AdvantageEnrollment />
      <AdvantageResources />
      <CTASection />
      <AdvantageCompliance />
    </Layout>
  );
};

export default MedicareAdvantage;
