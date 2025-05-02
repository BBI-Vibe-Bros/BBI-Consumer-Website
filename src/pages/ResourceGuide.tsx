
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout/Layout';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/utils/seo';
import ContentfulService from '@/services/contentfulService';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import CTASection from '@/components/Home/CTASection';

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
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-12"></div>
            <div className="h-40 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
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
          <h1 className="text-3xl font-bold text-center">Resource Guide Not Found</h1>
          <p className="text-center mt-4">
            We couldn't find the resource guide you're looking for. It might have been removed or the URL might be incorrect.
          </p>
        </div>
      </Layout>
    );
  }

  const guideData = guide.fields;
  const updatedDate = new Date(guide.sys.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Configure rich text options
  const richTextOptions = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <h2 className="text-2xl font-bold mt-8 mb-4" id={`section-${node.content[0].value.toLowerCase().replace(/\s+/g, '-')}`}>{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: any) => (
        <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: any) => (
        <ul className="list-disc ml-6 mb-6 space-y-2">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: any) => (
        <ol className="list-decimal ml-6 mb-6 space-y-2">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
        <li className="text-gray-700">{children}</li>
      ),
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a href={node.data.uri} className="text-bb-blue hover:underline" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { title, file } = node.data.target.fields;
        const imageUrl = file?.url;
        return imageUrl ? (
          <div className="my-6">
            <img
              src={`https:${imageUrl}`}
              alt={title || 'Resource image'}
              className="rounded-lg mx-auto"
            />
          </div>
        ) : null;
      }
    }
  };

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Resources', path: '/resources/guides' },
    { label: guideData.title, path: `/resources/guides/${slug}`, isLast: true }
  ];

  return (
    <Layout>
      <SEO 
        title={guideData.title}
        description={guideData.summary || ''}
        ogImage={guideData.coverImage?.fields?.file?.url ? `https:${guideData.coverImage.fields.file.url}` : undefined}
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

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <div className="lg:w-2/3">
            <h1 className="text-4xl font-bold text-bb-dark mb-4">{guideData.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-8">
              <span>Last updated: {updatedDate}</span>
            </div>

            {guideData.coverImage?.fields?.file?.url && (
              <div className="mb-10">
                <img
                  src={`https:${guideData.coverImage.fields.file.url}`}
                  alt={guideData.coverImage.fields.title || guideData.title}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}

            {guideData.summary && (
              <div className="bg-blue-50 border-l-4 border-bb-blue p-4 mb-8 rounded-r">
                <p className="text-lg font-medium">{guideData.summary}</p>
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              {guideData.content && documentToReactComponents(guideData.content, richTextOptions)}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24 border border-gray-200">
              <h2 className="text-xl font-bold mb-4">In This Guide</h2>
              {guideData.tableOfContents && (
                <ul className="space-y-2">
                  {guideData.tableOfContents.map((item: string, idx: number) => (
                    <li key={idx}>
                      <a 
                        href={`#section-${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-bb-blue hover:underline"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 pt-6 border-t border-gray-300">
                <h3 className="font-bold text-lg mb-3">Related Resources</h3>
                <ul className="space-y-3">
                  {guideData.relatedResources?.map((resource: any, idx: number) => (
                    <li key={idx}>
                      <a href={resource.fields.slug ? `/resources/guides/${resource.fields.slug}` : '#'} className="text-bb-blue hover:underline">
                        {resource.fields.title}
                      </a>
                    </li>
                  )) || (
                    <li className="text-gray-500">No related resources</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </Layout>
  );
};

export default ResourceGuide;
