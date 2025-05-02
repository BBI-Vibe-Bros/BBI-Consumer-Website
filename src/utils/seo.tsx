
import React from 'react';
import { Helmet } from 'react-helmet-async';

// Default meta configuration as specified in the build guide
const defaultMetaConfig = {
  title: {
    template: '%s | Bobby Brock Insurance',
    default: 'Medicare Insurance Plans & Coverage | Bobby Brock Insurance'
  },
  description: {
    default: 'Expert Medicare insurance guidance and plan selection in Tupelo, MS. Compare Medicare Advantage, Supplement, and Part D plans.'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    site_name: 'Bobby Brock Insurance',
    url: 'https://bobbybrock.com'
  }
};

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  schema?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = defaultMetaConfig.openGraph.type,
  noIndex = false,
  schema
}) => {
  const metaTitle = title 
    ? title + ' | Bobby Brock Insurance' 
    : defaultMetaConfig.title.default;
  
  const metaDescription = description || defaultMetaConfig.description.default;
  const url = canonical || window.location.href;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* OpenGraph meta tags */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={defaultMetaConfig.openGraph.site_name} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* No index flag for pages that shouldn't be indexed */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
