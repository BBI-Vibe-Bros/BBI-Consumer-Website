import React, { useEffect, useState } from 'react';
import { Document } from '@contentful/rich-text-types';
import RichTextRenderer from '@/components/Content/RichTextRenderer';
import ContentfulService from '@/services/contentfulService';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { MapPin } from 'lucide-react';
import Breadcrumb from '@/components/Navigation/Breadcrumb';

interface StatePageTemplateProps {
  page: {
    title?: string;
    pageName: string;
    author?: string;
    pageSlug: string;
    fBodyContent: Document;
    youTubeVideo?: string;
    metadata?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
    relatedBlogs?: Array<{
      title: string;
      slug: string;
      featuredImage?: string;
      excerpt?: string;
    }>;
    callToAction?: {
      title?: string;
      text?: string;
      buttonText?: string;
      buttonLink?: string;
    };
  };
  breadcrumbItems: Array<{
    label: string;
    path: string;
    isLast?: boolean;
  }>;
}

const StatePageTemplate = ({ page, breadcrumbItems }: StatePageTemplateProps) => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [blogError, setBlogError] = useState<string | null>(null);

  // Defensive fallback for relatedBlogs
  const relatedBlogs = Array.isArray(page.relatedBlogs) ? page.relatedBlogs : [];

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoadingBlogs(true);
        const contentfulService = ContentfulService.getInstance();
        const response = await contentfulService.getBlogPosts(3);
        
        if (response && response.items) {
          const mappedPosts = response.items.map((item: any) => ({
            title: item.fields.title,
            slug: item.fields.slug,
            image: item.fields.featuredImage?.fields?.file?.url 
              ? `https:${item.fields.featuredImage.fields.file.url}` 
              : '/static/blog-placeholder.png',
            excerpt: item.fields.excerpt
          }));
          setBlogPosts(mappedPosts);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setBlogError('Failed to load blog posts');
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Defensive: Only render CTA if at least one field is non-empty
  const cta = page.callToAction;
  const isNonEmpty = (val: any) =>
    typeof val === 'string' ? val.trim().length > 0 : !!val;

  const shouldShowCTA =
    cta &&
    (isNonEmpty(cta.title) ||
      isNonEmpty(cta.text) ||
      isNonEmpty(cta.buttonText) ||
      isNonEmpty(cta.buttonLink));

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-8 lg:py-4">
        <div className="container mx-auto px-3">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
            <div className="max-w-4xl object-contain">
              <div className="mb-4">
                <Breadcrumb items={breadcrumbItems} />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-8 h-8 text-bb-blue" />
                <h1 className="font-heading font-bold text-6xl text-bb-dark leading-tight">
                  {page.title || page.metadata?.title || page.pageName || 'NO TITLE FOUND'}
                </h1>
              </div>
              {page.metadata?.description && (
                <p className="font-body text-gray-700 mb-4 leading-relaxed">
                  {page.metadata.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex lg:flex-row lg:space-x-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <article className="prose max-w-none lg:prose-lg mb-8">
              <RichTextRenderer content={page.fBodyContent} />
            </article>

            {/* YouTube Video */}
            {page.youTubeVideo && (
              <div className="mb-8">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={page.youTubeVideo.includes('embed') ? page.youTubeVideo : `https://www.youtube.com/embed/${page.youTubeVideo}`}
                    title={`${page.pageName} - YouTube Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Related Blog Posts */}
            {relatedBlogs.length > 0 && (
              <section className="mt-12 w-full">
                <h2 className="font-heading font-bold mb-4">Related Articles</h2>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {relatedBlogs.map((blog) => (
                    <div key={blog.slug} className="border border-gray-20 shadow hover:shadow-md rounded p-4 bg-white h-full flex flex-col">
                      {blog.featuredImage && (
                        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded overflow-hidden mb-2">
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      )}
                      <h3 className="mb-2 group-hover:text-bb-blue">
                        {blog.title}
                      </h3>
                      {blog.excerpt && (
                        <p className="font-body text-gray-600 mb-4">
                          {blog.excerpt.length > 120
                            ? blog.excerpt.slice(0, 120).trim() + '...'
                            : blog.excerpt}
                        </p>
                      )}
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="mt-auto w-fit bg-bb-blue text-white px-4 py-2 rounded hover:bg-bb-dark-blue transition-colors text-sm font-semibold"
                      >
                        Read More
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="sticky top-20 md:top-24 self-start mt-8 lg:mt-0 lg:w-1/3">
            <Sidebar content={page.fBodyContent} />
          </aside>
        </div>
      </div>
    </>
  );
};

export default StatePageTemplate; 