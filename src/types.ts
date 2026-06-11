export interface Author {
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
  avatarColor: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[]; // multi-paragraph for readability
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  author: Author;
  coverStyle: {
    bgGradient: string;
    patternType: 'waves' | 'circles' | 'blobs' | 'stripes';
  };
  comments: Comment[];
  isFeatured?: boolean;
  isPopular?: boolean;
  tableOfContents?: { id: string; label: string }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  count: number;
}

export interface LeadMagnet {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge: string;
  premiumLabel: string;
  contentTitle: string;
  contentSections: {
    title: string;
    items: string[];
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}
