import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import RenderCompleted from '../../src/components/RenderCompleted';
import { getAPIClient } from '../../src/services/axios';
import { api } from '../../src/services/api';
import { getCategories } from '../../src/services/category';

interface Category {
  id: number;
  name: string;
  description: string;
  color: string;
}

const OccorrencesAll: NextPage = ({ occurrences }: any) => {
  const isMounted = RenderCompleted();
  const [categories, setCategories] = useState<Category[]>([]);

  const MapAll = useMemo(
    () =>
      dynamic(() => import('./../../src/components/MapAll'), {
        loading: () => <p style={{textAlign: 'center'}}>Carregando!</p>,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    getCategories()
      .then(({ data } : any) => {
        console.log(data);
        setCategories(data.sort( (a : any, b:any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
      });
  }, []);

  return (
    <main className='container' style={{ marginTop: '10px' }}>
      <h2>Acompanhe as ocorrências da cidade!</h2>
      <div id="map" style={{ marginTop: '10px', minHeight: '300px', height: '60vh' }}>
        {isMounted && (
          <MapAll occurrences={occurrences} categories={categories} />
        )}
      </div>
      <div className='row'>
        <div className='col-12'>
          <h4 style={{ marginTop: '20px' }}>Legendas</h4>
        </div>
        {categories.map((category, i) => {
          return (
            <div
              className='col-12 col-lg-6 box-content-legend-category-map'
              key={i}
            >
              <div
                className={`box-legend-category-map box-legend-color-${category.color}`}
              ></div>
              <span>{category.name}</span>
            </div>
          );
        })}
        <div className='col-6 col-lg-3'></div>
      </div>
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
