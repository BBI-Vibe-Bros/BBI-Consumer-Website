import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LeadMagnetTemplate from '@/components/Templates/LeadMagnetTemplate';
import ContentfulService from '@/services/contentfulService';
import { Skeleton } from '@/components/ui/skeleton';
import Layout from '@/components/Layout/Layout';
import SEO from '@/utils/seo';

const MedicareBreakdown = () => {
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const contentfulService = ContentfulService.getInstance();
        const response = await contentfulService.getFoundationalPageBySlug('medicare-breakdown');
        
        if (response) {
          // Transform the response to match the expected format
          setPage({
            pageName: response.pageName || 'Medicare Breakdown',
            metadata: response.metadata || {},
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
                      // For Website CTA, we need to check if any required fields are present
                      const hasRequiredFields = fields.title || fields.description || fields.buttonText || fields.buttonLink;
                      if (!hasRequiredFields) {
                        console.warn('Website CTA missing all required fields:', entry);
                        return null; // Skip this entry if no required fields are present
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
                  // Handle embedded assets (images)
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
          setError('Page not found');
        }
      } catch (err) {
        console.error('Error fetching page:', err);
        setError('Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-red-600">Error: {error}</h1>
        </div>
      </Layout>
    );
  }

  if (!page) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Page not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title={page.metadata?.title || page.pageName || "Medicare Breakdown"}
        description={page.metadata?.description || "Learn about Medicare coverage options and find the right plan for your needs."}
      />
      <LeadMagnetTemplate page={page} />
    </Layout>
  );
};

export default MedicareBreakdown; 