import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import RenderCompleted from '../../src/components/RenderCompleted';
import { getAPIClient } from '../../src/services/axios';

const OccorrencesAll: NextPage = ({ occurrences }: any) => {
  const isMounted = RenderCompleted();

  const MapAll = useMemo(
    () =>
      dynamic(() => import('./../../src/components/MapAll'), {
        loading: () => <p>Carregando!</p>,
        ssr: false,
      }),
    []
  );

  useEffect(() => {}, []);

  return (
    <main
      className='container'
      style={{ marginTop: '10px', minHeight: '300px', height: '80vh' }}
    >
      <h3>Acompanhe as ocorrências da cidade!</h3>
      {isMounted && <MapAll occurrences={occurrences} />}
    </main>
  );
};

export default OccorrencesAll;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  var occurrences = {};
  const apiClient = getAPIClient(ctx);

  await apiClient
    .get('/occurrences-all-list/NOT_COMPLETED/')
    .then(({ data }) => {
      occurrences = data;
    })
    .catch((error) => {});

  return {
    props: {
      occurrences: occurrences,
    },
  };
};
