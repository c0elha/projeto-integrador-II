import type { GetServerSideProps, NextPage } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { api } from '../../../src/services/api';
import { getAPIClient } from '../../../src/services/axios';

const OccorrencesEdit: NextPage = ({ id }) => {
  console.log(id);
  const [occurrence, setOccurrence] = useState<[]>([]);

  useEffect(() => {
    if (id) {
      api
        .get(`/occurrences/${id}/`)
        .then(({ data }) => {
          setOccurrence(data);
          console.log('ocorrencia', data);
        })
        .catch((error) => { });
    }
  }, []);

  return <div className='container'>edit ocorrencia</div>;
};

export default OccorrencesEdit;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  var redirectURL = '';
  const { query } = ctx;
  const { id } = query;
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
      }
    }
  }

  return {
    props: {
      id: id
    }
  }
}

