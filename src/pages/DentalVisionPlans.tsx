import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout/Layout';
import DentalVisionHero from '@/components/Plans/DentalVisionHero';
import DentalVisionFeatures from '@/components/Plans/DentalVisionFeatures';
import DentalVisionComparison from '@/components/Plans/DentalVisionComparison';
import DentalVisionEnrollment from '@/components/Plans/DentalVisionEnrollment';
import DentalVisionResources from '@/components/Plans/DentalVisionResources';
import CTASection from '@/components/Home/CTASection';

const DentalVisionPlans = () => {
  return (
    <Layout>
      <Helmet>
        <title>Medicare Dental & Vision Coverage Guide | Bobby Brock Insurance</title>
        <meta 
          name="description" 
          content="Compare Medicare Dental & Vision plans in Tupelo, MS. Get expert guidance on coverage options for routine dental care, eye exams, glasses and more." 
        />
        <meta 
          name="keywords" 
          content="Medicare Dental, Medicare Vision, dental coverage, vision coverage, Medicare insurance, Tupelo MS" 
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Medicare Dental & Vision Plan Comparison",
              "url": "https://bobbybrock.com/plans/dental",
              "description": "Expert guidance on Medicare dental and vision coverage options from multiple insurance carriers, helping beneficiaries find the right plans to complement their Medicare coverage.",
              "provider": {
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
    </Layout>
  );
};

export default DentalVisionPlans;
