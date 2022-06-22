import '../styles/globals.css';
import '../styles/forms.css';
import '../styles/buttons.css';
import 'bootstrap/dist/css/bootstrap-grid.css';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import Script from 'next/script'
import Layout from '../src/components/Layout';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { AuthProvider } from '../src/contexts/AuthContext';
import Loading from '../src/utils/loading';
import { useEffect } from 'react';
declare global {
  interface Window {
    loadingUtils: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.loadingUtils = new Loading();
  }, []);

  return (
    <AuthProvider>
      <Head>
        <title>Projeto Integrador II - Group 021</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Script data-account="1zkkfZZCgA" src="https://cdn.userway.org/widget.js" async></Script>
      <div id='loading' role="status">
        <span className='sr-only'>Loading...</span>
        <div className='loading-content'></div>
      </div>
    </AuthProvider>
  );
}

export default MyApp;
