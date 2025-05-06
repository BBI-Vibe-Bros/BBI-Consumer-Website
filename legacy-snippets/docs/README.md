# Bobby Brock Insurance - Documentation

## Overview

This documentation repository contains comprehensive information about the Bobby Brock Insurance website rebuild project. It serves as the central knowledge base for developers, content creators, and stakeholders.

## Core Documentation

### Technical Specifications
- [Technical Specifications](./TECHNICAL_SPECIFICATIONS.md)
  - Technology stack and architecture
  - Design system and components
  - Performance requirements
  - Security measures
  - Development workflow

### Content Structure
- [Site Structure](./site-structure.md)
  - Directory organization
  - Team responsibilities
  - Content hierarchies
  - URL patterns

### Content Management
- [Contentful Fields](./contentful-fields.md)
  - Content type definitions
  - Field mappings
  - Validation rules
  - Content relationships

- [Contentful Rich Text](./CONTENTFUL_RICH_TEXT.md)
  - Rich text rendering implementation
  - Component structure and styling
  - Template-specific configurations
  - Embedded content handling
  - Accessibility considerations

## Implementation Guides

### Development
- [Deployment Guide](./DEPLOYMENT.md)
  - Environment setup
  - CI/CD pipeline
  - Configuration management
  - Monitoring

### Content Creation
- [Blog Setup](./BLOG_SETUP_NOTES.md)
  - Content guidelines
  - SEO best practices
  - Media handling
  - Publishing workflow

## Reference Files

### Data Mappings
- `Contentful_Field_IDs_by_Content_Type.csv`
  - Content type ID mappings
  - Field relationships
  - System identifiers

### Site Architecture
- `bbi structure.csv`
  - Legacy site structure
  - Content organization
  - Page relationships

## Project Knowledge Base

### Documentation Standards
1. **File Organization**
   - Markdown for documentation
   - CSV for data mappings
   - Screenshots for visual reference

2. **Naming Conventions**
   - Uppercase for primary docs (README.md, DEPLOYMENT.md)
   - Lowercase with hyphens for supporting docs (site-structure.md)
   - Descriptive prefixes for related files

3. **Content Guidelines**
   - Clear, concise writing
   - Code examples where relevant
   - Updated timestamps for major changes
   - Cross-references between related docs

## Directory Structure

```
docs/
├── README.md                                 # This file
├── TECHNICAL_SPECIFICATIONS.md               # Technical documentation
├── CONTENTFUL_RICH_TEXT.md                  # Rich text implementation
├── site-structure.md                        # Site organization
├── contentful-fields.md                     # CMS configuration
├── DEPLOYMENT.md                            # Deployment procedures
├── BLOG_SETUP_NOTES.md                      # Blog management
├── Contentful_Field_IDs_by_Content_Type.csv # CMS mappings
├── bbi structure.csv                        # Site architecture
└── screenshots/                             # Visual documentation
```

## Usage Guidelines

### For Developers
1. Start with [Technical Specifications](./TECHNICAL_SPECIFICATIONS.md)
2. Review [Deployment Guide](./DEPLOYMENT.md)
3. Reference [Site Structure](./site-structure.md) for routing
4. Implement rich text using [Contentful Rich Text](./CONTENTFUL_RICH_TEXT.md)

### For Content Creators
1. Review [Contentful Fields](./contentful-fields.md)
2. Follow [Blog Setup](./BLOG_SETUP_NOTES.md)
3. Use [Site Structure](./site-structure.md) for organization
4. Reference [Contentful Rich Text](./CONTENTFUL_RICH_TEXT.md) for formatting

### For Project Managers
1. Reference [Site Structure](./site-structure.md)
2. Monitor [Technical Specifications](./TECHNICAL_SPECIFICATIONS.md)
3. Review implementation guides

## Maintenance

This documentation is maintained by the development team. For updates or questions:
1. Submit issues for corrections
2. Propose changes via pull requests
3. Discuss major changes in team meetings

## Related Resources

- [Project Repository](../README.md)
- [Development Guidelines](../CONTRIBUTING.md)
- [Change Log](../CHANGELOG.md) 