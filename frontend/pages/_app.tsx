import '../styles/globals.css'
import { AuthProvider } from '../src/contexts/AuthContext'
import Layout from '../src/components/Layout';
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
       <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-v4-grid-only@1.0.0/dist/bootstrap-grid.css"/>
      </Head>
       <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
