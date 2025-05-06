import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout/Layout';
import ContentfulService from '@/services/contentfulService';
import FoundationalPageTemplate from '@/components/Templates/FoundationalPageTemplate';
import { Skeleton } from '@/components/ui/skeleton';
import CTASection from '@/components/Home/CTASection';

const MedicareAdvantage = () => {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const contentfulService = ContentfulService.getInstance();
        const response = await contentfulService.getFoundationalPageBySlug('medicare-advantage');
        
        if (response) {
          setPageData({
            title: response.pageName || 'Medicare Advantage Plans',
            subtitle: response.metadata?.title,
            heroImage: response.metadata?.heroImage,
            fBodyContent: response.fBodyContent || {},
            callToAction: response.callToAction,
            author: response.author,
            youTubeVideo: response.youTubeVideo,
            sections: response.sections || [],
            relatedBlogs: response.relatedBlogs || []
          });
        } else {
          setError('Failed to load page content');
        }
      } catch (err) {
        console.error('Error fetching Medicare Advantage data:', err);
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
        <title>Medicare Advantage Plans | Bobby Brock Insurance</title>
        <meta 
          name="description" 
          content="Compare Medicare Advantage (Part C) plans in Tupelo, MS. Get expert guidance on Medicare Advantage options from our national brokerage serving over 50,000 beneficiaries." 
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
              "description": "Independent comparison and guidance for Medicare Advantage (Part C) plans from multiple insurance carriers by a nationally recognized Medicare brokerage.",
              "provider": {
                "@type": "InsuranceAgency",
                "name": "Bobby Brock Insurance",
                "description": "Nationally recognized Medicare insurance brokerage serving over 50,000 beneficiaries, helping consumers compare plans from multiple carriers",
                "foundingDate": "1992",
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
      
    </Layout>
  );
};

export default MedicareAdvantage;
