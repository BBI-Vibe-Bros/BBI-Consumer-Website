import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface RichTextRendererProps {
  content: any; // Contentful rich text document
  className?: string;
  planType?: 'part-a' | 'part-b' | 'part-c' | 'part-d' | 'advantage' | 'supplement' | 'prescription';
}

// Embedded Entry Components
const EmbeddedResource = ({ entry }: { entry: any }) => (
  <div className="my-6 p-4 border border-gray-200 rounded-lg">
    <h3 className="font-bold mb-2">{entry.title}</h3>
    <Link
      to={`/resources/${entry.slug}`}
      className="text-bbi-blue hover:text-bbi-red"
    >
      Learn More →
    </Link>
  </div>
);

const EmbeddedVideo = ({ entry }: { entry: any }) => {
  const videoUrl = entry.videoUrl;
  const isSelfHosted = entry.isSelfHosted;
  const title = entry.title;
  const thumbnail = entry.thumbnailImage;

  if (!videoUrl) return null;

  if (isSelfHosted) {
    return (
      <div className="my-6">
        <video
          src={videoUrl}
          controls
          poster={thumbnail}
          className="w-full rounded-lg"
        >
          Sorry, your browser does not support embedded videos.
        </video>
      </div>
    );
  }

  return (
    <div className="my-6">
      <iframe
        src={videoUrl}
        title={title}
        className="w-full aspect-video rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

const EmbeddedYouTube = ({ entry }: { entry: any }) => {
  const link = entry.youTubeLink;
  if (!link) return null;
  
  // Extract YouTube video ID from the link
  const match = link.match(/(?:youtu.be\/|youtube.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  const videoId = match ? match[1] : null;
  if (!videoId) return null;
  
  return (
    <div className="my-6 max-w-4xl mb-*">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={entry.title || 'YouTube Video'}
        className="w-full aspect-video rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

const EmbeddedWebsiteCTA = ({ entry }: { entry: any }) => {
  console.log('Website CTA entry:', JSON.stringify(entry, null, 2));
  
  // Extract fields from the entry structure
  const fields = entry.fields || {};
  
  // Map Contentful fields to our expected structure
  const title = fields.ctaTitle || '';
  const description = fields.ctaCopy?.content?.[0]?.content?.[0]?.value || '';
  const buttonText = fields.ctaButtonText || '';
  const buttonLink = fields.ctaButtonLink || '';
  const imageUrl = fields.ctaImage?.fields?.file?.url ? `https:${fields.ctaImage.fields.file.url}` : '';

  console.log('Extracted CTA fields:', {
    title,
    description,
    buttonText,
    buttonLink,
    imageUrl,
    rawFields: fields
  });

  const isNonEmpty = (val: any) =>
    typeof val === 'string' ? val.trim().length > 0 : !!val;

  if (
    !isNonEmpty(title) &&
    !isNonEmpty(description) &&
    !isNonEmpty(buttonText) &&
    !isNonEmpty(buttonLink)
  ) {
    console.warn('Website CTA missing required fields:', {
      title,
      description,
      buttonText,
      buttonLink,
      imageUrl,
      rawFields: fields
    });
    return null;
  }

  return (
<div className="my-3 rounded-lg border-4 border-[#d5effc] overflow-hidden bg-[#d5effc]">
  <div className="flex flex-col gap-4 md:flex-row items-stretch">
    {imageUrl && (
      <div className="md:w-[280px] md:flex-shrink-0">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    )}
        <div className={`${imageUrl ? 'md:w-2/3' : 'w-full'}`}>
        <div className="p-6">
          {isNonEmpty(title) && <h3 className="font-bold mb-2 text-bbi-blue">{title}</h3>}
          {isNonEmpty(description) && <p className="mb-4 text-gray-700">{description}</p>}
          {isNonEmpty(buttonText) && isNonEmpty(buttonLink) && (
            <a
              href={buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-[#fadb21] text-bb-dark hover:text-[#fadb21] text-sm font-medium rounded hover:bg-[#002a3a] transition-colors duration-300 transform"
            >
              {buttonText}
            </a>
          )}
        </div>  
        </div>
      </div>
    </div>
  );
};

const EmbeddedBlogPost = ({ entry }: { entry: any }) => (
  <div className="my-3 rounded-lg border-4 border-[#d5effc] overflow-hidden bg-[#d5effc]">
    {entry.featuredImage && (
      <img
        src={entry.featuredImage}
        alt={entry.title}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
    )}
    <h3 className="font-bold mb-2">{entry.title}</h3>
    <p className="text-gray-600 mb-4">{entry.excerpt}</p>
    <Link
      to={`/blog/${entry.slug}`}
      className="text-bbi-blue hover:text-bbi-red"
    >
      Read More →
    </Link>
  </div>
);

const EmbeddedFoundationalPage = ({ entry }: { entry: any }) => {
  console.log('Foundational Page Entry:', JSON.stringify(entry, null, 2));
  console.log('Entry Keys:', Object.keys(entry));
  
  const imageUrl = entry.fShareImage?.fields?.file?.url ? `https:${entry.fShareImage.fields.file.url}` : '';
  const description = entry.fPageExcerpt || '';

  // Handle parentSlug logic for top-level and nested pages
  const parent = entry.parentSlug || '';
  const pageSlug = entry.pageSlug || '';
  let link = parent === '/'
    ? `/${pageSlug}`
    : `/${parent.replace(/^\/+|\/+$/g, '')}/${pageSlug.replace(/^\/+/, '')}`;
  link = link.replace(/\/+/g, '/'); // Remove any accidental double slashes

  console.log('Extracted Description:', description);
  
  return (
    <div className="my-3 rounded-lg border-4 border-[#d5effc] overflow-hidden bg-[#d5effc]">
      <div className="flex flex-col md:flex-row items-stretch">
        {imageUrl && (
          <div className="md:w-[280px] md:flex-shrink-0">
            <img
              src={imageUrl}
              alt={entry.pageName}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4 flex flex-col justify-center">
          <h3 className="font-bold mb-2">{entry.pageName}</h3>
          {description && <p className="text-bb-dark text-sm leading-snug mb-4">{description}</p>}
          <Link
            to={link}
            className="inline-block mx-auto px-4 py-4 bg-[#fadb21] text-bb-dark hover:text-[#fadb21] text-sm font-medium rounded hover:bg-[#002a3a] transition-colors duration-300 transform"
          >
            Dive Deeper →
          </Link>
        </div>
      </div>
    </div>
  );
};

const RichTextRenderer = ({ content, className, planType }: RichTextRendererProps) => {
  console.log('RichTextRenderer props:', { content, className, planType });

  if (!content) {
    console.warn('RichTextRenderer: No content provided');
    return null;
  }

  // Add detailed logging for content structure
  console.log('Content structure:', {
    nodeType: content.nodeType,
    content: content.content?.map(node => ({
      nodeType: node.nodeType,
      data: node.data,
      content: node.content?.length
    }))
  });

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => (
        <strong className="font-bold">{text}</strong>
      ),
      [MARKS.ITALIC]: (text: React.ReactNode) => (
        <em className="italic">{text}</em>
      ),
      [MARKS.UNDERLINE]: (text: React.ReactNode) => (
        <u className="underline">{text}</u>
      ),
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">
          {text}
        </code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
        <p className="mb-4 leading-loose tracking-normal text-gray-800 last:mb-0">
          {children}
        </p>
      ),
      [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => {
        // Extract text for id
        const text = node.content
          .map((content: any) => content.value)
          .join('')
          .trim();
        const id = text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined;
        return (
          <h1 id={id} className="mb-6 tracking-normal text-bbi-blue">{children}</h1>
        );
      },
      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => {
        const text = node.content
          .map((content: any) => content.value)
          .join('')
          .trim();
        const id = text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined;
        return (
          <h2 id={id} className="mb-5 text-bbi-blue">{children}</h2>
        );
      },
      [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => {
        const text = node.content
          .map((content: any) => content.value)
          .join('')
          .trim();
        const id = text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined;
        return (
          <h3 id={id} className="mb-4 text-bbi-blue">{children}</h3>
        );
      },
      [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => {
        const text = node.content
          .map((content: any) => content.value)
          .join('')
          .trim();
        const id = text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined;
        return (
          <h4 id={id} className="mb-3 text-bbi-blue">{children}</h4>
        );
      },
      [BLOCKS.HEADING_5]: (node: any, children: React.ReactNode) => {
        const text = node.content
          .map((content: any) => content.value)
          .join('')
          .trim();
        const id = text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined;
        return (
          <h5 id={id} className="mb-2 text-bbi-blue">{children}</h5>
        );
      },
      [BLOCKS.HEADING_6]: (node: any, children: React.ReactNode) => {
        const text = node.content
          .map((content: any) => content.value)
          .join('')
          .trim();
        const id = text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined;
        return (
          <h6 id={id} className="mb-2 text-bbi-blue">{children}</h6>
        );
      },
      [BLOCKS.UL_LIST]: (_node: any, children: React.ReactNode) => (
        <ul className="mb-4">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_node: any, children: React.ReactNode) => (
        <ol className="mb-4">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node: any, children: React.ReactNode) => (
        <li className="mb-2 last:mb-0">{children}</li>
      ),
      [BLOCKS.QUOTE]: (_node: any, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-bbi-blue pl-4 italic my-4">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-6 border-t border-gray-200" />,
      [BLOCKS.TABLE]: (_node: any, children: React.ReactNode) => (
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse">
            <tbody>
              {children}
            </tbody>
          </table>
        </div>
      ),
      [BLOCKS.TABLE_ROW]: (_node: any, children: React.ReactNode) => (
        <tr className="border-b font-body border-gray-200">{children}</tr>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (_node: any, children: React.ReactNode) => (
        <th className="px-4 py-2 text-left font-body bg-gray-100">
          {children}
        </th>
      ),
      [BLOCKS.TABLE_CELL]: (_node: any, children: React.ReactNode) => (
        <td className="px-4 py-2 text-left">{children}</td>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { title, description, url } = node.data.target;
        const isImage = url?.endsWith('.jpg') || url?.endsWith('.png') || url?.endsWith('.gif');
        const isPDF = url?.endsWith('.pdf');

        if (isImage) {
          return (
            <figure className="my-6">
              <img
                src={url}
                alt={description || title}
                className="max-w-full h-auto rounded-lg"
                loading="lazy"
              />
              {description && (
                <figcaption className="text-gray-600 mt-2">
                  {description}
                </figcaption>
              )}
            </figure>
          );
        }

        if (isPDF) {
          return (
            <div className="my-6">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-bbi-blue hover:text-bbi-red"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                {title}
              </a>
            </div>
          );
        }

        return null;
      },
      ['embedded-entry-block']: (node: any) => {
        console.log('Embedded entry block node:', JSON.stringify(node, null, 2));
        const entry = node.data.target;
        
        // Add more detailed logging for the entry
        console.log('Embedded entry details:', {
          sys: entry.sys,
          fields: entry.fields,
          contentType: entry.sys?.contentType?.sys?.id || entry.contentType,
          rawEntry: entry
        });

        // Robustly extract contentType and fields
        const contentType = entry.sys?.contentType?.sys?.id || entry.contentType;
        const fields = entry.fields || {};

        console.log('Embedded entry type:', contentType);
        console.log('Embedded entry fields:', fields);

        switch (contentType) {
          case 'resourceGuide':
            return <EmbeddedResource entry={fields} />;
          case 'video':
            return <EmbeddedVideo entry={fields} />;
          case 'youTubeEmbed':
            return <EmbeddedYouTube entry={fields} />;
          case 'websiteCta':
            // Pass the entire entry for website CTA since it needs both sys and fields
            return <EmbeddedWebsiteCTA entry={entry} />;
          case 'blogPost':
            return <EmbeddedBlogPost entry={fields} />;
          case 'foundationalPage':
            return <EmbeddedFoundationalPage entry={fields} />;
          default:
            console.warn(`Unhandled embedded entry type: ${contentType}`, entry);
            return null;
        }
      },
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
        <a
          href={node.data.uri}
          target={node.data.uri.startsWith('http') ? '_blank' : undefined}
          rel={node.data.uri.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="text-bbi-blue hover:text-bbi-red underline"
        >
          {children}
        </a>
      ),
      [INLINES.ENTRY_HYPERLINK]: (node: any, children: React.ReactNode) => {
        const entry = node.data.target;
        return (
          <Link 
            to={`/${entry.contentType}/${entry.slug}`}
            className="text-bbi-blue hover:text-bbi-red underline"
          >
            {children}
          </Link>
        );
      },
      [INLINES.ASSET_HYPERLINK]: (node: any, children: React.ReactNode) => (
        <a
          href={node.data.target.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-bbi-blue hover:text-bbi-red underline"
        >
          {children}
        </a>
      ),
    },
  };

  // Apply Medicare-specific styling if planType is provided
  const customOptions = planType ? {
    ...options,
    renderNode: {
      ...options.renderNode,
      [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
        <p className="mb-4 leading-relaxed text-gray-800">
          {children}
        </p>
      ),
      [BLOCKS.HEADING_2]: (_node: any, children: React.ReactNode) => (
        <h2 className="text-2xl font-bold mb-5 text-bbi-blue">
          {children}
        </h2>
      ),
    },
  } : options;

  return (
    <div className={cn('prose prose-lg max-w-none', className)}>
      {documentToReactComponents(content, customOptions)}
    </div>
  );
};

export default RichTextRenderer; 