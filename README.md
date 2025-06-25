# Bobby Brock Insurance Medicare Website

A modern, secure, and accessible Medicare insurance website built with React, TypeScript, and Contentful CMS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, TailwindCSS
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v6
- **Build Tool**: Vite
- **CMS**: Contentful
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint, Prettier
- **Security**: CSP, Rate Limiting, Security Headers
- **SEO**: React Helmet Async, Schema.org markup
- **UI Components**: Custom components with Tailwind CSS
- **Error Handling**: Custom Error Boundary
- **Performance**: Lazy loading, code splitting

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Blog/           # Blog-related components
│   ├── Content/        # Content rendering components
│   ├── Home/           # Homepage components
│   ├── Layout/         # Layout components (Header, Footer)
│   ├── Navigation/     # Navigation components
│   ├── Plans/          # Medicare plan components
│   ├── Templates/      # Page templates
│   └── ui/             # UI components
├── contexts/           # React Context providers
├── pages/              # Page components and routing
├── services/           # API and service integrations
├── styles/             # Global styles and Tailwind config
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and helpers
```

## 🛣️ Routing Structure

The application uses the following routes:

### Main Routes
- `/` - Homepage
- `/medicare-breakdown` - Medicare Breakdown Book Landing Page

### Medicare Information
- `/medicare/*` - Medicare information pages
  - `/medicare/what-is-medicare`
  - `/medicare/enrollment-periods`
  - `/medicare/eligibility`
  - `/medicare/four-parts-of-medicare`
  - `/medicare/medicare-costs`
  - `/medicare/by-state` - Medicare by State listing page
  - `/medicare/by-state/:state` - State-specific Medicare pages

### Plan Routes
- `/plans/*`
  - `/plans/medicare-advantage`
  - `/plans/medicare-supplements`
  - `/plans/medicarepartd`
  - `/plans/medicare-add-on-coverage-options`

### Resources
- `/resources` - Resource listing page
- `/resources/guides/:slug` - Individual resource guides
- `/resources/calculators` - Medicare calculators
- `/resources/glossary` - Medicare terminology glossary

### Content Sections
- `/blog` - Blog listing page
- `/blog/:slug` - Individual blog posts
- `/videos` - Video library
- `/videos/watch/:slug` - Individual video pages

### Static Pages
- `/about-us` - About page
- `/team` - Team page
- `/contact-us` - Contact page
- `/privacy-policy` - Privacy policy
- `/terms-of-service` - Terms of service
- `/client-reviews` - Client testimonials

### Legacy Routes (for SEO)
- `/medicarepartd`
- `/medicare-supplements`
- `/what-is-medicare`
- `/enrollment-periods`
- `/eligibility`
- `/four-parts-of-medicare`
- `/medicare-costs`

## 🔒 Security Features

- Content Security Policy (CSP) headers
- Rate limiting for API endpoints
- Secure headers configuration
- XSS protection
- CSRF protection

## 🎯 SEO Features

- Dynamic meta tags with React Helmet
- Structured data with Schema.org
- XML sitemap generation
- Robots.txt configuration
- Canonical URLs
- Open Graph and Twitter card meta tags

## 🚀 Performance Optimizations

- Code splitting with React.lazy
- Image optimization
- Lazy loading of components
- Efficient routing with React Router
- Caching with React Query
- Minified production builds

## 📝 Content Management

Content is managed through Contentful CMS. Key content types:

- Medicare Plans
- Resources
- FAQs
- Team Members
- Testimonials
- Blog Posts
- Videos

### Team Management via Contentful

Team member information is now managed dynamically through Contentful using the `teamMemberCards` content type. This allows non-technical staff to easily add, update, or remove team members without code deployments.

**Content Type: `teamMemberCards`**
- **employeeName** (Text): Full name of the team member
- **employeeTitle** (Text): Job title or position
- **employeeDept** (Text): Department (Leadership, Sales, Administrative, Marketing)
- **employeeEmail** (Text): Business email address
- **headshot** (Media): Professional headshot photo

**How to manage team members:**
1. Log into Contentful CMS
2. Navigate to Content → Team Member Cards
3. To add a new member: Click "Add entry" and fill in all fields
4. To edit existing member: Click on their entry and update fields
5. To remove a member: Archive or delete their entry
6. Publish changes when ready

**Department Organization:**
Team members are automatically grouped by department and displayed in this order:
1. Leadership
2. Sales  
3. Administrative
4. Marketing

**Image Management:**
- Upload new headshots directly to Contentful as assets
- Recommended image size: 300x300px minimum
- Supported formats: JPG, PNG, WebP
- Images are automatically optimized for web delivery
- Fallback to placeholder images if no headshot is provided

### Table of Contents Implementation

The site includes an interactive Table of Contents feature that:

- Automatically generates anchor links for all headings (H2-H6)
- Provides smooth scrolling navigation
- Updates active section based on scroll position
- Maintains proper heading hierarchy
- Improves content accessibility and navigation
- Enhances SEO through proper heading structure

Example usage in page components:
```tsx
<TableOfContents
  headings={[
    { id: 'section-1', text: 'Section 1', level: 2 },
    { id: 'subsection-1-1', text: 'Subsection 1.1', level: 3 },
    // ... more headings
  ]}
/>
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Run accessibility tests
npm run test:a11y
```

## 🔄 Deployment

The site is deployed to production using GitHub Actions. The workflow:

1. Run tests
2. Build production assets
3. Deploy to hosting platform
4. Run post-deployment checks

## 📈 Performance Monitoring

- Google Analytics 4
- Error tracking
- Performance metrics
- User behavior analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🔍 SEO Implementation

### Technical SEO
- XML Sitemaps with image and news support
- Robots.txt with specific crawler directives
- Structured data (JSON-LD) for Medicare plans
- Canonical URLs implementation
- Hreflang tags for language targeting
- Mobile-first responsive design
- Fast loading times (Core Web Vitals optimization)

### Content SEO
- Semantic HTML structure
- Meta tags optimization
- Open Graph and Twitter Card support
- Alt text for all images
- Internal linking strategy
- URL structure optimization
- Content hierarchy (H1-H6)

### Performance SEO
- Image optimization
- Lazy loading
- Code splitting
- Caching strategy
- CDN implementation
- Gzip compression
- Minification of assets

### Monitoring
- Google Search Console integration
- Bing Webmaster Tools
- Regular SEO audits
- Keyword tracking
- Backlink monitoring
- Mobile usability testing
- Core Web Vitals monitoring

## 🌐 Sitemap & Dynamic URL Structure

- The sitemap.xml in /public includes all major static and dynamic routes.
- Foundational pages (Contentful type: foundationalPage) use their direct paths under the appropriate section (e.g., `/medicare/{pageSlug}` or `/plans/{pageSlug}`).
- When adding or updating foundational pages, ensure the correct path structure is maintained for proper routing and SEO.
- The sitemap should be updated to reflect any new or changed page URLs.

### Example Page URLs
- `/medicare/what-is-medicare`
- `/plans/medicare-advantage`
- `/resources/enrollment-guide`

## 🤖 robots.txt
- The robots.txt in /public references the sitemap and allows/disallows crawling as appropriate.
- Ensure new dynamic routes are not accidentally disallowed.
