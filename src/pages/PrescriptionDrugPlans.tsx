import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout/Layout';
import DrugPlanHero from '@/components/Plans/DrugPlanHero';
import DrugPlanFeatures from '@/components/Plans/DrugPlanFeatures';
import DrugPlanComparison from '@/components/Plans/DrugPlanComparison';
import DrugPlanEnrollment from '@/components/Plans/DrugPlanEnrollment';
import DrugPlanResources from '@/components/Plans/DrugPlanResources';
import CTASection from '@/components/Home/CTASection';

const PrescriptionDrugPlans = () => {
  return (
    <Layout>
      <Helmet>
        <title>Medicare Part D Prescription Drug Plans | Bobby Brock Insurance</title>
        <meta 
          name="description" 
          content="Find affordable Medicare Part D prescription drug plans in Tupelo, MS. Compare coverage options and save money on your medications." 
        />
        <meta 
          name="keywords" 
          content="Medicare Part D, prescription drug plans, medication coverage, Medicare insurance, Tupelo MS" 
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "InsurancePlan",
              "name": "Medicare Part D Prescription Drug Plans",
              "url": "https://bobbybrock.com/plans/prescription",
              "description": "Medicare Part D prescription drug plans help cover the cost of prescription medications including many recommended shots or vaccines.",
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
      
      <DrugPlanHero />
      <DrugPlanFeatures />
      <DrugPlanComparison />
      <DrugPlanEnrollment />
      <DrugPlanResources />
      <CTASection />
    </Layout>
  );
};

export default PrescriptionDrugPlans;
