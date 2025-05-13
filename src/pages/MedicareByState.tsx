import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import ContentfulService from '@/services/contentfulService';
import StatePageTemplate from '@/components/Templates/StatePageTemplate';
import { Skeleton } from '@/components/ui/skeleton';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/components/SEO';

const MedicareByState = () => {
  const { state } = useParams<{ state: string }>();
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Build breadcrumb items for state pages
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Medicare by State', path: '/medicare/by-state' },
    { label: pageData?.title || `Medicare in ${state}`, path: `/medicare/by-state/${state}`, isLast: true }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const contentfulService = ContentfulService.getInstance();
        // Convert URL state param to Contentful slug format
        const contentfulSlug = `medicare-by-state-${state?.toLowerCase()}`;
        const response = await contentfulService.getFoundationalPageBySlug(contentfulSlug);
        
        if (response) {
          setPageData({
            title: response.pageName || `Medicare in ${state}`,
            pageName: response.pageName || `Medicare in ${state}`,
            pageSlug: response.pageSlug,
            subtitle: response.metadata?.title,
            fBodyContent: response.fBodyContent || {},
            callToAction: response.callToAction,
            author: response.author,
            youTubeVideo: response.youTubeVideo,
            relatedBlogs: response.relatedBlogs || [],
            metadata: response.metadata
          });
        } else {
          setError('Failed to load page content');
        }
      } catch (err) {
        console.error(`Error fetching Medicare ${state} data:`, err);
        setError('Failed to load page content');
      } finally {
        setLoading(false);
      }
    };

    if (state) {
      fetchData();
    }
  }, [state]);

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
        title={pageData?.title}
        description={pageData?.metadata?.description}
        schemaType="statepage"
        schemaData={{
          title: pageData?.title,
          description: pageData?.metadata?.description,
          url: `https://www.bobbybrockinsurance.com/medicare/by-state/${state}`
        }}
      />
      {pageData && <StatePageTemplate page={pageData} breadcrumbItems={breadcrumbItems} />}
    </Layout>
  );
};

export default MedicareByState; 