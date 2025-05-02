
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout/Layout';
import ContentfulService from '@/services/contentfulService';
import FoundationalPageTemplate from '@/components/Templates/FoundationalPageTemplate';
import { Skeleton } from '@/components/ui/skeleton';
import CTASection from '@/components/Home/CTASection';

const PrescriptionDrugPlans = () => {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const contentfulService = ContentfulService.getInstance();
        const response = await contentfulService.getFoundationalPageBySlug('prescription-drug-plans');
        
        if (response && response.fields) {
          setPageData({
            title: response.fields.title || 'Medicare Part D Prescription Drug Plans',
            subtitle: response.fields.subtitle,
            heroImage: response.fields.heroImage?.fields?.file?.url 
              ? `https:${response.fields.heroImage.fields.file.url}` 
              : undefined,
            content: response.fields.content || {},
            sections: response.fields.sections?.map((section: any) => ({
              title: section.fields.title,
              content: section.fields.content,
              image: section.fields.image?.fields?.file?.url 
                ? `https:${section.fields.image.fields.file.url}` 
                : undefined
            })) || []
          });
        } else {
          setError('Failed to load page content');
        }
      } catch (err) {
        console.error('Error fetching Prescription Drug Plan data:', err);
        setError('Failed to load page content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      
      {loading ? (
        <div className="container mx-auto px-4 py-16">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-6 w-1/2 mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-72 rounded-lg" />
          </div>
        </div>
      ) : error ? (
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Unable to load content</h2>
          <p className="text-gray-600">Please try again later or contact support if the issue persists.</p>
        </div>
      ) : (
        <>
          {pageData && <FoundationalPageTemplate page={pageData} />}
        </>
      )}
      
      <CTASection />
    </Layout>
  );
};

export default PrescriptionDrugPlans;
