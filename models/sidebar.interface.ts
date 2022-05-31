export interface ISidebar {
  routes: ISidebarRoutes[];
  logo: {
    innerLink?: string;
    outterLink?: string;
    imgSrc: string;
    imgAlt: string;
  };
}

export interface ISidebarRoutes {
  layout: string;
  path: string;
  icon: string;
  name: string;
  children: ISidebarRoutes[];
}
