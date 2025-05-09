import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout/Layout';
import ContentfulService from '@/services/contentfulService';
import FoundationalPageTemplate from '@/components/Templates/FoundationalPageTemplate';
import { Skeleton } from '@/components/ui/skeleton';

const MedicareBasics = () => {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const contentfulService = ContentfulService.getInstance();
        const response = await contentfulService.getFoundationalPageBySlug('what-is-medicare');
        
        if (response) {
          setPageData({
            title: response.pageName || 'Medicare Basics',
            subtitle: response.metadata?.title,
            fBodyContent: response.fBodyContent || {},
            callToAction: response.callToAction,
            author: response.author,
            youTubeVideo: response.youTubeVideo,
            relatedBlogs: response.relatedBlogs || [],
          });
        } else {
          setError('Failed to load page content');
        }
      } catch (err) {
        console.error('Error fetching Medicare Basics data:', err);
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
        <title>Medicare Basics | Bobby Brock Insurance</title>
        <meta 
          name="description" 
          content="Learn Medicare basics including enrollment periods, coverage options, and how to choose the right plan for your needs with expert guidance from Bobby Brock Insurance."
        />
        <meta 
          name="keywords" 
          content="Medicare basics, Medicare education, Medicare coverage, Medicare enrollment, Medicare parts, Tupelo MS" 
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Medicare Basics",
              "description": "Learn Medicare basics including enrollment periods, coverage options, and how to choose the right plan for your needs with expert guidance from Bobby Brock Insurance.",
              "publisher": {
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
    </Layout>
  );
};

export default MedicareBasics;
