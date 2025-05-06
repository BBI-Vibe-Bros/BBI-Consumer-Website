import { createClient } from 'contentful';
import { ContentfulClientApi } from 'contentful';
import { Document } from '@contentful/rich-text-types';

interface ContentfulConfig {
  space: string;
  accessToken: string;
  environment: string;
}

interface FoundationalPageFields {
  pageName: string;
  author: string;
  pageSlug: string;
  fBodyContent: Document;
  youTubeVideo?: string;
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  relatedBlogs?: Array<{
    title: string;
    slug: string;
    featuredImage?: string;
    excerpt: string;
  }>;
  callToAction?: {
    title: string;
    text: string;
    buttonText: string;
    buttonLink: string;
  };
}

interface BlogPostFields {
  internalName: string;
  title: string;
  slug: string;
  publishedDate: string;
  author: string;
  category: string;
  featuredImage?: string;
  excerpt: string;
  contentBody: Document;
  seoFields: {
    title: string;
    description: string;
    keywords: string[];
  };
  relatedBlogPosts: Array<{
    title: string;
    slug: string;
    featuredImage?: string;
  }>;
  callToAction?: {
    title: string;
    text: string;
    buttonText: string;
    buttonLink: string;
  };
}

/**
 * ContentfulService class for fetching content from Contentful CMS
 * Based on the build guide specifications
 */
class ContentfulService {
  private static instance: ContentfulService;
  private client: ContentfulClientApi;

  private constructor(config: ContentfulConfig) {
    this.client = createClient({
      space: config.space,
      accessToken: config.accessToken,
      environment: config.environment,
    });
  }

  /**
   * Get the singleton instance of ContentfulService
   */
  public static getInstance(): ContentfulService {
    if (!ContentfulService.instance) {
      ContentfulService.instance = new ContentfulService({
        space: import.meta.env.VITE_CONTENTFUL_SPACE_ID || '',
        accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || '',
        environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
      });
    }
    return ContentfulService.instance;
  }

  private logContentfulResponse(contentType: string, slug: string, response: any) {
    console.log(`Contentful Response for ${contentType} (${slug}):`, {
      total: response.total,
      items: response.items.length,
      firstItem: response.items[0]?.fields,
    });
  }

  private transformAsset(asset: any) {
    if (!asset) return null;
    return {
      title: asset.fields?.title || '',
      description: asset.fields?.description || '',
      url: asset.fields?.file?.url ? `https:${asset.fields.file.url}` : '',
    };
  }

  private transformAuthor(author: any) {
    if (!author) return null;
    return {
      name: author.fields?.name || '',
      photo: author.fields?.photo?.fields?.file?.url ? `https:${author.fields.photo.fields.file.url}` : '',
    };
  }

  private transformEntry(entry: any) {
    if (!entry) return null;
    return {
      title: entry.fields?.title || '',
      slug: entry.fields?.slug || '',
      contentType: entry.sys?.contentType?.sys?.id || '',
      ...(entry.fields?.videoUrl && { videoUrl: entry.fields.videoUrl }),
      ...(entry.fields?.isSelfHosted && { isSelfHosted: entry.fields.isSelfHosted }),
      ...(entry.fields?.thumbnailImage && { thumbnailImage: this.transformAsset(entry.fields.thumbnailImage) }),
      ...(entry.fields?.youTubeLink && { youTubeLink: entry.fields.youTubeLink }),
    };
  }

  private transformBlogPost(entry: any): BlogPostFields | null {
    if (!entry) {
      console.warn('No entry provided to transformBlogPost');
      return null;
    }

    console.log('Raw blog post entry:', entry);
    
    const transformed = {
      internalName: entry.fields?.internalName || '',
      title: entry.fields?.title || '',
      slug: entry.fields?.slug || '',
      publishedDate: entry.fields?.publishedDate || '',
      author: entry.fields?.author?.fields?.name || '',
      category: entry.fields?.category?.fields?.name || '',
      featuredImage: entry.fields?.featuredImage?.fields?.file?.url 
        ? `https:${entry.fields.featuredImage.fields.file.url}` 
        : '',
      excerpt: entry.fields?.excerpt || '',
      contentBody: entry.fields?.contentBody || null,
      seoFields: {
        title: entry.fields?.seoFields?.fields?.title || '',
        description: entry.fields?.seoFields?.fields?.description || '',
        keywords: entry.fields?.seoFields?.fields?.keywords || [],
      },
      relatedBlogPosts: (entry.fields?.relatedBlogPosts || []).map((post: any) => ({
        title: post.fields?.title || '',
        slug: post.fields?.slug || '',
        featuredImage: post.fields?.featuredImage?.fields?.file?.url 
          ? `https:${post.fields.featuredImage.fields.file.url}` 
          : '',
      })),
      callToAction: (entry.fields?.callToAction?.fields && entry.fields?.callToAction?.sys?.contentType?.sys?.id === 'websiteCta') ? {
        title: entry.fields.callToAction.fields.title || '',
        text: entry.fields.callToAction.fields.text || '',
        buttonText: entry.fields.callToAction.fields.buttonText || '',
        buttonLink: entry.fields.callToAction.fields.buttonLink || '',
      } : null,
    };

    console.log('Transformed blog post:', transformed);
    return transformed;
  }

