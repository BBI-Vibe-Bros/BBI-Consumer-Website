import { Helmet } from 'react-helmet-async';
import { metaConfig } from '@/config/meta';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

export const SEO = ({
  title,
  description = metaConfig.description.default,
  image = metaConfig.openGraph.images[0].url,
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = metaConfig.openGraph.type,
  noIndex = false
}: SEOProps) => {
  const pageTitle = title 
    ? metaConfig.title.template.replace('%s', title)
    : metaConfig.title.default;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex" />}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={metaConfig.openGraph.site_name} />
      <meta property="og:locale" content={metaConfig.openGraph.locale} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={metaConfig.twitter.card} />
      <meta name="twitter:site" content={metaConfig.twitter.site} />
      <meta name="twitter:creator" content={metaConfig.twitter.creator} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO; 