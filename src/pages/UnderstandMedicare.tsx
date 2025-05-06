import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import ContentfulService from '@/services/contentfulService';
import FoundationalPageTemplate from '@/components/Templates/FoundationalPageTemplate';
import { Skeleton } from '@/components/ui/skeleton';
import CTASection from '@/components/Home/CTASection';

const UnderstandMedicare = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const contentfulService = ContentfulService.getInstance();
        let contentfulSlug = slug || 'what-is-medicare';
        if (slug === 'eligibility') contentfulSlug = 'medicare-eligibility';
        if (slug === 'enrollment-periods') contentfulSlug = 'enrollment-periods';
        const response = await contentfulService.getFoundationalPageBySlug(contentfulSlug);
        
        if (response) {
          setPageData({
            title: response.pageName || 'Understand Medicare',
            subtitle: response.metadata?.title,
            heroImage: response.metadata?.heroImage,
            fBodyContent: response.fBodyContent || {},
            callToAction: response.callToAction,
            author: response.author,
            youTubeVideo: response.youTubeVideo,
            sections: response.sections || [],
            relatedBlogs: response.relatedBlogs || [],
          });
        } else {
          setError('Failed to load page content');
        }
      } catch (err) {
        console.error(`Error fetching Medicare ${slug} data:`, err);
        setError('Failed to load page content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const getPageTitle = () => {
    if (pageData?.title) return pageData.title;
    
    switch(slug) {
      case 'basics': return 'Medicare Basics';
      case 'eligibility': return 'Medicare Eligibility';
      case 'parts': return 'Medicare Parts A, B, C, D';
      default: return 'Understand Medicare';
    }
  };

  const getMetaDescription = () => {
    switch(slug) {
      case 'basics': 
        return 'Learn Medicare basics including enrollment periods, coverage options, and how to choose the right plan for your needs with expert guidance from Bobby Brock Insurance.';
      case 'eligibility': 
        return "Find out if you're eligible for Medicare, when you can enroll, and how to avoid penalties with helpful guidance from Bobby Brock Insurance of Tupelo, MS.";
      case 'parts': 
        return 'Understand the different parts of Medicare (A, B, C, D) and how they work together to provide your healthcare coverage with expert guidance from Bobby Brock Insurance.';
      default:
        return 'Learn about Medicare with expert guidance from Bobby Brock Insurance, helping beneficiaries understand their healthcare options in Tupelo, MS.';
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{getPageTitle()} | Bobby Brock Insurance</title>
        <meta 
          name="description" 
          content={getMetaDescription()}
        />
        <meta 
          name="keywords" 
          content="Medicare, Medicare education, Medicare basics, Medicare parts, Medicare enrollment, Tupelo MS" 
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "${getPageTitle()}",
              "description": "${getMetaDescription()}",
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

export default UnderstandMedicare;
