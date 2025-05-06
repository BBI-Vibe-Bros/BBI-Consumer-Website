# Routing Structure

## Dynamic Routes

### Video Pages
- Pattern: `/videos/[slug]`
- Example: `/videos/medicare-part-d-explained`
- Content Type: Video
- Schema: VideoObject

### Blog Pages
- Pattern: `/blog/[slug]`
- Example: `/blog/understanding-medicare-supplement-plans`
- Content Type: BlogPost
- Schema: BlogPosting

## Static Routes

### Resources
- Path: `/resources`
- Type: Collection Page
- Content: Aggregated resources, guides, and tools
- Schema: CollectionPage

### Medicare Part D
- Path: `/medicarepartd`
- Type: Information Page
- Content: Part D plan information and enrollment
- Schema: WebPage

### Medicare Supplement
- Path: `/medicaresupplement`
- Type: Information Page
- Content: Supplement plan information and comparison
- Schema: WebPage

## Additional Notes
- All routes support breadcrumb navigation
- Dynamic routes include canonical URLs
- Each route type has specific SEO schema requirements
- Video and blog routes support social sharing metadata 