import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout/Layout';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/utils/seo';
import ContentfulService from '@/services/contentfulService';
import BlogPostSidebar from '@/components/BlogPostSidebar';
import RichTextRenderer from '@/components/Content/RichTextRenderer';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const contentfulService = ContentfulService.getInstance();

  // Fetch blog post
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => contentfulService.getBlogPostBySlug(slug || ''),
  });

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: post?.title || 'Loading...', path: `/blog/${slug}`, isLast: true }
  ];

  return (
    <Layout>
      <SEO 
        title={post?.title || 'Blog Post'}
        description={post?.excerpt || 'Expert Medicare insurance insights and guidance.'}
        schemaType="blogpost"
      />

      <div className="bg-0">
        <div className="container mx-auto px-0 pb-5">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-16 pb-8 mb-[-4]lg:pt-20 lg:pb-5">
        <div className="container mx-auto px-3">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
            <div className="max-w-7xl object-cover">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                </div>
              ) : error ? (
                <div>
                  <h1 className="text-3xl font-bold text-bb-dark mb-6 leading-tight md:text-5xl">
                    Error Loading Post
                  </h1>
                  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                    Please try again later
                  </p>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-bb-dark mb-6 leading-tight md:text-5xl">
                    {post?.title}
                  </h1>
                  <p className="text-base text-gray-700 mb-4 leading-relaxed">
                    {post?.excerpt}
                  </p>
                  {post?.publishedDate && (
                    <p className="text-sm text-gray-500">
                      Published on {new Date(post.publishedDate).toLocaleDateString()}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex lg:flex-row lg:space-x-8">
          {/* Main Content */}
          <div className="lg:w-[65%]">
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-700">Error Loading Blog Post</h2>
                <p className="text-gray-500 mt-2">Please try again later</p>
              </div>
            ) : post ? (
              <article className="prose max-w-none lg:prose-lg">
                {post.featuredImage && (
                  <img 
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-auto object-cover mb-6 rounded-lg"
                  />
                )}
                <RichTextRenderer content={post.contentBody} />
              </article>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-700">Blog Post Not Found</h2>
                <p className="text-gray-500 mt-2">The requested blog post could not be found</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="sticky top-0 self-start mt-8 lg:mt-0 lg:w-1/4">
            {post && <BlogPostSidebar content={post.contentBody} />}
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
