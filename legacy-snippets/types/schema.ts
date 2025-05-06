export interface BaseSchema {
  '@context': string;
  '@type': string;
}

export interface VideoSchema extends BaseSchema {
  '@type': 'VideoObject';
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl: string;
  duration?: string;
  embedUrl?: string;
}

export interface BlogSchema extends BaseSchema {
  '@type': 'BlogPosting';
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: {
    '@type': 'Person';
    name: string;
  };
  publisher?: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
}

export interface BreadcrumbSchema extends BaseSchema {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface FAQSchema extends BaseSchema {
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface OrganizationSchema extends BaseSchema {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    areaServed?: string[];
  };
} 