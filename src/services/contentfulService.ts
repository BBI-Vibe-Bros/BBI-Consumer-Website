import { createClient } from 'contentful';
import { ContentfulClientApi } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import { TeamMember, TeamSection, TeamMemberContentful } from '../types/index';

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
 * Now uses secure server-side proxy instead of exposing tokens in client
 */
class ContentfulService {
  private static instance: ContentfulService;
  private client: ContentfulClientApi | null = null;
  private isProxyMode: boolean = false;

  private constructor(config?: ContentfulConfig) {
    // Check if we're in development mode and have proxy available
    if (import.meta.env.DEV && !config?.accessToken) {
      this.isProxyMode = true;
      console.log('ContentfulService: Using secure proxy mode');
    } else if (config) {
      this.client = createClient({
        space: config.space,
        accessToken: config.accessToken,
        environment: config.environment,
      });
      console.log('ContentfulService: Using direct client mode');
    }
  }

  /**
   * Get the singleton instance of ContentfulService
   */
  public static getInstance(): ContentfulService {
    if (!ContentfulService.instance) {
      const config = {
        space: import.meta.env.VITE_CONTENTFUL_SPACE_ID || '',
        accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || '',
        environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
      };
      
      ContentfulService.instance = new ContentfulService(
        config.accessToken ? config : undefined
      );
    }
    return ContentfulService.instance;
  }

