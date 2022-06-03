import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const Login = Loader(lazy(() => import('src/content/login')));

// Dashboards

const Home = Loader(lazy(() => import('src/content/dashboards/Home')));

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
        element: <Navigate to="/dashboards/Home" replace />
      },
      {
        path: 'home',
        element: <Home />
      }
    ]
  }
];

export default routes;
