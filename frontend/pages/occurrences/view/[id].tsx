import type { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
// import MapView from '../../../src/components/MapView';
import RenderCompleted from '../../../src/components/RenderCompleted';
import { api } from '../../../src/services/api';
import { getAPIClient } from '../../../src/services/axios';
import styles from './../../../styles/pages/OccurrenceView.module.scss';

interface Category {
  id: number;
  name: string;
  description: string;
}

const OccorrencesView: NextPage = ({
  id,
  occurrence,
  occurrence_user,
}: any) => {
  const title = `Projeto Integrador - Ocorrência: ${occurrence.title}`;
  const description = `${occurrence.description}`;
  const url = `http://projeto-integrador-2-frontend.herokuapp.com/occurrences/view/${occurrence.id}`;

  const image = `http://projeto-integrador-2-frontend.herokuapp.com/static/ilustracao-share2.png`;

  const [category, setCategory] = useState<Category>();

  const isMounted = RenderCompleted();

  const MapView = useMemo(
    () =>
      dynamic(() => import('../../../src/components/MapView'), {
        loading: () => <p>Carregando!</p>,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    console.log('useEffect', occurrence);
    api
      .get('/occurrences-categories/')
      .then(({ data }) => {
        const category = data.find(
          (category: Category) => category.id === occurrence.category
        );
        if (category) {
          setCategory(category);
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <main className='container'>
      <Head>
        <title>Projeto Integrador II - Group 021</title>
        <meta property='fb:app_id' content='412202687483327' />
        <meta property='og:url' content={url} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />
        <meta property='og:image:width' content='608' />
        <meta property='og:image:height' content='375' />
        <meta property='og:image:alt' content='Ilustração de ouvidoria' />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@projetointegradorgrupo21' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={image} />
        <meta property='twitter:image:alt' content='Ilustração de ouvidoria' />
      </Head>

      <div className={`row ${styles.occurrence_container}`}>
        <div className={`col-12 col-lg-5 ${styles.occurrence_container_info}`}>
          <div className={`${styles.occurrence_container_info_titles}`}>
            <h3>Informações da ocorrência</h3>
            <h3>{occurrence.title}</h3>
            <p>{occurrence.description}</p>
          </div>

          <h3>Dados de localização da ocorrência</h3>
          <p>
            <strong>CEP: </strong>
            {occurrence.cep}
          </p>
          <p>
            <strong>Rua: </strong>
            {occurrence.street}
            {occurrence.numer ? `, ${occurrence.numer}` : null}{' '}
          </p>
          <p>
            <strong>Complemento: </strong>
            {occurrence.complement}
          </p>
          <p>
            <strong>Bairro: </strong>
            {occurrence.neighborhood}
          </p>
          <p>
            <strong>Ponto de referência: </strong>
            {occurrence.point}
          </p>
          <p>
            <strong>Cidade: </strong>
            {occurrence.city} <strong>UF: </strong>
            {occurrence.uf}
          </p>

          
        </div>
        <div
          className={`col-12 col-lg-7 ${styles.occurrence_container_actions}`}
        >
          <h4>
            <strong>Categoria:</strong> {category ? category.name : null}
          </h4>
          <p>
            Author:{' '}
            {occurrence.is_anonymous
              ? 'Anônima'
              : `${occurrence_user.first_name}(${occurrence_user.username})`}
          </p>

          <h4 className={`${styles.occurrence_container_image}`}>Imagem:</h4>
          {occurrence.image ? (
            <div className='view-images-container'>
              <img src={occurrence.image}></img>
            </div>
          ) : null}

          
        </div>
        <div className='col-12'>
        <div id='map-view'>
            {isMounted && <MapView occurrence={occurrence} />}
          </div>
        </div>
      </div>
      
    </main>
  );
};

export default OccorrencesView;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  var occurrence = {};
  var occurrenceUser = {};
  const { query } = ctx;
  const { id } = query;
  const apiClient = getAPIClient(ctx);

  await apiClient.get(`/occurrences/${id}/`).then(({ data }) => {
    occurrence = data;
  });

  await apiClient.get(`/occurrences-user/${id}/`).then(({ data }) => {
    occurrenceUser = data;
  });

  return {
    props: {
      id: id,
      occurrence: occurrence,
      occurrence_user: occurrenceUser,
    },
  };
};
