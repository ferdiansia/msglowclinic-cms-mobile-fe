import { IBannerSlug } from './banner.model';

export interface IGetParams {
  type: 'collection' | 'pagination';
  q?: string;
  page?: string;
  sort_by?: 'asc' | 'desc';
  order_by?: string;
  limit?: number;
  relations?: string;
}

export interface IGetParamsBanner extends IGetParams {
  slug: IBannerSlug;
}
