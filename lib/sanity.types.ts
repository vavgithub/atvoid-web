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

/** Experience badge, intro, trusted-by — used by Hero section (and legacy awardWinningStudio). */
export type HeroSectionContent = {
  /** Centered video layered above the hero background image */
  backgroundVideoUrl?: string;
  experienceBadge?: {
    icon?: {
      asset?: {
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
    description?: string;
  };
  intro?: {
    heading?: string;
    description?: any[];
  };
  trustedBy?: {
    heading?: string;
    logos?: Array<{
      image?: {
        asset?: {
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
      altText?: string;
    }>;
  };
};

export interface HomePage {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  showReelsSection?: {
    image?: {
      asset?: {
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
    video?: {
      asset?: {
        _id: string;
        url: string;
        originalFilename?: string;
        mimeType?: string;
      };
    };
  };
  heroSection?: HeroSectionContent;
  awardWinningStudio?: HeroSectionContent & {
    messageSection?: {
      textContent?: {
        backgroundText?: {
          asset?: {
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
        paragraph1?: string;
        paragraph2?: string;
        concludingStatement?: string;
      };
      image?: {
        asset?: {
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
    };
  };
  digitalEcosystem?: {
    mainHeading?: string;
    subheading?: {
      line1?: string;
      line2?: string;
    };
    backgroundImage?: {
      asset?: {
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
    categories?: Array<{
      title?: string;
      description?: string;
      style?: string;
    }>;
    services?: Array<{
      name?: string;
    }>;
  };
  coherenceIsAlive?: {
    headline?: string;
    image?: {
      asset?: {
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
    subline?: string;
    line1?: string;
    items?: Array<{
      image?: {
        asset?: {
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
      label?: string;
    }>;
  };
  selectedWorks?: {
    heading?: string;
    cards?: Array<{
      title?: string;
      image?: {
        asset?: {
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
      client?: string;
      narrative?: string;
      index?: string;
      href?: string;
      scopeTags?: Array<{
        name?: string;
        color?: string;
      }>;
    }>;
  };
  roiOfCoherence?: {
    heading?: string;
    backgroundImage?: {
      asset?: {
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
    cards?: Array<{
      heading?: string;
      description?: string;
      image?: {
        asset?: {
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
  diverseTeam?: {
    heading?: {
      prefix1?: string;
      main1?: string;
      prefix2?: string;
      main2?: string;
    };
    arrowTarget?: {
      x?: number;
      y?: number;
    };
    backgroundImage?: {
      asset?: {
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
    teamMembers?: Array<{
      name?: string;
      color?: string;
      positionX?: number;
      positionY?: number;
      arrowColor?: string;
      arrowPositionX?: number;
      arrowPositionY?: number;
      arrowRotationDeg?: number;
    }>;
  };
  finalCta?: {
    heading?: string;
    image?: {
      asset?: {
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
    subheading?: string;
    description?: string;
    discoveryCall?: {
      label?: string;
      href?: string;
    };
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: {
      asset?: {
        _id: string;
        url: string;
      };
    };
  };
}

