
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout/Layout';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/utils/seo';
import ContentfulService from '@/services/contentfulService';
import CTASection from '@/components/Home/CTASection';
import ResourceGuideTemplate from '@/components/Templates/ResourceGuideTemplate';

const ResourceGuide = () => {
  const { slug } = useParams<{ slug: string }>();
  const contentfulService = ContentfulService.getInstance();

  const { data: guide, isLoading, error } = useQuery({
    queryKey: ['resourceGuide', slug],
    queryFn: () => contentfulService.getResourceGuideBySlug(slug || ''),
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-60 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !guide) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24">
          <h1 className="text-3xl font-bold text-center">Resource Not Found</h1>
          <p className="text-center mt-4">
            We couldn't find the resource you're looking for. It might have been removed or the URL might be incorrect.
          </p>
        </div>
      </Layout>
    );
  }

  const guideData = guide.fields;

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Resources', path: '/resources' },
    { label: 'Guides', path: '/resources/guides' },
    { label: guideData.title, path: `/resources/guides/${slug}`, isLast: true }
  ];

  // Transform data for ResourceGuideTemplate
  const templateData = {
    title: guideData.title,
    description: guideData.description || '',
    content: guideData.content,
    featuredImage: guideData.featuredImage?.fields?.file?.url ? `https:${guideData.featuredImage.fields.file.url}` : undefined,
    downloadUrl: guideData.downloadUrl || undefined,
    tags: guideData.tags || [],
    relatedResources: guideData.relatedResources?.map((resource: any) => ({
      title: resource.fields.title,
      slug: resource.fields.slug,
      type: resource.fields.resourceType || 'Guide',
      description: resource.fields.description
    })) || []
  };

  return (
    <Layout>
      <SEO 
        title={guideData.title}
        description={guideData.description || guideData.title}
        ogImage={templateData.featuredImage}
        ogType="article"
        schemaType="webpage"
        schemaData={{
          datePublished: guide.sys.createdAt,
          dateModified: guide.sys.updatedAt
        }}
      />

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <ResourceGuideTemplate guide={templateData} />
      
      <CTASection />
    </Layout>
  );
};

export default ResourceGuide;
