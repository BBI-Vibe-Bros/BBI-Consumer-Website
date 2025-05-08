# BBI Insurance Medicare Website

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
- **Build Tool**: Vite
- **CMS**: Contentful
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint, Prettier
- **Security**: CSP, Rate Limiting, Security Headers

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
├── pages/              # Page components and routing
├── styles/             # Global styles and Tailwind config
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and helpers
```

## 🛣️ Routing Structure

The application uses the following routes:

- `/` - Homepage
- `/medicare/basics/*` - Medicare basics pages
- `/medicare/eligibility` - Medicare eligibility
- `/medicare/four-parts-of-medicare` - Medicare parts overview
- `/medicare-breakdown` - 'Medicare Breakdown: The Alphabet Soup of Medicare' Book Landing Page
- `/plans/*` - Medicare plan pages
- `/resources/*` - Resource pages
- `/blog` - Blog listing
- `/videos` - Video content
- `/about-us` - About page
- `/contact` - Contact page
- `/privacy-policy` - Privacy policy

Example URLs:
- https://www.bobbybrockinsurance.com/medicare-breakdown
- https://www.bobbybrockinsurance.com/plans/advantage
- https://www.bobbybrockinsurance.com/resources/guides

## 🔒 Security Features

- Content Security Policy (CSP)
- Rate Limiting
- Security Headers
- XSS Protection
- CSRF Protection
- HTTPS Enforcement

## 🎯 Key Features

- Responsive design for all devices
- Accessibility compliance (WCAG 2.1)
- SEO optimization
- Fast page loads
- Secure form handling
- Content management via Contentful
- Automatic scroll-to-top on navigation
- React Router for client-side routing

## 📝 Content Management

Content is managed through Contentful CMS. Key content types:

- Medicare Plans
- Resources
- FAQs
- Team Members
- Testimonials
- Blog Posts
- Videos

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
- Foundational pages (Contentful type: foundationalPage) now use a `parentSlug` field to determine their URL structure, e.g. `/basics/{pageSlug}` or `/plans/{pageSlug}`.
- When adding or updating foundational pages, ensure the `parentSlug` is set in Contentful for correct routing and SEO.
- The sitemap should be updated to reflect any new or changed foundationalPage URLs.

### Example FoundationalPage URLs
- `/basics/what-is-medicare`
- `/plans/advantage`
- `/resources/enrollment-guide`

## 🤖 robots.txt
- The robots.txt in /public references the sitemap and allows/disallows crawling as appropriate.
- Ensure new dynamic routes are not accidentally disallowed.
