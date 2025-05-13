import React from 'react';
import { Helmet } from 'react-helmet-async';
import * as SchemaGenerator from './schemaGenerator';

// Default meta configuration as specified in the build guide
const defaultMetaConfig = {
  title: {
    template: '%s | Bobby Brock Insurance',
    default: 'Your Local Trusted Medicare Partners in Tupelo, MS | Bobby Brock Insurance'
  },
  description: {
    default: 'Expert Medicare insurance guidance and plan selection in Tupelo, MS. Compare Medicare Advantage, Supplement, and Part D plans.'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    site_name: 'Bobby Brock Insurance',
    url: 'https://www.bobbybrockinsurance.com'
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
  schemaType?: 'webpage' | 'blogpost' | 'video' | 'insurance' | 'statepage';
  schemaData?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = defaultMetaConfig.openGraph.type,
  noIndex = false,
  schema,
  schemaType,
  schemaData
}) => {
  const metaTitle = title 
    ? title + ' | Bobby Brock Insurance' 
    : defaultMetaConfig.title.default;
  
  const metaDescription = description || defaultMetaConfig.description.default;
  const url = canonical || window.location.href;

  // Generate schema if schemaType is provided but no custom schema
  let finalSchema = schema;
  if (!schema && schemaType) {
    switch (schemaType) {
      case 'webpage':
        finalSchema = SchemaGenerator.generateWebPageSchema(
          metaTitle,
          metaDescription,
          url,
          schemaData?.datePublished,
          schemaData?.dateModified,
          ogImage
        );
        break;
      case 'statepage':
        finalSchema = SchemaGenerator.generateStatePageSchema({
          title: metaTitle,
          description: metaDescription,
          url: url,
          ...schemaData
        });
        break;
      case 'blogpost':
        finalSchema = SchemaGenerator.generateBlogPostSchema(
          metaTitle,
          metaDescription,
          url,
          ogImage,
          schemaData?.author,
          schemaData?.datePublished,
          schemaData?.dateModified
        );
        break;
      case 'video':
        if (schemaData) {
          finalSchema = SchemaGenerator.generateVideoSchema(
            metaTitle,
            metaDescription,
            schemaData.thumbnailUrl || ogImage || '',
            schemaData.uploadDate || new Date().toISOString(),
            schemaData.duration,
            schemaData.contentUrl,
            schemaData.embedUrl
          );
        }
        break;
      case 'insurance':
        finalSchema = SchemaGenerator.generateInsurancePlanSchema(
          metaTitle,
          metaDescription,
          schemaData?.providerName
        );
        break;
      default:
        break;
    }
  }

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
      {finalSchema && SchemaGenerator.validateSchema(finalSchema) && (
        <script type="application/ld+json">
          {JSON.stringify(finalSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
