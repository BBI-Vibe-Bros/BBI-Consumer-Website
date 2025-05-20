import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import ContentfulService from '@/services/contentfulService';
import FoundationalPageTemplate from '@/components/Templates/FoundationalPageTemplate';
import { Skeleton } from '@/components/ui/skeleton';
import SEO from '@/components/SEO';
import { SchemaGenerator } from '@/utils/schemaGenerator';
import { FoundationalPageResponse } from '@/types/foundationalPage';

const MedicareParts = () => {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<FoundationalPageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const contentfulService = ContentfulService.getInstance();
        const response = await contentfulService.getFoundationalPageBySlug('four-parts-of-medicare') as FoundationalPageResponse;
        
        if (response) {
          setPageData({
            pageName: response.pageName || 'The Four Parts of Medicare',
            pageSlug: 'four-parts-of-medicare',
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
        console.error('Error fetching Medicare Parts data:', err);
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
      title: 'The Four Parts of Medicare',
      description: 'Learn about Medicare Parts A, B, C, and D - what they cover, how they work together, and how to choose the right combination for your healthcare needs.',
      url: 'https://www.bobbybrockinsurance.com/medicare/four-parts-of-medicare',
      datePublished: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0]
    }
  });

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title="The Four Parts of Medicare"
        description="Learn about Medicare Parts A, B, C, and D - what they cover, how they work together, and how to choose the right combination for your healthcare needs."
        type="website"
      />
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
      <FoundationalPageTemplate page={pageData} />
    </Layout>
  );
};

export default MedicareParts;