  private transformFoundationalPage(entry: any): FoundationalPageFields | null {
    if (!entry) {
      console.warn('No entry provided to transformFoundationalPage');
      return null;
    }

    console.log('Raw foundational page entry:', entry);
    console.log('Raw foundational page entry fields:', entry.fields);
    
    const transformed = {
      pageName: entry.fields?.pageName || '',
      author: entry.fields?.author || '',
      pageSlug: entry.fields?.pageSlug || '',
      fBodyContent: entry.fields?.fBodyContent || null,
      youTubeVideo: entry.fields?.youTubeVideo || '',
      metadata: {
        title: entry.fields?.metadata?.fields?.title || '',
        description: entry.fields?.metadata?.fields?.description || '',
        keywords: entry.fields?.metadata?.fields?.keywords || [],
      },
      relatedBlogs: (entry.fields?.relatedBlogs || []).map((blog: any) => ({
        title: blog.fields?.title || '',
        slug: blog.fields?.slug || '',
        featuredImage: blog.fields?.featuredImage?.fields?.file?.url 
          ? `https:${blog.fields.featuredImage.fields.file.url}` 
          : '',
        excerpt: blog.fields?.excerpt || '',
      })),
      callToAction: (entry.fields?.callToAction?.fields && entry.fields?.callToAction?.sys?.contentType?.sys?.id === 'websiteCta') ? {
        title: entry.fields.callToAction.fields.title || '',
        text: entry.fields.callToAction.fields.text || '',
        buttonText: entry.fields.callToAction.fields.buttonText || '',
        buttonLink: entry.fields.callToAction.fields.buttonLink || '',
      } : null,
    };

    console.log('Transformed foundational page:', transformed);
    return transformed;
  }

  /**
   * Fetch foundational pages by slug
   */
  public async getFoundationalPageBySlug(slug: string): Promise<FoundationalPageFields | null> {
    try {
      console.log('Fetching foundational page with slug:', slug);
      console.log('Contentful config:', {
        space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
        environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT,
        hasToken: !!import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
      });

      const response = await this.client.getEntries({
        content_type: 'foundationalPage',
        'fields.pageSlug': slug,
        include: 3,
      });

      console.log('Contentful response:', response);

      this.logContentfulResponse('foundationalPage', slug, response);

      if (response.items.length === 0) {
        console.warn(`No foundational page found with slug: ${slug}`);
        return null;
      }

      const transformed = this.transformFoundationalPage(response.items[0]);
      console.log('Transformed page data:', transformed);
      return transformed;
    } catch (error) {
      console.error('Error fetching foundational page:', error);
      return null;
    }
  }

  /**
   * Fetch blog posts
   */
  public async getBlogPosts(page: number = 1, limit: number = 10, category?: string) {
    try {
      console.log('Fetching blog posts with params:', { page, limit, category });

      const query: any = {
        content_type: 'pageBlogPost',
        order: '-fields.publishedDate',
        skip: (page - 1) * limit,
        limit,
        include: 2,
      };

      if (category && category !== 'all') {
        // First get the category ID from the slug
        const categoryEntries = await this.client.getEntries({
          content_type: 'category',
          'fields.slug': category,
          limit: 1
        });
        
        if (categoryEntries.items.length > 0) {
          const categoryId = categoryEntries.items[0].sys.id;
          query['fields.category.sys.id'] = categoryId;
        }
      }

      console.log('Contentful query:', query);

      const response = await this.client.getEntries(query);
      
      this.logContentfulResponse('pageBlogPost', `page-${page}`, response);

      const transformedItems = response.items.map((item) => this.transformBlogPost(item)).filter(Boolean);

      console.log('Transformed blog posts:', transformedItems);

      return {
        items: transformedItems,
        total: response.total,
      };
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return { items: [], total: 0 };
    }
  }

  /**
   * Fetch a blog post by slug
   */
  public async getBlogPostBySlug(slug: string): Promise<BlogPostFields | null> {
    try {
      const response = await this.client.getEntries({
        content_type: 'pageBlogPost',
        'fields.slug': slug,
        include: 3,
      });

      this.logContentfulResponse('pageBlogPost', slug, response);

      if (response.items.length === 0) {
        console.warn(`No blog post found with slug: ${slug}`);
        return null;
      }

      return this.transformBlogPost(response.items[0]);
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

  /**
   * Fetch all categories
   */
  public async getCategories() {
    try {
      const entries = await this.client.getEntries({
        content_type: 'category',
        order: 'fields.name',
        select: 'fields.name,fields.slug,sys.id',
        limit: 100
      });
      return entries.items.map((item: any) => ({
        name: item.fields.name,
        slug: item.fields.slug,
        id: item.sys.id
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  public async getResourceBySlug(slug: string) {
    try {
      const response = await this.client.getEntries({
        content_type: 'resourceGuide',
        'fields.slug': slug,
        include: 2,
      });

      if (response.items.length === 0) {
        return null;
      }

      const entry = response.items[0];
      return {
        title: entry.fields?.title || '',
        description: entry.fields?.description || '',
        content: entry.fields?.content || null,
        featuredImage: entry.fields?.featuredImage?.fields?.file?.url ? `https:${entry.fields.featuredImage.fields.file.url}` : '',
        downloadUrl: entry.fields?.downloadUrl || '',
        tags: entry.fields?.tags || [],
        relatedResources: (entry.fields?.relatedResources || []).map((resource: any) => ({
          title: resource.fields?.title || '',
          slug: resource.fields?.slug || '',
          type: resource.fields?.type || '',
          description: resource.fields?.description || '',
        })),
      };
    } catch (error) {
      console.error('Error fetching resource:', error);
      return null;
    }
  }
}

export default ContentfulService;
