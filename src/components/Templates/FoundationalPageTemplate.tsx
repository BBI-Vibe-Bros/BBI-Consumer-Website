
import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

interface FoundationalPageTemplateProps {
  page: {
    title: string;
    subtitle?: string;
    heroImage?: string;
    content: Document;
    callToAction?: any;
    author?: any;
    youTubeVideo?: string;
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
        {/* YouTube Video if available */}
        {page.youTubeVideo && (
          <div className="mb-10 w-full max-w-4xl mx-auto">
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                className="w-full h-[400px] rounded-lg"
                src={`https://www.youtube.com/embed/${page.youTubeVideo}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
          </div>
        )}

        <article className="prose max-w-none lg:prose-lg mb-12">
          {documentToReactComponents(page.content)}
        </article>

        {/* Author info if available */}
        {page.author && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8 flex items-center">
            {page.author.fields?.photo?.fields?.file?.url && (
              <div className="mr-4">
                <img 
                  src={`https:${page.author.fields.photo.fields.file.url}`} 
                  alt={page.author.fields.name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-semibold text-lg">{page.author.fields?.name}</p>
              {page.author.fields?.title && (
                <p className="text-gray-600">{page.author.fields.title}</p>
              )}
            </div>
          </div>
        )}

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

        {/* Call to Action if available */}
        {page.callToAction && (
          <div className="bg-bb-blue text-white p-8 rounded-lg my-8 text-center">
            <h3 className="text-2xl font-bold mb-3">{page.callToAction.fields?.heading}</h3>
            {page.callToAction.fields?.subheading && (
              <p className="mb-6">{page.callToAction.fields.subheading}</p>
            )}
            {page.callToAction.fields?.buttonText && page.callToAction.fields?.buttonLink && (
              <a 
                href={page.callToAction.fields.buttonLink} 
                className="bg-white text-bb-blue font-medium py-2 px-6 rounded-md hover:bg-gray-100 transition-colors"
              >
                {page.callToAction.fields.buttonText}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoundationalPageTemplate;
