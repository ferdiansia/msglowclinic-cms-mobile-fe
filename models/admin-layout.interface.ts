import { ISidebarRoutes } from './sidebar.interface';

export interface IAdminLayout {
  brandText: string;
  routes: ISidebarRoutes[];
  logo: {
    innerLink?: string;
    outterLink?: string;
    imgSrc: string;
    imgAlt: string;
  };
  children: any;
}
