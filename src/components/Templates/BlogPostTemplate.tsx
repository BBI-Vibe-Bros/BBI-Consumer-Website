import React from 'react';
import { Link } from 'react-router-dom';
import { Document } from '@contentful/rich-text-types';
import RichTextRenderer from '@/components/Content/RichTextRenderer';
import BlogCTA from '@/components/Home/BlogCTA';
import Breadcrumb from '@/components/Navigation/Breadcrumb';

interface BlogPostTemplateProps {
  post: {
    internalName: string;
    title: string;
    slug: string;
    publishedDate: string;
    author?: {
      name: string;
      photo?: string;
    } | string;
    category?: string | string[];
    featuredImage?: string;
    excerpt: string;
    contentBody: Document;
    seoFields?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
    relatedBlogPosts?: Array<{
      title: string;
      slug: string;
      featuredImage?: string;
    }>;
    callToAction?: {
      title?: string;
      text?: string;
      buttonText?: string;
      buttonLink?: string;
    };
  };
}

const BlogPostTemplate = ({ post }: BlogPostTemplateProps) => {
  // Debug logging
  console.log('Rendering BlogPostTemplate with:', JSON.stringify(post, null, 2));

  // Helper function to get author name
  const getAuthorName = () => {
    if (typeof post.author === 'string') return post.author;
    return post.author?.name || '';
  };

  // Breadcrumb items: Home > Blog > Current Post
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: post.title, path: `/blog/${post.slug}`, isLast: true }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Blog Header */}
      <header className="mb-8 w-1280">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} className="mb-4" />
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600 mb-6">
          {post.publishedDate && <span className="mr-4">{post.publishedDate}</span>}
          {post.author && (
            <div className="flex items-center">
              {typeof post.author !== 'string' && post.author.photo && (
                <img
                  src={post.author.photo}
                  alt={getAuthorName()}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <span>By {getAuthorName()}</span>
            </div>
          )}
        </div>
      </header>

      {/* Excerpt */}
      {post.excerpt && (
        <div className="prose max-w-none lg:prose-lg mb-8 w-1280">
          <p className="text-xl text-gray-700 italic">{post.excerpt}</p>
        </div>
      )}

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-8 w-1920">
          <img 
            src={post.featuredImage}
            alt={post.title}
            width={1920}
            height={605}
            className="w-1920 h-auto rounded-lg object-cover max-h-[605px]"
            loading="eager"
          />
        </div>
      )}

      {/* Main Content */}
      <article className="prose prose-lg max-w-none lg:prose-xl mb-8 w-1920">
        {post.contentBody && <RichTextRenderer content={post.contentBody} />}
      </article>

      {/* Call to Action */}
      <div className="mb-12 w-1920">
        <BlogCTA />
      </div>

      {/* Category */}
      {post.category && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Category:</h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 text-bb-blue px-3 py-1 rounded-full text-sm">
              {typeof post.category === 'string' ? post.category : post.category[0]}
            </span>
          </div>
        </div>
      )}

      {/* Related Posts */}
      {post.relatedBlogPosts && post.relatedBlogPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {post.relatedBlogPosts.map((related) => (
              <Link
                key={related.slug}
                to={`/blog/${related.slug}`}
                className="block group"
              >
                {related.featuredImage && (
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden mb-2">
                    <img
                      src={related.featuredImage}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <h3 className="text-lg font-medium group-hover:text-bb-blue">
                  {related.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPostTemplate;
