import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import FoundationalPageTemplate from '@/components/Templates/FoundationalPageTemplate';
import ContentfulService from '@/services/contentfulService';
import { Skeleton } from '@/components/ui/skeleton';

const TermsOfService = () => {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const contentfulService = ContentfulService.getInstance();
        const response = await contentfulService.getFoundationalPageBySlug('terms-of-service');
        if (response) {
          setPageData(response);
        } else {
          setError('Failed to load page content');
        }
      } catch (err) {
        setError('Failed to load page content');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
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
        pageData && <FoundationalPageTemplate page={pageData} />
      )}
    </Layout>
  );
};

export default TermsOfService; 