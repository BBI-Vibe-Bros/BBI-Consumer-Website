# Content Model Documentation

## Content Types

### Video
- Title (Text)
- Slug (Text)
- Description (Rich Text)
- Video URL (Text)
- Thumbnail (Media)
- Transcript (Rich Text, Optional)
- Related Videos (Reference, Optional)
- Publish Date (Date)
- Author (Reference)

### Blog Post
- Title (Text)
- Slug (Text)
- Content (Rich Text)
- Excerpt (Text)
- Featured Image (Media, Optional)
- Categories (Reference, Multiple)
- Tags (Text, Multiple)
- Publish Date (Date)
- Author (Reference)

### Page
- Title (Text)
- Slug (Text)
- Content (Rich Text)
- SEO Title (Text, Optional)
- SEO Description (Text, Optional)
- SEO Keywords (Text, Multiple, Optional)
- Featured Image (Media, Optional)

### Resource
- Title (Text)
- Slug (Text)
- Type (Text, Enum: ['Guide', 'Tool', 'FAQ'])
- Content (Rich Text)
- Download URL (Text, Optional)
- Related Resources (Reference, Multiple, Optional)

## Relationships

### Video to Blog Post
- Many-to-Many relationship
- Used for cross-referencing related content
- Managed through the Related Videos field

### Blog Post to Category
- Many-to-Many relationship
- Categories are predefined and managed separately
- Used for content organization and filtering

### Resource to Resource
- Many-to-Many relationship
- Used to link related resources together
- Managed through the Related Resources field

## Content Guidelines

### Video Content
- Maximum length: 10 minutes
- Required thumbnail dimensions: 1280x720
- Transcript required for accessibility
- Must include description and tags

### Blog Posts
- Minimum word count: 500 words
- Must include excerpt
- Featured image recommended
- Must be assigned to at least one category

### Resources
- Must specify type
- Download URL required for tools
- Must include related resources when applicable
- Content should be scannable with clear sections 