export interface ContentfulAsset {
  fields: {
    file: {
      url: string;
      contentType: string;
      details?: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
    };
    title: string;
    description?: string;
  };
}

export interface ContentfulEntry<T> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    contentType: {
      sys: {
        id: string;
        linkType: string;
        type: string;
      };
    };
  };
  fields: T;
}

export interface ContentfulResponse<T> {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: ContentfulEntry<T>[];
  includes?: {
    Asset?: ContentfulAsset[];
  };
} 