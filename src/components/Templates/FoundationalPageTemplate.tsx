
import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

interface FoundationalPageTemplateProps {
  page: {
    title: string;
    subtitle?: string;
    heroImage?: string;
    content: Document;
    sections?: Array<{
      title: string;
      content: Document;
      image?: string;
    }>;
  };
}

const FoundationalPageTemplate = ({ page }: FoundationalPageTemplateProps) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-bb-light-gray py-12 md:py-16 mb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-bb-dark mb-4">{page.title}</h1>
              {page.subtitle && (
                <p className="text-xl text-gray-700">{page.subtitle}</p>
              )}
            </div>
            {page.heroImage && (
              <div className="flex justify-center lg:justify-end">
                <img
                  src={page.heroImage}
                  alt={page.title}
                  className="rounded-lg object-cover max-h-[400px]"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <article className="prose max-w-none lg:prose-lg mb-12">
          {documentToReactComponents(page.content)}
        </article>

        {/* Additional Sections */}
        {page.sections && page.sections.map((section, index) => (
          <section key={index} className={`py-8 ${index % 2 === 0 ? 'bg-white' : 'bg-bb-light-gray'}`}>
            <div className="container mx-auto px-4">
              <div className={`grid grid-cols-1 ${section.image ? 'lg:grid-cols-2' : ''} gap-8 items-center`}>
                <div className={`${index % 2 !== 0 && section.image ? 'lg:order-2' : ''}`}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{section.title}</h2>
                  <div className="prose max-w-none">
                    {documentToReactComponents(section.content)}
                  </div>
                </div>
                {section.image && (
                  <div className={`${index % 2 !== 0 ? 'lg:order-1' : ''} flex justify-center`}>
                    <img
                      src={section.image}
                      alt={section.title}
                      className="rounded-lg object-cover max-w-full h-auto"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default FoundationalPageTemplate;
