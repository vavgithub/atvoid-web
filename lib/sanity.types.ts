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

export interface HomePage {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  hero?: {
    mainHeading?: string;
    discoveryCall?: {
      label?: string;
      href?: string;
    };
    primaryCta?: {
      label?: string;
      href?: string;
    };
    showreelCard?: {
      logo?: {
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
      yearLabel?: string;
      heading?: string;
      subheading?: string;
      locationText?: string;
      reachText?: string;
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
    };
  };
  awardWinningStudio?: {
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
  selectedWorks?: {
    heading?: string;
    cta?: {
      label?: string;
      href?: string;
    };
    cards?: Array<{
      title?: string;
      client?: string;
      narrative?: string;
      index?: string;
      href?: string;
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
    }>;
  };
  finalCta?: {
    heading?: string;
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

