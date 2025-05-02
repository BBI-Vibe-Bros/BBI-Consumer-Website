
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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const contentfulService = ContentfulService.getInstance();

  const { data: blogPost, isLoading, error } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => contentfulService.getBlogPostBySlug(slug || ''),
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

  if (error || !blogPost) {
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

  const post = blogPost.fields;
  const publishDate = new Date(blogPost.sys.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Configure rich text options
  const richTextOptions = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
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
              alt={title || 'Blog image'}
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
    { label: 'Blog', path: '/blog' },
    { label: post.title, path: `/blog/${slug}`, isLast: true }
  ];

  return (
    <Layout>
      <SEO 
        title={post.title}
        description={post.excerpt || ''}
        ogImage={post.featuredImage?.fields?.file?.url ? `https:${post.featuredImage.fields.file.url}` : undefined}
        ogType="article"
        schemaType="blogpost"
        schemaData={{
          author: post.author?.fields?.name || 'Bobby Brock Insurance',
          datePublished: blogPost.sys.createdAt,
          dateModified: blogPost.sys.updatedAt
        }}
      />

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <article className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-bb-dark mb-4">{post.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-8">
            <span>{publishDate}</span>
            {post.readTime && (
              <>
                <span className="mx-2">•</span>
                <span>{post.readTime} min read</span>
              </>
            )}
            {post.category && (
              <>
                <span className="mx-2">•</span>
                <span className="bg-blue-100 text-bb-blue px-3 py-1 rounded-full text-sm">
                  {post.category}
                </span>
              </>
            )}
          </div>

          {post.featuredImage?.fields?.file?.url && (
            <div className="mb-10">
              <img
                src={`https:${post.featuredImage.fields.file.url}`}
                alt={post.featuredImage.fields.title || post.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {post.content && documentToReactComponents(post.content, richTextOptions)}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-3">Related Topics:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CTASection />
    </Layout>
  );
};

export default BlogPost;
