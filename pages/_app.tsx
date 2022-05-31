import 'reflect-metadata';
import type { AppContext } from 'next/app';

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';

import PageChange from '../components/PageChange/PageChange';

import '../styles/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/globals.scss';

Router.events.on('hashChangeStart', (url) => {
  document.body.classList.add('body-page-transition');
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById('page-transition')
  );
});

Router.events.on('routeChangeComplete', () => {
  ReactDOM.unmountComponentAtNode(
    document.getElementById('page-transition') as HTMLBodyElement
  );
  document.body.classList.remove('body-page-transition');
});
Router.events.on('routeChangeError', () => {
  ReactDOM.unmountComponentAtNode(
    document.getElementById('page-transition') as HTMLBodyElement
  );
  document.body.classList.remove('body-page-transition');
});

export default class MyApp extends App {
  componentDidMount() {}

  static async getInitialProps({ Component, router, ctx }: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    const Layout =
      Component.layout ||
      (({ children }: { children: any }) => <>{children}</>);

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>MSClinic CMS</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    );
  }
}
