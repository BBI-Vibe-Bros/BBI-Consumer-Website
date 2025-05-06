import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout/Layout';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/utils/seo';
import ContentfulService from '@/services/contentfulService';
import BlogPostTemplate from '@/components/Templates/BlogPostTemplate';
import Sidebar from '@/components/Sidebar';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const contentfulService = ContentfulService.getInstance();

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => contentfulService.getBlogPostBySlug(slug || ''),
    enabled: !!slug,
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

  if (error || !blog) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24">
          <h1 className="text-3xl font-bold text-center">Blog Post Not Found</h1>
          <p className="text-center mt-4">
            We couldn't find the blog post you're looking for. It might have been removed or the URL might be incorrect.
          </p>
        </div>
      </Layout>
    );
  }

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: blog.title, path: `/blog/${slug}`, isLast: true }
  ];

  // Get SEO data
  const seoTitle = blog.seoFields?.title || blog.title;
  const seoDescription = blog.seoFields?.description || blog.excerpt || blog.title;
  const ogImage = blog.featuredImage;

  return (
    <Layout>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        ogImage={ogImage}
        ogType="article"
        schemaType="blogpost"
        schemaData={{
          author: typeof blog.author === 'string' ? blog.author : blog.author?.name,
          datePublished: blog.publishedDate,
          dateModified: blog.publishedDate
        }}
      />

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex lg:flex-row lg:space-x-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <BlogPostTemplate post={blog} />
          </div>

          {/* Sidebar */}
          <aside className="sticky top-0 self-start mt-8 lg:mt-0 lg:w-1/3">
            <Sidebar />
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
