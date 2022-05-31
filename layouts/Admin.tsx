import React from 'react';
import { useRouter } from 'next/router';
import { Container } from 'reactstrap';
import Sidebar from '../components/Sidebar/Sidebar';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import Footer from '../components/Footers/Footer';
import { IAdminLayout } from '../models/admin-layout.interface';
import { routes } from '../util/routes';
import Header from '../components/Headers/Header';

export default function Admin(props: IAdminLayout) {
  const router = useRouter();
  let mainContentRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
    if (mainContentRef.current) mainContentRef.current.scrollTop = 0;
  }, []);

  const getBrandText = (): string => {
    for (let i = 0; i < routes.length; i++) {
      if (router.route.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/admin/index',
          imgSrc: '/img/brand/nextjs_argon_black.png',
          imgAlt: '...',
        }}
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar brandText={getBrandText()} />
        <Header />
        {props.children}
      </div>
    </>
  );
}
