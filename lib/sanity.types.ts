export interface AboutPage {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  intro: {
    heading1?: string;
    heading2?: string;
    heading3?: string;
    description?: string;
    ctaText?: string;
    video?: {
      asset: {
        _id: string;
        url: string;
        originalFilename?: string;
        mimeType?: string;
        size?: number;
      };
    };
  };
  mission?: {
    title?: string;
    content?: any[]; // Portable text blocks
  };
  values?: Array<{
    title?: string;
    description?: string;
    icon?: string;
  }>;
  team?: {
    heading?: string;
    members?: Array<{
      name?: string;
      role?: string;
      bio?: string;
      image?: {
        asset: {
          _id: string;
          url: string;
          metadata?: {
            dimensions?: {
              width: number;
              height: number;
            };
          };
        };
      };
    }>;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: {
      asset: {
        _id: string;
        url: string;
      };
    };
  };
}

