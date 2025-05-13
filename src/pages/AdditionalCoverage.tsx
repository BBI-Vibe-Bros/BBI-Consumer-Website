import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout/Layout';
import ContentfulService from '@/services/contentfulService';
import FoundationalPageTemplate from '@/components/Templates/FoundationalPageTemplate';
import { Skeleton } from '@/components/ui/skeleton';
import CTASection from '@/components/Home/CTASection';

const AdditionalCoverage = () => {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const contentfulService = ContentfulService.getInstance();
        const response = await contentfulService.getFoundationalPageBySlug('additional-coverage');
        if (response) {
          setPageData({
            title: response.pageName || 'Add-On Medicare Coverage',
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
        console.error('Error fetching Add-On Medicare Coverage data:', err);
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
        <title>Add-On Medicare Coverage | Bobby Brock Insurance</title>
        <meta 
          name="description" 
          content="Discover what Medicare add-on coverage includes, how it supports gaps in your plan, and which policies fit specific health scenarios. Learn from Bobby Brock Insurance." 
        />
        <meta 
          name="keywords" 
          content="medicare supplemental insurance, hospital indemnity plan, cancer heart stroke coverage, dental vision hearing insurance, final expense life insurance, Tupelo MS Medicare, Mississippi Medicare plans" 
        />
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

export default AdditionalCoverage; 