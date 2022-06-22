import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import RenderCompleted from '../../src/components/RenderCompleted';
import { getAPIClient } from '../../src/services/axios';
import { destroyCookie, parseCookies } from 'nookies';

const OccorrencesCreate: NextPage = () => {
  const isMounted = RenderCompleted();

  const FormCreate = useMemo(
    () =>
      dynamic(() => import('./../../src/components/FormCreate'), {
        loading: () => <p style={{textAlign: 'center'}}>Carregando!</p>,
        ssr: false,
      }),
    []
  );

  useEffect(() => {}, []);

  return <main className='container'>{isMounted && <FormCreate />}</main>;
};

export default OccorrencesCreate;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  var user = false;
  const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  var redirectUrl = '/auth/login';

  await apiClient
    .get(`user/me/`)
    .then(({ data }) => {
      user = true;
    })
    .catch(() => {
      destroyCookie(null, 'nextauth.token');
    });

  if (user) {
    return {
      props: {},
    };
  }

  return {
    redirect: {
      destination: redirectUrl,
      permanent: false,
    },
  };
};
