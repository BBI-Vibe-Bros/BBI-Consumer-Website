
import { createClient } from 'contentful';

/**
 * ContentfulService class for fetching content from Contentful CMS
 * Based on the build guide specifications
 */
class ContentfulService {
  private static instance: ContentfulService;
  private client;

  private constructor() {
    // Initialize Contentful client with environment variables using Vite's import.meta.env
    this.client = createClient({
      space: import.meta.env.VITE_CONTENTFUL_SPACE_ID || '',
      accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || '',
      environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master'
    });
  }

  /**
   * Get the singleton instance of ContentfulService
   */
  public static getInstance(): ContentfulService {
    if (!ContentfulService.instance) {
      ContentfulService.instance = new ContentfulService();
    }
    return ContentfulService.instance;
  }

  /**
   * Fetch foundational pages by slug
   */
  public async getFoundationalPageBySlug(slug: string) {
    try {
      const entries = await this.client.getEntries({
        content_type: 'foundationalPage',
        'fields.pageSlug': slug,
        include: 2,
      });
      
      return entries.items[0] || null;
    } catch (error) {
      console.error('Error fetching foundational page:', error);
      return null;
    }
  }

  /**
   * Fetch blog posts
   */
  public async getBlogPosts(limit = 10, skip = 0) {
    try {
      const entries = await this.client.getEntries({
        content_type: 'pageBlogPost',
        order: '-sys.createdAt',
        limit,
        skip,
        include: 1,
      });
      
      return entries;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return { items: [], total: 0 };
    }
  }

  /**
   * Fetch a blog post by slug
   */
  public async getBlogPostBySlug(slug: string) {
    try {
      const entries = await this.client.getEntries({
        content_type: 'pageBlogPost',
        'fields.slug': slug,
        include: 2,
      });
      
      return entries.items[0] || null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }

  /**
   * Fetch videos
   */
  public async getVideos(limit = 10, skip = 0) {
    try {
      const entries = await this.client.getEntries({
        content_type: 'video',
        order: '-sys.createdAt',
        limit,
        skip,
        include: 1,
      });
      
      return entries;
    } catch (error) {
      console.error('Error fetching videos:', error);
      return { items: [], total: 0 };
    }
  }

  /**
   * Fetch a video by slug
   */
  public async getVideoBySlug(slug: string) {
    try {
      const entries = await this.client.getEntries({
        content_type: 'video',
        'fields.slug': slug,
        include: 2,
      });
      
      return entries.items[0] || null;
    } catch (error) {
      console.error('Error fetching video:', error);
      return null;
    }
  }

  /**
   * Fetch resource guides
   */
  public async getResourceGuides(limit = 10, skip = 0) {
    try {
      const entries = await this.client.getEntries({
        content_type: 'resourceGuide',
        order: '-sys.createdAt',
        limit,
        skip,
        include: 1,
      });
      
      return entries;
    } catch (error) {
      console.error('Error fetching resource guides:', error);
      return { items: [], total: 0 };
    }
  }

  /**
   * Fetch a resource guide by slug
   */
  public async getResourceGuideBySlug(slug: string) {
    try {
      const entries = await this.client.getEntries({
        content_type: 'resourceGuide',
        'fields.slug': slug,
        include: 2,
      });
      
      return entries.items[0] || null;
    } catch (error) {
      console.error('Error fetching resource guide:', error);
      return null;
    }
  }
}

export default ContentfulService;
