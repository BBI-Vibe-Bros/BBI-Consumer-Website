import React, { useEffect, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import RichTextRenderer from '@/components/Content/RichTextRenderer';
import ContentfulService from '@/services/contentfulService';
import { Skeleton } from '@/components/ui/skeleton';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Breadcrumb from '@/components/Navigation/Breadcrumb';

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast?: boolean;
}

interface FoundationalPageTemplateProps {
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
}

const STATIC_BLOGS = [
  {
    title: 'What to Do If Your Medicare Card Expires, Is Lost, or Damaged!',
    slug: '/blog/medicare-card-expired',
    image: '/static/sidebar-blog-1.png',
  },
  {
    title: '3 Reasons Why Medicare Supplements Rates Increase',
    slug: '/blog/medicare-supplements-increase',
    image: '/static/sidebar-blog-2.png',
  },
  {
    title: 'Is Original Medicare Parts A & B Enough Coverage?',
    slug: '/blog/original-medicare-enough',
    image: '/static/sidebar-blog-3.png',
  },
];
const STATIC_GUIDES = [
  { title: 'Understanding Medicare', slug: '/resources/medicare-overview' },
  { title: 'Medicare Advantage', slug: '/resources/medicare-advantage' },
  { title: 'Medicare Supplement', slug: '/resources/medicare-supplements' },
  { title: 'Medicare Part D', slug: '/resources/medicare-part-d' },
];

const FoundationalPageTemplate = ({ page }: FoundationalPageTemplateProps) => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [blogError, setBlogError] = useState<string | null>(null);
  const location = useLocation();

  // Defensive fallback for relatedBlogs
  const relatedBlogs = Array.isArray(page.relatedBlogs) ? page.relatedBlogs : [];

  // Debug log
  useEffect(() => {
    console.log('relatedBlogs:', relatedBlogs);
  }, [relatedBlogs]);

  // Build journey-style breadcrumb items based on the current path
  const getBreadcrumbItems = () => {
    const path = location.pathname;
    const items: BreadcrumbItem[] = [];

    // Plans section breadcrumbs
    if (path.startsWith('/plans/')) {
      // Add all plan types
      const planItems = [
        { label: 'Medicare Advantage', path: '/plans/medicare-advantage' },
        { label: 'Medicare Supplements', path: '/plans/medicare-supplements' },
        { label: 'Prescription Drug Plans', path: '/plans/medicarepartd' },
        { label: 'Medicare Add-Ons', path: '/plans/medicare-add-on-coverage-options' }
      ];

      // Add all items, marking the current one as last
      planItems.forEach(item => {
        items.push({
          ...item,
          isLast: path === item.path
        });
      });
    }
    // Basics section breadcrumbs
    else if (path.startsWith('/medicare/')) {
      // Add all basic pages
      const basicItems = [
        { label: 'What is Medicare?', path: '/medicare/what-is-medicare' },
        { label: 'The 4 Parts of Medicare', path: '/medicare/four-parts-of-medicare' },
        { label: 'Enrollment Periods', path: '/medicare/enrollment-periods' },
        { label: 'Medicare Costs', path: '/medicare/medicare-costs' },
        { label: 'Medicare Eligibility', path: '/medicare/eligibility' }
      ];

      // Add all items, marking the current one as last
      basicItems.forEach(item => {
        items.push({
          ...item,
          isLast: path === item.path
        });
      });
    }

    // If no specific breadcrumb was built, use the page title
    if (items.length === 0) {
      items.push({ 
        label: page.pageName || page.title || 'Page', 
        path: path,
        isLast: true 
      });
    }

    return items;
  };

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoadingBlogs(true);
        const contentfulService = ContentfulService.getInstance();
        const response = await contentfulService.getBlogPosts(3);
        
        console.log('Blog posts response:', response);
        
        if (response && response.items) {
          const mappedPosts = response.items.map((item: any) => {
            console.log('Processing blog post item:', item);
            return {
              title: item.fields.title,
              slug: item.fields.slug,
              image: item.fields.featuredImage?.fields?.file?.url 
                ? `https:${item.fields.featuredImage.fields.file.url}` 
                : '/static/blog-placeholder.png',
              excerpt: item.fields.excerpt
            };
          });
          
          console.log('Mapped blog posts:', mappedPosts);
          setBlogPosts(mappedPosts);
        } else {
          console.warn('No blog posts found in response');
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
      {/* Hero Section (now outside container) */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-8 lg:py-4">
        <div className="container mx-auto px-3">
          {/* Breadcrumb Navigation */}
          <div className="-ml-3 py-4">
            <Breadcrumb items={getBreadcrumbItems()} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
            <div className="max-w-4xl object-contain">
              <h1 className="font-heading font-bold text-6xl text-bb-dark mb-6 leading-tight">
                {page.title || page.metadata?.title || page.pageName || 'NO TITLE FOUND'}
              </h1>
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
          <aside className="sticky top-0 self-start mt-8 lg:mt-0 lg:w-1/3">
            <Sidebar content={page.fBodyContent} />
          </aside>
        </div>
      </div>
    </>
  );
};

export default FoundationalPageTemplate;
