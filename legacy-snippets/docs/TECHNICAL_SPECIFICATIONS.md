# Bobby Brock Insurance - Technical Specifications

## Technology Stack

### Frontend
- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- React Query for data fetching
- Framer Motion for animations

### Content Management
- Contentful as headless CMS
- GraphQL API integration
- Custom webhooks for content updates

### Deployment & Infrastructure
- Vercel for hosting
- GitHub Actions for CI/CD
- Environment-specific configurations

## Design System

### Typography
- **Base Font**: Inter (body), Montserrat (headings)
- **Sizing Hierarchy**:
  - H1: 36px (2.25rem)
  - H2: 30px (1.875rem)
  - H3: 24px (1.5rem)
  - H4: 20px (1.25rem)
  - Body: 16px (1rem)
  - Small: 14px (0.875rem)

### Colors
- **Primary**: #1E40AF (BBI Blue)
- **Secondary**: #DC2626 (BBI Red)
- **Neutral**:
  - Dark: #1F2937
  - Mid: #6B7280
  - Light: #F3F4F6
- **Accent**:
  - Success: #059669
  - Warning: #D97706
  - Error: #DC2626

### Accessibility Standards
- WCAG 2.1 Level AA compliance
- Minimum contrast ratio: 4.5:1
- Focus indicators on all interactive elements
- Semantic HTML structure
- ARIA labels where necessary
- Screen reader optimized content

## Component Architecture

### Core Components
1. **Navigation**
   - MainNav
   - Footer
   - Breadcrumbs
   - MobileMenu

2. **Layout**
   - PageContainer
   - Section
   - Grid
   - Flex

3. **Content**
   - RichText
   - BlogPost
   - ResourceCard
   - VideoPlayer

4. **Interactive**
   - Button
   - Form
   - SearchBar
   - PlanComparison

### Medicare-Specific Components
1. **Plan Selectors**
   - PlanTypeSelector
   - CoverageCalculator
   - BenefitsComparison

2. **Educational Tools**
   - EligibilityChecker
   - EnrollmentTimeline
   - CostEstimator

## Performance Requirements

### Core Web Vitals Targets
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### Optimization Strategies
1. **Image Optimization**
   - Next.js Image component
   - WebP format with fallbacks
   - Lazy loading
   - Responsive sizes

2. **Code Splitting**
   - Route-based splitting
   - Component lazy loading
   - Dynamic imports

3. **Caching**
   - Static page generation
   - Incremental Static Regeneration
   - Service Worker implementation

## SEO Implementation

### Meta Tags
```typescript
interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  noindex?: boolean;
}
```

### Structured Data
- Organization
- BreadcrumbList
- FAQPage
- Article (blog posts)
- Service (insurance plans)

### URL Structure
- Clean, semantic URLs
- Consistent hierarchy
- Medicare-specific patterns:
  - /medicare/[plan-type]/
  - /plans/[category]/[plan-name]
  - /resources/[category]/[slug]

## Content Management Guidelines

### Content Types
1. **Page Types**
   - Landing Pages
   - Product Pages
   - Resource Articles
   - Blog Posts
   - Team Profiles

2. **Component Types**
   - Hero Sections
   - Feature Blocks
   - Testimonials
   - Call-to-Action

### Content Validation
- Required fields
- Format restrictions
- Cross-references
- SEO requirements

## Security Measures

### Form Protection
- CSRF tokens
- Rate limiting
- Input validation
- Sanitization

### Data Handling
- PII encryption
- Secure storage
- Access logging
- HIPAA compliance

## Monitoring & Analytics

### Performance Monitoring
- Vercel Analytics
- Custom performance metrics
- Error tracking

### User Analytics
- Google Analytics 4
- Custom event tracking
- Conversion monitoring
- Heat mapping

## Development Workflow

### Version Control
- Feature branching
- PR templates
- Commit conventions
- Branch protection

### Testing
- Jest for unit tests
- Cypress for E2E
- Accessibility testing
- Performance testing

### Documentation
- JSDoc comments
- Storybook
- API documentation
- Deployment guides 