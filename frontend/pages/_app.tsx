import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../src/contexts/AuthContext'
import Layout from '../src/components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
       <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
