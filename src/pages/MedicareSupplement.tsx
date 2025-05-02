
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout/Layout';
import SupplementHero from '@/components/Plans/SupplementHero';
import PlanComparison from '@/components/Plans/PlanComparison';
import SupplementFeatures from '@/components/Plans/SupplementFeatures';
import SupplementEnrollment from '@/components/Plans/SupplementEnrollment';
import SupplementCompliance from '@/components/Plans/SupplementCompliance';
import SupplementResources from '@/components/Plans/SupplementResources';
import CTASection from '@/components/Home/CTASection';

const MedicareSupplement = () => {
  return (
    <Layout>
      <Helmet>
        <title>Medicare Supplement Plans | Bobby Brock Insurance</title>
        <meta 
          name="description" 
          content="Compare Medicare Supplement (Medigap) plans in Tupelo, MS. Get extra coverage that fills the gaps in Original Medicare with our expert guidance." 
        />
        <meta 
          name="keywords" 
          content="Medicare Supplement, Medigap, Plan F, Plan G, Plan N, Medicare insurance, Tupelo MS" 
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "InsurancePlan",
              "name": "Medicare Supplement Plans",
              "url": "https://bobbybrock.com/plans/supplement",
              "description": "Medicare Supplement (Medigap) plans help fill the gaps in Original Medicare coverage such as copayments, coinsurance, and deductibles.",
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
      
      <SupplementHero />
      <SupplementFeatures />
      <PlanComparison />
      <SupplementEnrollment />
      <SupplementResources />
      <CTASection />
      <SupplementCompliance />
    </Layout>
  );
};

export default MedicareSupplement;
