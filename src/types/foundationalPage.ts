import { Document } from '@contentful/rich-text-types';

export interface FoundationalPageResponse {
  pageName: string;
  pageSlug: string;
  title?: string;
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
    heroImage?: string;
  };
  fBodyContent: Document;
  callToAction?: {
    title?: string;
    text?: string;
    buttonText?: string;
    buttonLink?: string;
  };
  author?: string;
  youTubeVideo?: string;
  relatedBlogs?: Array<{
    title: string;
    slug: string;
    featuredImage?: string;
    excerpt?: string;
  }>;
} 