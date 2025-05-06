interface SEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  schema?: Record<string, any>;
  keywords?: string[];
}

export const SEO = ({
  title,
  description,
  canonicalPath,
  ogImage = '/default-og.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  schema,
  keywords = [],
}: SEOProps) => {
  const siteUrl = 'https://tupelomedicareconnect.com';
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      )}
    </>
  );
}; 