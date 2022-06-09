import type { GetServerSideProps, NextPage } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { api } from '../../src/services/api';
import { getAPIClient } from '../../src/services/axios';
import Link from 'next/link'

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
    <main className='container list-occurrences'>
      <h3>Lista de ocorrências</h3>
      <p>Acompanhe as ocorrências em que é responsável.</p>

      <div className='list-occurrences-content'>
        {occurrences.map((occurrence) => {
          return (
            <div className='list-occurrences-content-tem' key={occurrence.id}>
              <div>
              <h4>Titúlo: {occurrence.title}</h4>
              <p>Descrição: {occurrence.description}</p>
              <p>CEP: {occurrence.cep}</p>
            </div>
                <div>
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
    </main>
  );
};

export default OccorrencesIndex;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const apiClient = getAPIClient(ctx);
//   const { ['nextauth.token']: token } = parseCookies(ctx);

//   if (!token) {
//     return {
//       redirect: {
//         destination: '/auth/login',
//         permanent: false,
//       },
//     };
//   }

//   await apiClient
//     .get(`user/me/`)
//     .then(({ data }) => {
//       window.location.href = '/occurrences/list';
//     })
//     .catch(() => {
//       destroyCookie(null, 'nextauth.token');
//       window.location.href = '/auth/login';
//     });

//   return {
//     props: {},
//   };
// };
