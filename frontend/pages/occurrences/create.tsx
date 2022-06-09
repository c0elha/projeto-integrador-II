import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import { getAPIClient } from '../../src/services/axios';

const OccorrencesCreate: NextPage = () => {

  const FormCreate = dynamic(() => import('./FormCreate'), {
    ssr: false,
    loading: () => <p>Carregando!</p>,
  });

  useEffect(() => { }, []);

  return (
    <main className='container'>
      <FormCreate></FormCreate>
    </main>
  );
};

export default OccorrencesCreate;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const apiClient = getAPIClient(ctx);
//   const { ['nextauth.token']: token } = parseCookies(ctx)

//   if (!token) {
//     return {
//       redirect: {
//         destination: '/auth/login',
//         permanent: false,
//       }
//     }
//   }

//   var redirectUrl = '/auth/login'

//   await apiClient
//     .get(`user/me/`).then(({ data }) => {
//       redirectUrl = '/occurrences/create'
//     })
//     .catch(() => {
//       destroyCookie(null, 'nextauth.token');
//     });

//   return {
//     redirect: {
//       destination: redirectUrl,
//       permanent: false,
//     }
//   }
// }

