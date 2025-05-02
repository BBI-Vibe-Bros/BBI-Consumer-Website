
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout/Layout';
import AdvantageHero from '@/components/Plans/AdvantageHero';
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
          content="Compare Medicare Advantage (Part C) plans in Tupelo, MS. Get expert guidance on Medicare Advantage options from independent brokers at Bobby Brock Insurance." 
        />
        <meta 
          name="keywords" 
          content="Medicare Advantage, Part C, Medicare HMO, Medicare PPO, Special Needs Plans, Medicare insurance brokerage, Tupelo MS" 
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Medicare Advantage Plan Comparison",
              "url": "https://bobbybrock.com/plans/advantage",
              "description": "Independent comparison and guidance for Medicare Advantage (Part C) plans from multiple insurance carriers.",
              "provider": {
                "@type": "InsuranceAgency",
                "name": "Bobby Brock Insurance",
                "description": "Independent Medicare insurance brokerage helping consumers compare plans from multiple carriers",
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
      
      <AdvantageHero />
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
