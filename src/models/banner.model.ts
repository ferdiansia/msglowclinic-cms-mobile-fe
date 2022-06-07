export interface IBanner {
  id: string;
  title: string;
  slug: IBannerSlug;
  description: string;
  expired_at: string;
  created_at: string;
  updated_at: string;
}

export type IBannerSlug = `${'main' | 'promo'}-banner`;
