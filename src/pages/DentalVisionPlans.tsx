
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout/Layout';
import DentalVisionHero from '@/components/Plans/DentalVisionHero';
import DentalVisionFeatures from '@/components/Plans/DentalVisionFeatures';
import DentalVisionComparison from '@/components/Plans/DentalVisionComparison';
import DentalVisionEnrollment from '@/components/Plans/DentalVisionEnrollment';
import DentalVisionCompliance from '@/components/Plans/DentalVisionCompliance';
import DentalVisionResources from '@/components/Plans/DentalVisionResources';
import CTASection from '@/components/Home/CTASection';

const DentalVisionPlans = () => {
  return (
    <Layout>
      <Helmet>
        <title>Medicare Dental & Vision Plans | Bobby Brock Insurance</title>
        <meta 
          name="description" 
          content="Explore Medicare Dental & Vision plans in Tupelo, MS. Get coverage for routine dental care, eye exams, glasses and more with our expert guidance." 
        />
        <meta 
          name="keywords" 
          content="Medicare Dental, Medicare Vision, dental insurance, vision insurance, Medicare insurance, Tupelo MS" 
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "InsurancePlan",
              "name": "Medicare Dental & Vision Plans",
              "url": "https://bobbybrock.com/plans/dental",
              "description": "Medicare Dental & Vision plans provide coverage for routine dental care, eye exams, glasses, and more that Original Medicare doesn't cover.",
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
      
      <DentalVisionHero />
      <DentalVisionFeatures />
      <DentalVisionComparison />
      <DentalVisionEnrollment />
      <DentalVisionResources />
      <CTASection />
      <DentalVisionCompliance />
    </Layout>
  );
};

export default DentalVisionPlans;
