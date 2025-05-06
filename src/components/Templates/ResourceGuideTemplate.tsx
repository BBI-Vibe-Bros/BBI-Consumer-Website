import React from 'react';
import { Link } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import RichTextRenderer from '@/components/Content/RichTextRenderer';

interface ResourceGuideTemplateProps {
  guide: {
    title: string;
    description: string;
    content: Document;
    featuredImage?: string;
    downloadUrl?: string;
    tags?: string[];
    relatedResources?: Array<{
      title: string;
      slug: string;
      type: string;
      description?: string;
    }>;
  };
}

const ResourceGuideTemplate = ({ guide }: ResourceGuideTemplateProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{guide.title}</h1>
        {guide.description && (
          <p className="text-xl text-gray-700 mb-6">{guide.description}</p>
        )}
      </header>

      {/* Featured Image */}
      {guide.featuredImage && (
        <div className="mb-8">
          <img
            src={guide.featuredImage}
            alt={guide.title}
            className="w-full h-auto rounded-lg object-cover max-h-[400px]"
          />
        </div>
      )}

      {/* Download Button */}
      {guide.downloadUrl && (
        <div className="mb-8">
          <a
            href={guide.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-bb-blue hover:bg-bb-light-blue text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            aria-label={`Download ${guide.title}`}
          >
            Download Resource
          </a>
        </div>
      )}

      {/* Main Content */}
      <article className="prose max-w-none lg:prose-lg mb-8">
        <RichTextRenderer content={guide.content} />
      </article>

      {/* Tags */}
      {guide.tags && guide.tags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Topics:</h2>
          <div className="flex flex-wrap gap-2">
            {guide.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related Resources */}
      {guide.relatedResources && guide.relatedResources.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guide.relatedResources.map((resource, index) => (
              <Link
                key={index}
                to={`/resources/guides/${resource.slug}`}
                className="block p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <div className="bg-bb-light-gray p-2 rounded-md">
                    <span className="text-bb-dark font-semibold text-sm uppercase">{resource.type}</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium mb-2 hover:text-bb-blue">
                      {resource.title}
                    </h3>
                    {resource.description && (
                      <p className="text-gray-700 line-clamp-2">{resource.description}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResourceGuideTemplate;
