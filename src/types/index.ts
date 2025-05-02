
// Medicare Types
export interface MedicarePlan {
  id: string;
  type: 'advantage' | 'supplement' | 'prescription';
  name: string;
  provider: string;
  description: string;
  premium: number;
  deductible: number;
  benefits: string[];
}

export interface MedicareArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  category: string;
  tags: string[];
  image?: string;
  readTime: number;
}

export interface MedicareResource {
  id: string;
  title: string;
  description: string;
  link: string;
  type: 'guide' | 'calculator' | 'video' | 'article';
  icon?: string;
}

export interface NavigationLink {
  title: string;
  href: string;
  submenu?: NavigationLink[];
}

export interface MedicareFAQ {
  question: string;
  answer: string;
  category: string;
}
