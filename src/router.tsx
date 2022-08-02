import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { HOME_ROUTE } from './const/route-url';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Login = Loader(lazy(() => import('src/content/login')));
const Home = Loader(lazy(() => import('src/content/dashboards/Home')));
const MainBanner = Loader(lazy(() => import('src/content/banner/MainBanner')));
const AboutUs = Loader(lazy(() => import('src/content/about-us')));
const ItemsGroup = Loader(
  lazy(() => import('src/content/ecommerce/items-group'))
);
const ItemsCategory = Loader(
  lazy(() => import('src/content/ecommerce/items-category'))
);
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);

const routes: PartialRouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Login />
      },

      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to={`${HOME_ROUTE}`} replace />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'banner',
        element: <MainBanner />
      },
      {
        path: 'about-us',
        element: <AboutUs />
      },
      {
        path: 'ecommerce',
        children: [
          {
            path: 'items-group',
            element: <ItemsGroup />
          },
          {
            path: 'items-category',
            element: <ItemsCategory />
          }
        ]
      }
    ]
  }
];

export default routes;
