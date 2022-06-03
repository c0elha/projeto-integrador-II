import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import { useAuth} from '../src/contexts/AuthContext';
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../src/services/axios'
import { parseCookies } from 'nookies'

const Home: NextPage = () => {
  const { user } = useAuth();

  useEffect(() => {
    
  }, [])

  return (
    <div style={{maxWidth: '600px', margin: '0 auto', padding: '10px '}}>
      <h1>Olá, {user?.username}!</h1>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx)
  
  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      }
    }
  }

  console.log('apiClient', apiClient);
  // await apiClient.get('/users')

  return {
    props: {}
  }
}
