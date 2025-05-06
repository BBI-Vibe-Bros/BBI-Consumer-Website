import { createClient } from 'contentful';

interface ContentfulConfig {
  space: string;
  accessToken: string;
  environment?: string;
}

interface VideoFields {
  title: string;
  slug: string;
  description: string;
  videoUrl: string;
  thumbnail: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

interface BlogPostFields {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

interface PageFields {
  title: string;
  slug: string;
  content: string;
  seo?: {
    title: string;
    description: string;
    keywords?: string[];
  };
}

export class ContentfulService {
  private client;

  constructor(config: ContentfulConfig) {
    this.client = createClient({
      space: config.space,
      accessToken: config.accessToken,
      environment: config.environment || 'master',
    });
  }

  async getVideoBySlug(slug: string): Promise<VideoFields | null> {
    try {
      const entries = await this.client.getEntries<VideoFields>({
        content_type: 'video',
        'fields.slug': slug,
        limit: 1,
      });

      return entries.items[0]?.fields || null;
    } catch (error) {
      console.error('Error fetching video:', error);
      return null;
    }
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPostFields | null> {
    try {
      const entries = await this.client.getEntries<BlogPostFields>({
        content_type: 'blogPost',
        'fields.slug': slug,
        limit: 1,
      });

      return entries.items[0]?.fields || null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }

  async getPageBySlug(slug: string): Promise<PageFields | null> {
    try {
      const entries = await this.client.getEntries<PageFields>({
        content_type: 'page',
        'fields.slug': slug,
        limit: 1,
      });

      return entries.items[0]?.fields || null;
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  }

  async getAllVideos(): Promise<VideoFields[]> {
    try {
      const entries = await this.client.getEntries<VideoFields>({
        content_type: 'video',
        order: '-sys.createdAt',
      });

      return entries.items.map(item => item.fields);
    } catch (error) {
      console.error('Error fetching videos:', error);
      return [];
    }
  }

  async getAllBlogPosts(): Promise<BlogPostFields[]> {
    try {
      const entries = await this.client.getEntries<BlogPostFields>({
        content_type: 'blogPost',
        order: '-sys.createdAt',
      });

      return entries.items.map(item => item.fields);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }
} 