import type { GetServerSideProps, NextPage } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { useMemo } from 'react';
import { getAPIClient } from '../../../src/services/axios';
import dynamic from 'next/dynamic';
import RenderCompleted from '../../../src/components/RenderCompleted';

const OccorrencesEdit: NextPage = ({ id, occurrence }: any) => {
  
  const isMounted = RenderCompleted();

  const FormEdit = useMemo(
    () =>
      dynamic(() => import('./../../../src/components/FormEdit'), {
        loading: () => <p>Carregando!</p>,
        ssr: false,
      }),
    []
  );

  return (
    <main className='container'>
      {isMounted && <FormEdit id={id} occurrence={occurrence} />}
    </main>
  );
};

export default OccorrencesEdit;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  var redirectURL = '';
  var occurrence = {};
  const { query } = ctx;
  const { id } = query;
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

  await apiClient
    .get(`user/me/`)
    .then(({ data }) => {
      console.log('data');
    })
    .catch(() => {
      destroyCookie(null, 'nextauth.token');
      redirectURL = '/auth/login';
    });

  if (redirectURL) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  await apiClient
  .get(`/occurrences/${id}/`)
  .then(({ data }) => {
    occurrence= data
  });

  return {
    props: {
      id: id,
      occurrence: occurrence
    },
  };
};
