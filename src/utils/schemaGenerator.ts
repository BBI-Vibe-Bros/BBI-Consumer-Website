/**
 * Schema Generator utility for creating structured data (JSON-LD) as per the build guide
 */

// Base organization schema that can be reused
const baseOrganizationSchema = {
  "@type": "Organization",
  "name": "Bobby Brock Insurance",
  "url": "https://bobbybrock.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://bobbybrock.com/logo.png"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "499 Air Park Rd",
    "addressLocality": "Tupelo",
    "addressRegion": "MS",
    "postalCode": "38801",
    "addressCountry": "US"
  },
  "telephone": "+16626421512"
};

/**
 * Generate schema for basic web pages (foundationalPage type)
 */
export const generateWebPageSchema = (
  title: string, 
  description: string,
  url: string,
  datePublished?: string,
  dateModified?: string,
  image?: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "mainEntity": {
      "@type": "Article",
      "headline": title,
      "description": description,
      "image": image,
      "author": baseOrganizationSchema,
      "publisher": baseOrganizationSchema,
      "datePublished": datePublished || new Date().toISOString().split('T')[0],
      "dateModified": dateModified || new Date().toISOString().split('T')[0]
    }
  };
};

/**
 * Generate schema for blog posts (pageBlogPost type)
 */
export const generateBlogPostSchema = (
  title: string,
  description: string,
  url: string,
  image?: string,
  author?: string,
  datePublished?: string,
  dateModified?: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image,
    "author": author 
      ? { "@type": "Person", "name": author }
      : baseOrganizationSchema,
    "publisher": baseOrganizationSchema,
    "datePublished": datePublished || new Date().toISOString().split('T')[0],
    "dateModified": dateModified || new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };
};

/**
 * Generate schema for video content (video type)
 */
export const generateVideoSchema = (
  title: string,
  description: string,
  thumbnailUrl: string,
  uploadDate: string,
  duration?: string,
  contentUrl?: string,
  embedUrl?: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "duration": duration || "PT0M0S",
    "contentUrl": contentUrl,
    "embedUrl": embedUrl,
    "publisher": baseOrganizationSchema
  };
};

/**
 * Generate schema for Medicare plans (InsuranceAgency + InsurancePlan)
 */
export const generateInsurancePlanSchema = (
  planName: string,
  planDescription: string,
  providerName?: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    ...baseOrganizationSchema,
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "InsurancePlan",
        "name": planName,
        "description": planDescription,
        "provider": {
          "@type": "Organization",
          "name": providerName || "Insurance Provider"
        }
      }
    }
  };
};

/**
 * Validate schema structure before injection
 */
export const validateSchema = (schema: Record<string, any>): boolean => {
  // Basic validation to make sure required fields exist
  const requiredFields = ['@context', '@type'];
  return requiredFields.every(field => field in schema);
};

interface SchemaGeneratorOptions {
  type: 'Video' | 'BlogPost' | 'FoundationalPage' | 'FAQ';
  data: Record<string, any>;
}

export class SchemaGenerator {
  static generate(options: SchemaGeneratorOptions) {
    switch (options.type) {
      case 'Video':
        return this.generateVideoSchema(options.data);
      case 'BlogPost':
        return this.generateBlogPostSchema(options.data);
      case 'FoundationalPage':
        return this.generateFoundationalPageSchema(options.data);
      case 'FAQ':
        return this.generateFAQSchema(options.data);
      default:
        return null;
    }
  }

  private static generateVideoSchema(data: Record<string, any>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: data.title,
      description: data.description,
      thumbnailUrl: data.thumbnailUrl,
      uploadDate: data.uploadDate,
      duration: data.duration,
      contentUrl: data.contentUrl,
      embedUrl: data.embedUrl,
      publisher: {
        '@type': 'Organization',
        name: 'Bobby Brock Insurance',
        logo: {
          '@type': 'ImageObject',
          url: '/images/logo.png'
        }
      }
    };
  }

  private static generateBlogPostSchema(data: Record<string, any>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: data.title,
      description: data.description,
      image: data.image,
      datePublished: data.publishedDate,
      dateModified: data.updatedDate,
      author: {
        '@type': 'Person',
        name: data.author
      },
      publisher: {
        '@type': 'Organization',
        name: 'Bobby Brock Insurance',
        logo: {
          '@type': 'ImageObject',
          url: '/images/logo.png'
        }
      }
    };
  }

  private static generateFoundationalPageSchema(data: Record<string, any>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: data.title,
      description: data.description,
      url: data.url,
      publisher: {
        '@type': 'Organization',
        name: 'Bobby Brock Insurance',
        logo: {
          '@type': 'ImageObject',
          url: '/images/logo.png'
        }
      }
    };
  }

  private static generateStatePageSchema(data: Record<string, any>) {
    const stateName = data.title?.replace('Medicare in ', '') || '';
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: data.title,
      description: data.description,
      url: data.url,
      publisher: {
        '@type': 'Organization',
        name: 'Bobby Brock Insurance',
        logo: {
          '@type': 'ImageObject',
          url: '/images/logo.png'
        }
      },
      about: {
        '@type': 'InsuranceAgency',
        name: `Medicare Insurance in ${stateName}`,
        description: `Medicare insurance plans and coverage options in ${stateName}. Learn about Medicare Advantage, Supplement, and Part D plans available in ${stateName}.`,
        areaServed: {
          '@type': 'State',
          name: stateName
        },
        offers: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'InsurancePlan',
            name: `Medicare Plans in ${stateName}`,
            description: `Medicare insurance plans available in ${stateName}. Compare Medicare Advantage, Supplement, and Part D plans.`
          }
        }
      }
    };
  }

  private static generateFAQSchema(data: Record<string, any>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.questions.map((q: any) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer
        }
      }))
    };
  }
}

export default SchemaGenerator;
