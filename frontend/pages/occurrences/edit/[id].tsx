import type { GetServerSideProps, NextPage } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { api } from '../../../src/services/api';
import { getAPIClient } from '../../../src/services/axios';

const OccorrencesEdit: NextPage = ({ id }) => {
  const [occurrence, setOccurrence] = useState<[]>([]);

  useEffect(() => {
    if (id) {
      api
        .get(`/occurrences/${id}/`)
        .then(({ data }) => {
          setOccurrence(data);
          console.log(data);
        })
        .catch((error) => {});
    }
  }, []);

  return <div className='container'>edit ocorrencia</div>;
};

export default OccorrencesEdit;

OccorrencesEdit.getInitialProps = ({ query: { id } }) => {
  return { id };
};

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

  await apiClient
    .get(`user/me/`).then(({ data }) => {
      window.location.href = '/occurrences/list'
    })
    .catch(() => {
      destroyCookie(null, 'nextauth.token');
      window.location.href = '/auth/login';
    });

  return {
    props: {}
  }
}

