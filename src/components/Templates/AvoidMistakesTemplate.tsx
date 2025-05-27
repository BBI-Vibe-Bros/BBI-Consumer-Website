import React, { useEffect, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import RichTextRenderer from '@/components/Content/RichTextRenderer';
import ContentfulService from '@/services/contentfulService';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface AvoidMistakesTemplateProps {
  page: {
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
  onLeadCaptureClick?: (e: React.MouseEvent) => void;
}

const AvoidMistakesTemplate = ({ page, onLeadCaptureClick }: AvoidMistakesTemplateProps) => {
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
      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex lg:flex-row lg:space-x-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
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
                <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {relatedBlogs.map((blog) => (
                    <div key={blog.slug} className="border border-gray-200 rounded-lg p-4 bg-white h-full flex flex-col">
                      {blog.featuredImage && (
                        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden mb-2">
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      )}
                      <h3 className="text-lg font-medium group-hover:text-bb-blue mb-2">
                        {blog.title}
                      </h3>
                      {blog.excerpt && (
                        <p className="text-gray-600 mb-4">
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
          <aside className="sticky top-20 md:top-24 self-start mt-8 lg:mt-0 lg:w-[340px] xl:w-[380px]">
            <div className="space-y-6">
              {/* Lead Magnet Section - Customized for Avoid Mistakes */}
              <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                <h3 className="leading-snug text-2xl mb-2">Avoid Costly Medicare <i>Mistakes</i></h3>
                <h4 className="text-base leading-normal text-bb-dark mb-2">Your Free Guide to Smart Decisions</h4>
                <p className="leading-normal text-gray-700 mb-4">
                  Don't let Medicare mistakes cost you thousands. This free guide reveals the most common pitfalls and how to avoid them, so you can make confident decisions about your coverage.
                </p>
                <Button 
                  onClick={onLeadCaptureClick}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
                >
                  Download Free Guide
                  <Download className="inline-block" size={20} />
                </Button>
              </div>

              {/* Table of Contents */}
              <Sidebar content={page.fBodyContent} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default AvoidMistakesTemplate; 