import type { GetServerSideProps, NextPage } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { api } from '../../src/services/api';
import { getAPIClient } from '../../src/services/axios';

interface Occurrences {
  id: number;
}

const OccorrencesIndex: NextPage = () => {
  const [occurrences, setOccurrences] = useState<[]>([]);

  useEffect(() => {
    api
      .get('/occurrences-list/')
      .then(({ data }) => {
        setOccurrences(data);
        console.log(data);
      })
      .catch((error) => {});
  }, []);

  return (
    <div className=''>
      {occurrences.map((occurrence) => {
        return (
          <div key={occurrence.id} style={{ border: '1px solid red' }}>
            <span>{occurrence.title}</span>
            <p>{occurrence.description}</p>

            <a href='#'>Editar</a>
            <a href='#'>Visualizar</a>
          </div>
        );
      })}
    </div>
  );
};

export default OccorrencesIndex;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
      window.location.href = '/occurrences/list';
    })
    .catch(() => {
      destroyCookie(null, 'nextauth.token');
      window.location.href = '/auth/login';
    });

  return {
    props: {},
  };
};
