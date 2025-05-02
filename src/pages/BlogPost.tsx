
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout/Layout';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/utils/seo';
import ContentfulService from '@/services/contentfulService';
import CTASection from '@/components/Home/CTASection';
import BlogPostTemplate from '@/components/Templates/BlogPostTemplate';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const contentfulService = ContentfulService.getInstance();

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => contentfulService.getBlogPostBySlug(slug || ''),
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

  const blogData = blog.fields;
  const publishDate = new Date(blog.sys.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: blogData.title, path: `/blog/${slug}`, isLast: true }
  ];

  // Transform data for BlogPostTemplate
  const templateData = {
    title: blogData.title,
    publishDate,
    author: blogData.author?.fields?.name || undefined,
    featuredImage: blogData.featuredImage?.fields?.file?.url ? `https:${blogData.featuredImage.fields.file.url}` : undefined,
    content: blogData.content,
    tags: blogData.tags,
    relatedPosts: blogData.relatedPosts?.map((relatedPost: any) => ({
      title: relatedPost.fields.title,
      slug: relatedPost.fields.slug,
      featuredImage: relatedPost.fields.featuredImage?.fields?.file?.url 
        ? `https:${relatedPost.fields.featuredImage.fields.file.url}`
        : undefined
    })) || []
  };

  return (
    <Layout>
      <SEO 
        title={blogData.title}
        description={blogData.description || blogData.title}
        ogImage={templateData.featuredImage}
        ogType="article"
        schemaType="blogpost"
        schemaData={{
          author: templateData.author,
          datePublished: blog.sys.createdAt,
          dateModified: blog.sys.updatedAt
        }}
      />

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <BlogPostTemplate post={templateData} />
      
      <CTASection />
    </Layout>
  );
};

export default BlogPost;
