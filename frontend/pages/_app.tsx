import '../styles/globals.css';
import '../styles/forms.css';
import '../styles/buttons.css';
import 'bootstrap/dist/css/bootstrap-grid.css';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
// import 'leaflet-defaulticon-compatibility';

import Layout from '../src/components/Layout';
import Head from 'next/head'
import { AppProps } from 'next/app';
import { AuthProvider } from '../src/contexts/AuthContext';

function MyApp({ Component, pageProps } : AppProps) {
  return (
    <AuthProvider>
       <Head>
        <title>Projeto Integrador II - Group 021</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
       <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
