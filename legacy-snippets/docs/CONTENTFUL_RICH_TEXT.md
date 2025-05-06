# Contentful Rich Text Implementation Guide

## Overview

This document details the implementation of Contentful's rich text rendering in foundational pages, including component structure, styling, and special handling for Medicare-specific content.

## Rich Text Field Structure

### Content Model
```typescript
interface RichTextContent {
  nodeType: string;
  content: RichTextNode[];
  data: {
    target?: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    };
  };
}

interface RichTextNode {
  nodeType: string;
  content?: RichTextNode[];
  data?: Record<string, any>;
  marks?: Array<{
    type: string;
  }>;
  value?: string;
}
```

## Component Implementation

### RichTextRenderer Component
```typescript
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => (
      <strong className="font-bold">{text}</strong>
    ),
    [MARKS.ITALIC]: (text: React.ReactNode) => (
      <em className="italic">{text}</em>
    ),
    [MARKS.UNDERLINE]: (text: React.ReactNode) => (
      <u className="underline">{text}</u>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
      <p className="mb-4 text-base leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
      <h1 className="text-4xl font-bold mb-6">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
      <h2 className="text-3xl font-bold mb-5">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
      <h3 className="text-2xl font-bold mb-4">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => (
      <h4 className="text-xl font-bold mb-3">{children}</h4>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
      <ul className="list-disc pl-6 mb-4">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
      <ol className="list-decimal pl-6 mb-4">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
      <li className="mb-2">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-bbi-blue pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => (
      <hr className="my-6 border-t border-gray-200" />
    ),
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
      <a 
        href={node.data.uri} 
        className="text-bbi-blue hover:text-bbi-red underline"
        target={node.data.uri.startsWith('http') ? '_blank' : undefined}
        rel={node.data.uri.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    [INLINES.ENTRY_HYPERLINK]: (node: any, children: React.ReactNode) => {
      const entry = node.data.target;
      return (
        <Link 
          href={`/${entry.sys.contentType.sys.id}/${entry.fields.slug}`}
          className="text-bbi-blue hover:text-bbi-red underline"
        >
          {children}
        </Link>
      );
    },
  },
};
```

## Template-Specific Implementations

### Medicare Education Pages
```typescript
// components/MedicareContent.tsx
interface MedicareContentProps {
  content: RichTextContent;
  planType?: 'part-a' | 'part-b' | 'part-c' | 'part-d';
}

const MedicareContent: React.FC<MedicareContentProps> = ({ content, planType }) => {
  const customOptions = {
    ...options,
    renderNode: {
      ...options.renderNode,
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
        <p className="mb-4 text-base leading-relaxed text-gray-800">
          {children}
        </p>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
        <h2 className="text-3xl font-bold mb-5 text-bbi-blue">
          {children}
        </h2>
      ),
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      {documentToReactComponents(content, customOptions)}
    </div>
  );
};
```

### Plan Comparison Pages
```typescript
// components/PlanComparisonContent.tsx
interface PlanComparisonContentProps {
  content: RichTextContent;
  planType: 'advantage' | 'supplement' | 'prescription';
}

const PlanComparisonContent: React.FC<PlanComparisonContentProps> = ({ 
  content, 
  planType 
}) => {
  const customOptions = {
    ...options,
    renderNode: {
      ...options.renderNode,
      [BLOCKS.TABLE]: (node: any, children: React.ReactNode) => (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            {children}
          </table>
        </div>
      ),
      [BLOCKS.TABLE_ROW]: (node: any, children: React.ReactNode) => (
        <tr className="border-b border-gray-200">{children}</tr>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (node: any, children: React.ReactNode) => (
        <th className="px-4 py-2 text-left font-bold bg-gray-50">
          {children}
        </th>
      ),
      [BLOCKS.TABLE_CELL]: (node: any, children: React.ReactNode) => (
        <td className="px-4 py-2">{children}</td>
      ),
    },
  };

  return (
    <div className="max-w-6xl mx-auto">
      {documentToReactComponents(content, customOptions)}
    </div>
  );
};
```

