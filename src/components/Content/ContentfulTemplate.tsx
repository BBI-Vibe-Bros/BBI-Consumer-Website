import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ContentfulService from '@/services/contentfulService';
import SchemaGenerator from '@/utils/schemaGenerator';
import SEO from '@/components/SEO';
import RichTextRenderer from './RichTextRenderer';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Skeleton } from '@/components/ui/skeleton';

interface ContentfulTemplateProps {
  slug: string;
  contentType: 'foundationalPage' | 'blogPost' | 'resource';
  title?: string;
  description?: string;
}

const ContentfulTemplate = ({
  slug,
  contentType,
  title: customTitle,
  description: customDescription,
}: ContentfulTemplateProps) => {
  console.log('ContentfulTemplate props:', { slug, contentType, customTitle, customDescription });

  const { data: content, isLoading, error } = useQuery<any>({
    queryKey: [contentType, slug],
    queryFn: () => {
      console.log('Executing query for:', { contentType, slug });
      switch (contentType) {
        case 'foundationalPage':
          return ContentfulService.getInstance().getFoundationalPageBySlug(slug);
        case 'blogPost':
          return ContentfulService.getInstance().getBlogPostBySlug(slug);
        case 'resource':
          return ContentfulService.getInstance().getResourceBySlug(slug);
        default:
          throw new Error(`Unsupported content type: ${contentType}`);
      }
    },
  });

  console.log('Query result:', { content, isLoading, error });

  useEffect(() => {
    if (content) {
      console.log('Content received:', content);
      const schema = SchemaGenerator.generate({
        type: contentType === 'blogPost' ? 'BlogPosting' : 'WebPage',
        data: {
          title: customTitle || content.title,
          description: customDescription || content.excerpt,
          url: window.location.href,
          ...(contentType === 'blogPost' && {
            datePublished: content.publishedDate,
            author: content.author?.name,
          }),
        },
      });

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [content, contentType, customTitle, customDescription]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-12 w-3/4 mb-6" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <Skeleton className="h-4 w-4/6 mb-4" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Content Not Found</h1>
            <p className="text-gray-600">
              We couldn't find the content you're looking for. It might have been removed or the URL might be incorrect.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const title = customTitle || content.title;
  const description = customDescription || content.excerpt || content.title;

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={title}
        description={description}
        {...(contentType === 'blogPost' && {
          type: 'article',
          publishedTime: content.publishedDate,
          author: content.author?.name,
        })}
      />
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{title}</h1>
          
          {contentType === 'foundationalPage' && (
            <>
              {console.log('fBodyContent:', content.fBodyContent)}
              {content.fBodyContent && <RichTextRenderer content={content.fBodyContent} />}
            </>
          )}
          {contentType === 'blogPost' && (
            <>
              {console.log('contentBody:', content.contentBody)}
              {content.contentBody && <RichTextRenderer content={content.contentBody} />}
            </>
          )}
          {contentType === 'resource' && (
            <>
              {console.log('resource content:', content.content)}
              {content.content && <RichTextRenderer content={content.content} />}
            </>
          )}
          
          {contentType === 'blogPost' && content.author && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                {content.author.photo && (
                  <img
                    src={content.author.photo}
                    alt={content.author.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <div>
                  <p className="font-semibold">{content.author.name}</p>
                  {content.publishedDate && (
                    <p className="text-sm text-gray-600">
                      {content.publishedDate}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContentfulTemplate; 