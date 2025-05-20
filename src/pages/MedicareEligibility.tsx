import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import ContentfulService from '@/services/contentfulService';
import FoundationalPageTemplate from '@/components/Templates/FoundationalPageTemplate';
import { Skeleton } from '@/components/ui/skeleton';
import SEO from '@/components/SEO';
import { SchemaGenerator } from '@/utils/schemaGenerator';
import { FoundationalPageResponse } from '@/types/foundationalPage';

const MedicareEligibility = () => {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<FoundationalPageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const contentfulService = ContentfulService.getInstance();
        const response = await contentfulService.getFoundationalPageBySlug('medicare-eligibility') as FoundationalPageResponse;
        
        if (response) {
          setPageData({
            pageName: response.pageName || 'Medicare Eligibility',
            pageSlug: 'medicare-eligibility',
            title: response.title,
            metadata: response.metadata,
            fBodyContent: response.fBodyContent,
            callToAction: response.callToAction,
            author: response.author,
            youTubeVideo: response.youTubeVideo,
            relatedBlogs: response.relatedBlogs || [],
          });
        } else {
          setError('Failed to load page content');
        }
      } catch (err) {
        console.error('Error fetching Medicare Eligibility data:', err);
        setError('Failed to load page content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const schemaData = SchemaGenerator.generate({
    type: 'FoundationalPage',
    data: {
      title: 'Medicare Eligibility',
      description: "Find out if you're eligible for Medicare, when you can enroll, and how to avoid penalties with helpful guidance from Bobby Brock Insurance of Tupelo, MS.",
      url: 'https://www.bobbybrockinsurance.com/medicare/eligibility',
      datePublished: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0]
    }
  });

  return (
    <Layout>
      <SEO 
        title="Medicare Eligibility"
        description="Find out if you're eligible for Medicare, when you can enroll, and how to avoid penalties with helpful guidance from Bobby Brock Insurance of Tupelo, MS."
        type="website"
      />
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
      
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

export default MedicareEligibility;