## Special Content Types

### Embedded Assets
```typescript
// components/EmbeddedAsset.tsx
interface EmbeddedAssetProps {
  asset: {
    sys: {
      id: string;
    };
    fields: {
      title: string;
      file: {
        url: string;
        contentType: string;
      };
    };
  };
}

const EmbeddedAsset: React.FC<EmbeddedAssetProps> = ({ asset }) => {
  if (asset.fields.file.contentType.startsWith('image/')) {
    return (
      <div className="my-6">
        <Image
          src={`https:${asset.fields.file.url}`}
          alt={asset.fields.title}
          width={800}
          height={600}
          className="rounded-lg shadow-md"
        />
      </div>
    );
  }
  
  if (asset.fields.file.contentType === 'application/pdf') {
    return (
      <div className="my-6">
        <a
          href={`https:${asset.fields.file.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-bbi-blue hover:text-bbi-red"
        >
          <DocumentIcon className="w-5 h-5 mr-2" />
          {asset.fields.title}
        </a>
      </div>
    );
  }
  
  return null;
};
```

### Embedded Entries
```typescript
// components/EmbeddedEntry.tsx
interface EmbeddedEntryProps {
  entry: {
    sys: {
      contentType: {
        sys: {
          id: string;
        };
      };
    };
    fields: {
      title: string;
      slug: string;
      // Add other fields based on content type
    };
  };
}

const EmbeddedEntry: React.FC<EmbeddedEntryProps> = ({ entry }) => {
  switch (entry.sys.contentType.sys.id) {
    case 'resourceGuide':
      return (
        <div className="my-6 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-bold mb-2">{entry.fields.title}</h3>
          <Link
            href={`/resources/${entry.fields.slug}`}
            className="text-bbi-blue hover:text-bbi-red"
          >
            Learn More →
          </Link>
        </div>
      );
    
    case 'video':
      return (
        <div className="my-6">
          <VideoPlayer
            title={entry.fields.title}
            videoId={entry.fields.videoId}
          />
        </div>
      );
    
    default:
      return null;
  }
};
```

## Styling Guidelines

### Typography
- Base font size: 16px (1rem)
- Line height: 1.75 (leading-relaxed)
- Paragraph spacing: 1rem (mb-4)
- Heading hierarchy follows design system

### Colors
- Text: #1F2937 (text-gray-800)
- Links: #1E40AF (text-bbi-blue)
- Hover links: #DC2626 (text-bbi-red)
- Quotes: #1E40AF (border-bbi-blue)

### Spacing
- Content width: max-w-4xl (Medicare pages)
- Content width: max-w-6xl (Plan comparison)
- Vertical rhythm: Consistent spacing between elements

## Accessibility Considerations

1. **Semantic Structure**
   - Proper heading hierarchy
   - List structure for ordered/unordered lists
   - Table markup for tabular data

2. **Interactive Elements**
   - Focus states for links
   - ARIA labels for embedded content
   - Keyboard navigation support

3. **Content Readability**
   - Sufficient contrast ratios
   - Responsive text sizing
   - Clear visual hierarchy

## Testing Requirements

1. **Content Rendering**
   - Verify all rich text nodes render correctly
   - Check embedded assets and entries
   - Validate link behavior

2. **Responsive Design**
   - Test on mobile, tablet, and desktop
   - Verify table scrolling
   - Check image responsiveness

3. **Accessibility**
   - Run WCAG compliance checks
   - Test screen reader compatibility
   - Verify keyboard navigation

## Implementation Notes

1. **Performance**
   - Lazy load embedded assets
   - Optimize image delivery
   - Cache rendered content

2. **Error Handling**
   - Graceful fallbacks for missing content
   - Error boundaries for rendering issues
   - Loading states for embedded content

3. **Content Updates**
   - ISR for dynamic content
   - Webhook handling for updates
   - Cache invalidation strategy 