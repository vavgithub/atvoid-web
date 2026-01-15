import { client } from './sanity.client';
import type { AboutPage } from './sanity.types';

export const aboutPageQuery = `*[_type == "aboutPage" && _id == "aboutPage"][0]{
  _id,
  title,
  slug,
  intro{
    heading1,
    heading2,
    heading3,
    description,
    ctaText,
    video{
      asset->{
        _id,
        url,
        originalFilename,
        mimeType,
        size
      }
    }
  },
  mission{
    title,
    content
  },
  values[]{
    title,
    description,
    icon
  },
  team{
    heading,
    members[]{
      name,
      role,
      bio,
      image{
        asset->{
          _id,
          url,
          metadata{
            dimensions{
              width,
              height
            }
          }
        }
      }
    }
  },
  seo{
    metaTitle,
    metaDescription,
    ogImage{
      asset->{
        _id,
        url
      }
    }
  }
}`;

export async function getAboutPage(): Promise<AboutPage | null> {
  return await client.fetch(aboutPageQuery);
}

