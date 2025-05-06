# Medicare Website Implementation Guide

## Core Implementation Prompt

```markdown
Create a Medicare-focused insurance website that prioritizes clarity, compliance, and accessibility for seniors with the following specifications:

### Technical Requirements
- React 18 with TypeScript
- Vite for build tooling
- Contentful CMS integration
- SEO-optimized structure
- Senior-friendly responsive design
- Compliance with Medicare marketing guidelines

### Directory Structure
/
├── medicare/
│   ├── basics/                    # Medicare 101 content
│   │   ├── what-is-medicare/      # Foundational knowledge
│   │   ├── enrollment-periods/    # Initial, Special, General
│   │   └── costs/                 # Premiums, deductibles, coinsurance
│   ├── eligibility/              # Who qualifies
│   │   ├── age-based/            # 65+ enrollment
│   │   ├── disability/           # Under 65 eligibility
│   │   └── special-circumstances/# ESRD, ALS
│   ├── parts/                    # Medicare parts
│   │   ├── part-a/               # Hospital insurance
│   │   ├── part-b/               # Medical insurance
│   │   ├── part-c/               # Medicare Advantage
│   │   └── part-d/               # Prescription drugs
│   ├── supplement/               # Medigap plans
│   ├── compare/                  # Plan comparison tools
│   └── faqs/                     # Common Medicare questions
│
├── plans/
│   ├── advantage/                # Medicare Advantage
│   │   ├── hmo/                  # HMO plans
│   │   ├── ppo/                  # PPO plans
│   │   └── special-needs/        # SNP plans
│   ├── supplement/               # Medigap plans
│   │   ├── plan-g/               # Popular supplement plan
│   │   ├── plan-n/               # Cost-sharing plan
│   │   └── high-deductible/      # HD plans
│   ├── prescription/             # Part D plans
│   ├── dental/                   # Dental coverage
│   └── vision/                   # Vision coverage
│
├── resources/
│   ├── guides/                   # Educational guides
│   │   ├── enrollment/           # How to enroll
│   │   ├── switching-plans/      # Plan changes
│   │   └── cost-estimator/       # Cost calculator
│   ├── calculators/              # Medicare tools
│   │   ├── irmaa/                # Income-related calculator
│   │   └── part-d-costs/         # Drug cost estimator
│   ├── glossary/                 # Medicare terms
│   └── state-specific/           # State resources
│
├── blog/                         # Medicare education
│   ├── [slug]                    # Blog posts
│
└── videos/                       # Educational videos
    └── watch/                    # Video content
        └── [slug]                # Video pages

### Content Types
1. Foundational Pages
   - Title, description, content
   - Medicare-specific metadata
   - Compliance statements
   - Required disclaimers
   - Related Medicare content

2. Blog Posts
   - Medicare-focused topics
   - Author credentials
   - Publication date
   - Compliance review date
   - Required disclaimers
   - Related Medicare resources

3. Videos
   - Medicare education content
   - Transcript with Medicare terms
   - Closed captions
   - Compliance statements
   - Duration markers

4. Resource Guides
   - Medicare-specific content
   - State-specific information
   - Required disclaimers
   - Downloadable PDFs
   - Related Medicare plans

### SEO Requirements
- Medicare-focused keywords
- Local SEO for service areas
- Schema markup for:
  - Medicare plans
  - Insurance agencies
  - Educational content
- Meta tags with Medicare terms
- Canonical URLs
- Sitemap with priority content
- Breadcrumb navigation

### Performance
- Senior-friendly load times
- Large, readable text
- High contrast design
- Simple navigation
- Clear call-to-actions
```

## Medicare-Specific Prompting Patterns

### Plan Comparison Component
```markdown
Create a Medicare plan comparison component with:
- Clear plan type differentiation
- Cost comparison tables
- Coverage details
- Network information
- Required disclaimers
- Accessibility features
- Senior-friendly UI
```

### Enrollment Guide Page
```markdown
Implement a Medicare enrollment guide with:
- Step-by-step instructions
- Important deadlines
- Required documentation
- Common mistakes to avoid
- State-specific information
- Compliance statements
- Help resources
```

### Cost Calculator
```markdown
Create a Medicare cost calculator with:
- Premium calculations
- Deductible tracking
- Coinsurance estimates
- IRMAA considerations
- Part D cost estimator
- Clear results display
- Required disclaimers
```

## Medicare Implementation Tips

### 1. Compliance Focus
- Include required disclaimers
- Follow Medicare marketing guidelines
- Update content annually
- Document compliance reviews
- Maintain agent credentials

### 2. Senior Accessibility
- Large, readable text
- High contrast design
- Simple navigation
- Clear instructions
- Multiple contact methods

### 3. Educational Content
- Clear explanations
- Visual aids
- Real-world examples
- Common questions
- State-specific information

### 4. Plan Information
- Accurate coverage details
- Clear cost breakdowns
- Network information
- Formulary details
- Annual notice of change

## Medicare-Specific Testing

### Plan Comparison Testing
```markdown
Test Medicare plan comparison for:
- Accurate cost calculations
- Correct coverage details
- Required disclaimers
- Accessibility compliance
- Mobile responsiveness
```

### Enrollment Flow Testing
```markdown
Test Medicare enrollment process for:
- Step completion
- Document uploads
- Error handling
- Compliance checks
- User guidance
```

### Cost Calculator Testing
```markdown
Test Medicare cost calculator for:
- Premium calculations
- Deductible tracking
- IRMAA accuracy
- Part D estimates
- Result clarity
```

## Common Medicare Pitfalls

### 1. Compliance Issues
```markdown
❌ "Explain Medicare benefits"
✅ "Explain Medicare benefits with:
- Required disclaimers
- Compliance statements
- Agent credentials
- Marketing guidelines
- Annual review dates"
```

### 2. Accessibility Problems
```markdown
❌ "Make it readable"
✅ "Implement senior-friendly design with:
- 16px minimum font size
- High contrast ratios
- Simple navigation
- Clear instructions
- Multiple contact options"
```

### 3. Content Accuracy
```markdown
❌ "List plan benefits"
✅ "Document plan benefits with:
- Current year information
- Coverage details
- Cost breakdowns
- Network information
- Required disclaimers"
```

### 4. User Guidance
```markdown
❌ "Help users enroll"
✅ "Guide users through enrollment with:
- Step-by-step instructions
- Required documents
- Important deadlines
- Common questions
- Help resources"
``` 