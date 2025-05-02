
import React from 'react';
import { Link } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

interface BlogPostTemplateProps {
  post: {
    title: string;
    publishDate: string;
    author?: string;
    featuredImage?: string;
    content: Document;
    tags?: string[];
    relatedPosts?: Array<{
      title: string;
      slug: string;
      featuredImage?: string;
    }>;
  };
}

const BlogPostTemplate = ({ post }: BlogPostTemplateProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Blog Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600 mb-6">
          {post.publishDate && <span className="mr-4">{post.publishDate}</span>}
          {post.author && <span>By {post.author}</span>}
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-8">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-auto rounded-lg object-cover max-h-[500px]"
          />
        </div>
      )}

      {/* Blog Content */}
      <article className="prose max-w-none lg:prose-lg mb-8">
        {documentToReactComponents(post.content)}
      </article>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Topics:</h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {post.relatedPosts.map((related) => (
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
