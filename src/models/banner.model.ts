export interface IBanner {
  id?: string;
  title: string;
  slug: IBannerSlug;
  description: string;
  expired_at: string;
  created_at: string;
  updated_at: string;
  file?: {
    id: string;
    url: string;
    slug: 'file-banner';
    created_at: string;
    updated_at: string;
  };
}

export type IBannerSlug = `${IBannerType}-banner`;
export type IBannerType = 'main' | 'promo' | 'about-us' | 'commerce' | 'about-us-gallery';