  /**
   * Secure proxy request method
   */
  private async proxyRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });

      const url = `/contentful-api/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}/environments/${import.meta.env.VITE_CONTENTFUL_ENVIRONMENT}/${endpoint}?${queryParams}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Proxy request failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Proxy request error:', error);
      throw error;
    }
  }

  /**
   * Unified method to get entries using either proxy or direct client
   */
  private async getEntries(params: any): Promise<any> {
    if (this.isProxyMode) {
      return this.proxyRequest('entries', params);
    } else if (this.client) {
      return this.client.getEntries(params);
    } else {
      throw new Error('ContentfulService not properly initialized');
    }
  }

  private logContentfulResponse(contentType: string, slug: string, response: any): void {
    console.log(`Contentful Response for ${contentType} (${slug}):`, {
      total: response.total,
      items: response.items.length,
      firstItem: response.items[0]?.fields,
    });
  }

  private transformAsset(asset: any): { title: string; description: string; url: string } | null {
    if (!asset) return null;
    return {
      title: asset.fields?.title || '',
      description: asset.fields?.description || '',
      url: asset.fields?.file?.url ? `https:${asset.fields.file.url}` : '',
    };
  }

  private transformAuthor(author: any): { name: string; photo: string } | null {
    if (!author) return null;
    return {
      name: author.fields?.name || '',
      photo: author.fields?.photo?.fields?.file?.url ? `https:${author.fields.photo.fields.file.url}` : '',
    };
  }

  private transformEntry(entry: any): any {
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

    console.log('Raw blog post entry:', JSON.stringify(entry, null, 2));
    
    // Add specific logging for contentBody
    console.log('ContentBody structure:', {
      raw: entry.fields?.contentBody,
      nodeType: entry.fields?.contentBody?.nodeType,
      content: entry.fields?.contentBody?.content?.map((node: any) => ({
        nodeType: node.nodeType,
        data: node.data,
        content: node.content?.length
      }))
    });
    
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
      } : undefined,
    };

    console.log('Transformed blog post:', JSON.stringify(transformed, null, 2));
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
      } : undefined,
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
        hasToken: !!import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
        proxyMode: this.isProxyMode
      });

      const response = await this.getEntries({
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
  public async getBlogPosts(page: number = 1, limit: number = 10, category?: string): Promise<{ items: BlogPostFields[]; total: number }> {
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
        const categoryEntries = await this.getEntries({
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

      const response = await this.getEntries(query);
      
      this.logContentfulResponse('pageBlogPost', `page-${page}`, response);

      const transformedItems = response.items.map((item: any) => this.transformBlogPost(item)).filter(Boolean) as BlogPostFields[];

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
      console.log('Fetching blog post with slug:', slug);
      
      const response = await this.getEntries({
        content_type: 'pageBlogPost',
        'fields.slug': slug,
        include: 10, // Increase include depth to ensure we get all embedded entries
      });

      console.log('Blog post response:', JSON.stringify(response, null, 2));
      this.logContentfulResponse('pageBlogPost', slug, response);

      if (response.items.length === 0) {
        console.warn(`No blog post found with slug: ${slug}`);
        return null;
      }

      const transformed = this.transformBlogPost(response.items[0]);
      console.log('Transformed blog post:', JSON.stringify(transformed, null, 2));
      return transformed;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }

  /**
   * Fetch videos
   */
  public async getVideos(limit = 10, skip = 0): Promise<any> {
    try {
      const entries = await this.getEntries({
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
  public async getVideoBySlug(slug: string): Promise<any> {
    try {
      const entries = await this.getEntries({
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
  public async getResourceGuides(limit = 10, skip = 0): Promise<any> {
    try {
      const entries = await this.getEntries({
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
  public async getResourceGuideBySlug(slug: string): Promise<any> {
    try {
      const entries = await this.getEntries({
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
  public async getCategories(): Promise<Array<{ name: string; slug: string; id: string }>> {
    try {
      const entries = await this.getEntries({
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

  public async getResourceBySlug(slug: string): Promise<any> {
    try {
      const response = await this.getEntries({
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

  /**
   * Transform team member from Contentful format to app format
   */
  private transformTeamMember(entry: any): TeamMember | null {
    if (!entry?.fields) {
      console.warn('No entry fields provided to transformTeamMember');
      return null;
    }

    const fields = entry.fields as TeamMemberContentful;
    
    // Get the full Contentful image URL or use placeholder
    let imageUrl = 'female-placeholder.png'; // Default placeholder
    
    if (fields.headshot?.fields?.file?.url) {
      // Use the full Contentful URL with https:// prefix (simplified optimization)
      const baseUrl = `https:${fields.headshot.fields.file.url}`;
      imageUrl = `${baseUrl}?w=300&h=300&fit=fill`;
    }

    return {
      name: fields.employeeName || '',
      title: fields.employeeTitle || '',
      email: fields.employeeEmail || '',
      department: fields.employeeDept || '',
      image: imageUrl,
    };
  }

  /**
   * Fetch all team members from Contentful
   */
  public async getTeamMembers(): Promise<TeamSection[]> {
    try {
      console.log('Fetching team members from Contentful');

      const response = await this.getEntries({
        content_type: 'teamMemberCards',
        order: 'fields.employeeName', // Default alphabetical sort
        limit: 100,
        include: 2, // Increase to include linked assets (images)
      });

      console.log('Team members response:', {
        total: response.total,
        items: response.items.length,
        firstItem: response.items[0]?.fields,
      });



      if (response.items.length === 0) {
        console.warn('No team members found in Contentful');
        return [];
      }

      // Transform all team members
      const teamMembers = response.items
        .map((item: any) => this.transformTeamMember(item))
        .filter(Boolean) as TeamMember[];

      console.log('Transformed team members:', teamMembers);

      // Group by department
      const departmentGroups: { [key: string]: TeamMember[] } = {};
      
      teamMembers.forEach(member => {
        const dept = member.department || 'Other';
        if (!departmentGroups[dept]) {
          departmentGroups[dept] = [];
        }
        departmentGroups[dept].push(member);
      });

      // Custom sorting function for specific departments
      const customSortMembers = (department: string, members: TeamMember[]): TeamMember[] => {
        if (department === 'Leadership') {
          // Specific order for Leadership team
          const leadershipOrder = [
            'Justin Brock',
            'Steven Martinez', 
            'Jeff Senter',
            'Jackson Taylor',
            'Will Chapman',
            'Jeremiah Lozano'
          ];
          
          return members.sort((a, b) => {
            const aIndex = leadershipOrder.indexOf(a.name);
            const bIndex = leadershipOrder.indexOf(b.name);
            
            // If both are in the custom order, sort by index
            if (aIndex !== -1 && bIndex !== -1) {
              return aIndex - bIndex;
            }
            
            // If only one is in the custom order, prioritize it
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;
            
            // If neither is in the custom order, sort alphabetically
            return a.name.localeCompare(b.name);
          });
        }
        
        // For all other departments: prioritize leadership titles first, then alphabetical
        const getLeadershipPriority = (title: string): number => {
          const lowerTitle = title.toLowerCase();
          if (lowerTitle.includes('director')) return 1;
          if (lowerTitle.includes('team lead') || lowerTitle.includes('team leader')) return 2;
          if (lowerTitle.includes('manager')) return 3;
          if (lowerTitle.includes('supervisor')) return 4;
          if (lowerTitle.includes('coordinator')) return 5;
          return 10; // Regular positions (agents, etc.)
        };
        
        return members.sort((a, b) => {
          const aPriority = getLeadershipPriority(a.title);
          const bPriority = getLeadershipPriority(b.title);
          
          // First sort by leadership priority
          if (aPriority !== bPriority) {
            return aPriority - bPriority;
          }
          
          // If same priority level, sort alphabetically by name
          return a.name.localeCompare(b.name);
        });
      };

      // Convert to TeamSection format with custom sorting
      const teamSections: TeamSection[] = Object.entries(departmentGroups).map(([department, members]) => ({
        section: department,
        members: customSortMembers(department, members),
      }));

      // Sort sections by predefined order
      const sectionOrder = ['Leadership', 'Sales', 'Administrative', 'Marketing'];
      teamSections.sort((a, b) => {
        const aIndex = sectionOrder.indexOf(a.section);
        const bIndex = sectionOrder.indexOf(b.section);
        
        // If both are in the predefined order, sort by index
        if (aIndex !== -1 && bIndex !== -1) {
          return aIndex - bIndex;
        }
        
        // If only one is in the predefined order, prioritize it
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        
        // If neither is in the predefined order, sort alphabetically
        return a.section.localeCompare(b.section);
      });

      console.log('Final team sections:', teamSections);
      return teamSections;
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  }
}

export default ContentfulService;
