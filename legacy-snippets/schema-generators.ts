interface VideoSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl: string;
}

interface BlogSchema {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: {
    '@type': string;
    name: string;
  };
}

interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item?: string;
  }>;
}

interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

export class SchemaGenerator {
  generateVideoSchema(video: {
    title: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    videoUrl: string;
  }): VideoSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      uploadDate: video.uploadDate,
      contentUrl: video.videoUrl,
    };
  }

  generateBlogSchema(blog: {
    title: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified: string;
    authorName: string;
  }): BlogSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.description,
      image: blog.image,
      datePublished: blog.datePublished,
      dateModified: blog.dateModified,
      author: {
        '@type': 'Person',
        name: blog.authorName,
      },
    };
  }

  generateBreadcrumbSchema(items: Array<{ name: string; url?: string }>): BreadcrumbSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        ...(item.url && { item: item.url }),
      })),
    };
  }

  generateFAQSchema(questions: Array<{ question: string; answer: string }>): FAQSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: questions.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    };
  }
} 