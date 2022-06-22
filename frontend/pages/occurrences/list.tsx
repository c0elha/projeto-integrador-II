import type { GetServerSideProps, NextPage } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { getAPIClient } from '../../src/services/axios';
import Link from 'next/link';

import styles from './../../styles/pages/OccurrencesList.module.scss';

interface Occurrences {
  id: number;
}

const OccorrencesIndex: NextPage = ({ occurrences }: any) => {
  return (
    <main className='container list-occurrences'>
      <div className={styles.list_container}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h3>Lista de ocorrências</h3>
            <p>Acompanhe as ocorrências em que é responsável.</p>
          </div>
          <Link href={`/occurrences/create`}>
            <a className='btn btn-primary'>Criar Ocorrência</a>
          </Link>
        </div>

        <div className={styles.list_wrapper}>
          {occurrences.length === 0 ? (
            <p style={{ textAlign: 'center' }}>
              Ainda não possui nenhuma ocorrência cadastrada!
            </p>
          ) : null}
          {occurrences.map((occurrence: any) => {
            return (
              <div className={styles.list_wrapper_item} key={occurrence.id}>
                <div>
                  <h4>Titúlo: {occurrence.title}</h4>
                  <p>Descrição: {occurrence.description}</p>
                  <p>CEP: {occurrence.cep}</p>
                </div>
                <div className={styles.list_wrapper_item_links}>
                  <Link href={`/occurrences/edit/${occurrence.id}`}>
                    <a className=''>Editar</a>
                  </Link>

                  <Link href={`/occurrences/view/${occurrence.id}`}>
                    <a className=''>Visualizar</a>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default OccorrencesIndex;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  var user = false;
  var occurrences = [] as any;
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
    await apiClient
      .get('/occurrences-list/')
      .then(({ data }) => {
        occurrences = data;
      })
      .catch((error) => {});

    return {
      props: {
        occurrences: occurrences,
      },
    };
  }

  return {
    redirect: {
      destination: redirectUrl,
      permanent: false,
    },
  };
};
