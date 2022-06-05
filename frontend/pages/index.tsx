import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import { useAuth} from '../src/contexts/AuthContext';
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../src/services/axios'
import { parseCookies, destroyCookie } from 'nookies'

const Home: NextPage = () => {
  const { user } = useAuth();

  useEffect(() => {
    
  }, [])

  return (
    <div style={{maxWidth: '600px', margin: '0 auto', padding: '10px '}}>
      Home texto
    </div>
  )
}

export default Home