import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import ContentfulService from '@/services/contentfulService';
import FoundationalPageTemplate from '@/components/Templates/FoundationalPageTemplate';
import { Skeleton } from '@/components/ui/skeleton';
import SEO from '@/components/SEO';
import { SchemaGenerator } from '@/utils/schemaGenerator';
import { Document } from '@contentful/rich-text-types';

interface FoundationalPageResponse {
  pageName: string;
  pageSlug: string;
  title?: string;
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
    heroImage?: string;
  };
  fBodyContent: Document;
  callToAction?: {
    title?: string;
    text?: string;
    buttonText?: string;
    buttonLink?: string;
  };
  author?: string;
  youTubeVideo?: string;
  relatedBlogs?: Array<{
    title: string;
    slug: string;
    featuredImage?: string;
    excerpt?: string;
  }>;
}

const GaryAlfordInsurance = () => {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<FoundationalPageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const contentfulService = ContentfulService.getInstance();
        const response = await contentfulService.getFoundationalPageBySlug('gary-alford-insurance') as FoundationalPageResponse;
        
        if (response) {
          // Transform the response to match the expected format
          setPageData({
            pageName: response.pageName || 'Gary Alford Insurance',
            pageSlug: 'gary-alford-insurance',
            title: response.title,
            metadata: response.metadata,
            fBodyContent: {
              ...response.fBodyContent,
              content: response.fBodyContent?.content?.map((node: any) => {
                if (node.nodeType === 'embedded-entry-block') {
                  const entry = node.data.target;
                  const contentType = entry.sys?.contentType?.sys?.id;
                  const fields = entry.fields || {};

                  // Transform the entry based on its content type
                  switch (contentType) {
                    case 'resourceGuide':
                      return {
                        ...node,
                        data: {
                          ...node.data,
                          target: {
                            ...entry,
                            fields: {
                              title: fields.title || '',
                              slug: fields.slug || '',
                            }
                          }
                        }
                      };
                    case 'video':
                      return {
                        ...node,
                        data: {
                          ...node.data,
                          target: {
                            ...entry,
                            fields: {
                              title: fields.title || '',
                              videoUrl: fields.videoUrl || '',
                              isSelfHosted: fields.isSelfHosted || false,
                              thumbnailImage: fields.thumbnailImage || null,
                            }
                          }
                        }
                      };
                    case 'youTubeEmbed':
                      return {
                        ...node,
                        data: {
                          ...node.data,
                          target: {
                            ...entry,
                            fields: {
                              title: fields.title || '',
                              youTubeLink: fields.youTubeLink || '',
                            }
                          }
                        }
                      };
                    case 'websiteCta':
                      const hasRequiredFields = fields.title || fields.description || fields.buttonText || fields.buttonLink;
                      if (!hasRequiredFields) {
                        console.warn('Website CTA missing all required fields:', entry);
                        return null;
                      }
                      return {
                        ...node,
                        data: {
                          ...node.data,
                          target: {
                            ...entry,
                            fields: {
                              title: fields.title || '',
                              description: fields.description || '',
                              buttonText: fields.buttonText || '',
                              buttonLink: fields.buttonLink || '',
                            }
                          }
                        }
                      };
                    case 'blogPost':
                      return {
                        ...node,
                        data: {
                          ...node.data,
                          target: {
                            ...entry,
                            fields: {
                              title: fields.title || '',
                              slug: fields.slug || '',
                              excerpt: fields.excerpt || '',
                              featuredImage: fields.featuredImage?.fields?.file?.url 
                                ? `https:${fields.featuredImage.fields.file.url}` 
                                : '',
                            }
                          }
                        }
                      };
                    case 'foundationalPage':
                      return {
                        ...node,
                        data: {
                          ...node.data,
                          target: {
                            ...entry,
                            fields: {
                              pageName: fields.pageName || '',
                              pageSlug: fields.pageSlug || '',
                              metadata: fields.metadata || {},
                            }
                          }
                        }
                      };
                    default:
                      console.warn(`Unhandled embedded entry type: ${contentType}`);
                      return node;
                  }
                } else if (node.nodeType === 'embedded-asset-block') {
                  // Handle embedded assets (images, PDFs, etc.)
                  const asset = node.data.target;
                  const fields = asset.fields || {};
                  
                  return {
                    ...node,
                    data: {
                      ...node.data,
                      target: {
                        title: fields.title || '',
                        description: fields.description || '',
                        url: fields.file?.url ? `https:${fields.file.url}` : '',
                        contentType: fields.file?.contentType || '',
                        fileName: fields.file?.fileName || '',
                        details: fields.file?.details || {},
                      }
                    }
                  };
                }
                return node;
              }).filter(Boolean) || []
            },
            callToAction: response.callToAction,
            author: response.author,
            youTubeVideo: response.youTubeVideo,
            relatedBlogs: response.relatedBlogs || [],
          });
        } else {
          setError('Failed to load page content');
        }
      } catch (err) {
        console.error('Error fetching Gary Alford Insurance data:', err);
        setError('Failed to load page content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const schemaData = pageData ? SchemaGenerator.generate({
    type: 'FoundationalPage',
    data: {
      title: pageData.metadata?.title || pageData.pageName || 'Gary Alford Insurance',
      description: pageData.metadata?.description || 'Learn more about Gary Alford Insurance services and coverage options.',
      url: 'https://www.bobbybrockinsurance.com/gary-alford-insurance',
      datePublished: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0]
    }
  }) : null;

  return (
    <Layout>
      <SEO 
        title={pageData?.metadata?.title || pageData?.pageName || 'Gary Alford Insurance'}
        description={pageData?.metadata?.description || 'Learn more about Gary Alford Insurance services and coverage options.'}
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

export default GaryAlfordInsurance;

