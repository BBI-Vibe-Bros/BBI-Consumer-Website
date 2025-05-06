# Contentful Field IDs by Content Type

> For implementation details, see [Rebuild Guide](../REBUILD_GUIDE.md). For team content responsibilities, see [Site Structure Documentation](./site-structure.md).

## Content Type Overview
| Content Type ID | Directory Mapping | Description |
|----------------|-------------------|-------------|
| foundationalPage | /medicare/*, /plans/*, /resources/*, etc. | Static pages with fixed URLs |
| pageBlogPost | /blog/[slug] | Blog posts with dynamic URLs |
| video | /videos/watch/[slug] | Video content pages |
| resourceGuide | /resources/guides/[slug] | Educational guides |

> See [Site Structure Documentation](./site-structure.md) for team content responsibilities.

## Foundational Page Content Type (ID: foundationalPage)
| Field ID | Description | Example Usage |
|----------|-------------|---------------|
| pageName | Page title | "Medicare Part A Basics" |
| author | Page author | "John Smith" |
| pageSlug | URL-friendly identifier | "part-a" maps to /medicare/parts/part-a/ |
| fBodyContent | Main page content | Rich text content |
| youTubeVideo | Embedded video | Video reference |
| metadata | SEO metadata | Title, description, etc. |
| relatedBlogs | Related blog posts | Array of blog post references |
| callToAction | CTA section | CTA component data |

> For implementation details, see [Rebuild Guide](../REBUILD_GUIDE.md).

## Blog Post Content Type (ID: pageBlogPost)
| Field ID | Description | Example Usage |
|----------|-------------|---------------|
| internalName | Internal reference name | "2024-medicare-changes" |
| title | Blog post title | "2024 Medicare Changes" |
| slug | URL-friendly identifier | "2024-medicare-changes" maps to /blog/2024-medicare-changes |
| publishedDate | Publication date | "2024-01-01" |
| author | Post author | "Jane Doe" |
| category | Post category | "Medicare Updates" |
| featuredImage | Main post image | Image reference |
| excerpt | Short post summary | "Summary of 2024 changes..." |
| contentBody | Main post content | Rich text content |
| seoFields | SEO metadata | Title, description, etc. |
| relatedBlogPosts | Related posts references | Array of blog post references |
| callToAction | CTA section | CTA component data |

> See [Site Structure Documentation](./site-structure.md) for blog content responsibilities.

## Video Content Type (ID: video)
| Field ID | Description | Example Usage |
|----------|-------------|---------------|
| title | Video title | "Understanding Medicare Part A" |
| slug | URL-friendly identifier | "understanding-part-a" maps to /videos/watch/understanding-part-a |
| description | Video description | "Learn about Medicare Part A..." |
| videoUrl | URL to the video file | "https://..." |
| thumbnailImage | Video thumbnail image | Image reference |
| uploadDate | Date video was uploaded | "2024-01-01" |
| duration | Video length | "5:30" |
| transcript | Video transcript text | Full transcript text |
| selfVideo | Self-hosted video flag | true/false |

> See [Site Structure Documentation](./site-structure.md) for video content responsibilities.

## Resource Guide Content Type (ID: resourceGuide)
| Field ID | Description | Example Usage |
|----------|-------------|---------------|
| title | Guide title | "Medicare Enrollment Guide" |
| slug | URL-friendly identifier | "enrollment-guide" maps to /resources/guides/enrollment-guide |
| category | Guide category | "Enrollment" |
| author | Guide author | "John Smith" |
| publishDate | Publication date | "2024-01-01" |
| content | Guide content | Rich text content |
| relatedResources | Related resources | Array of resource references |
| downloadLink | PDF download link | "https://..." |
| seoFields | SEO metadata | Title, description, etc. |

> See [Site Structure Documentation](./site-structure.md) for resource guide responsibilities.

## Notes
- All content types support system fields (createdAt, updatedAt, etc.)
- Field IDs are case-sensitive
- Some fields may be required or have validation rules
- Field types (text, rich text, media, etc.) are determined by Contentful configuration
- URLs are generated based on the directory structure and slug fields
- Content relationships are maintained through reference fields

## Related Documentation
- [Rebuild Guide](../REBUILD_GUIDE.md): Implementation details
- [Site Structure Documentation](./site-structure.md): Team content responsibilities
- [README](./README.md): Documentation overview 