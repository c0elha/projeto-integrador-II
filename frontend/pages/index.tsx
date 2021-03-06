import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import ImagemIlustracao from './../src/images/ilustracao-plana-de-suporte-ao-cliente.png';
import RenderCompleted from '../src/components/RenderCompleted';
import { FiPlus } from 'react-icons/fi';
import styles from './../styles/pages/index.module.scss';
import { api } from '../src/services/api';
import Link from 'next/link';
import { getAPIClient } from '../src/services/axios';
import { getCategories } from '../src/services/category';

interface Occurrence {
  id: number;
  title: string;
  description: string;
}
interface Category {
  id: number;
  name: string;
  description: string;
  color: string;
}

const Home: NextPage = ({occurrences} : any) => {
   const [categories, setCategories] = useState<Category[]>([]);

  const colorHexColor = {
    green: '#28bf58',
    yellow: '#fad506',
    orange: '#ff9a00',
    red: '#ff4e36',
    purple: '#d173dd',
    blue: '#007bbf',
    black: '#000000',
  } as any;

  function getColorByCategory(category_id: number) {
    var category = categories.find(
      (category: any) => category.id === category_id
    );

    if (category) {
      if (category.color && typeof colorHexColor[category.color]) {
        return colorHexColor[category.color];
      }
    }
    return colorHexColor['black'];
  }

  const isMounted = RenderCompleted();
  const MapIndex = useMemo(
    () =>
      dynamic(() => import('./../src/components/MapIndex'), {
        loading: () => <p style={{textAlign: 'center'}}>Carregando...</p>,
        ssr: false,
      }),
    []
  );
  useEffect(() => {
    getCategories()
      .then(({ data } : any) => {
        setCategories(data.sort( (a : any, b:any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
      })
  }, []);

  return (
    <main id='irconteudo'>
      <section className={styles.section_presentation} role='banner'>
        <div className={`container ${styles.section_presentation_content}`}>
          <div className={styles.section_presentation_content_info}>
            <h2>
              Sistema web para registro de ocorr??ncias pelos mun??cipes de
              Lins-SP
            </h2>
            <p>
              Um sistema web baseado na usabilidade das redes sociais, simples,
              transparente, com acessibilidade e dando visibilidade ??s demandas
              poderia estimular os mun??cipes a exercer a participa????o cidad?? e o
              controle social, expandindo o contato entre os pr??prios mun??cipes
              e deles com o poder p??blico.
            </p>
          </div>
          <div className={styles.section_presentation_content_image}>
            <Image src={ImagemIlustracao} alt='Ilustra????o de uma menina mexendo no notebook com fone de ouvido e microfone' />
          </div>
        </div>
      </section>
      <section className={styles.section_about} id='sobre'>
        <div className={`container`}>
          <h2>Sobre o projeto</h2>
          <p>
            As ouvidorias p??blicas s??o instrumentos de participa????o popular que
            possibilitam o atendimento dos interesses dos cidad??os, captando as
            demandas e facilitando a tomada de decis??o dos gestores p??blicos.
            Entre os meios mais utilizados de comunica????o entre o poder p??blico
            e a popula????o encontram-se telefones, sites, redes sociais e
            formul??rios pr??prios. Neste contexto, o objetivo deste trabalho ??
            desenvolver uma plataforma web na qual os mun??cipes de Lins-SP
            possam compartilhar reclama????es, sugest??es e elogios relativos ??
            gest??o da cidade.
          </p>
          <p>
            Mediante entrevistas presenciais e distribui????o de question??rio
            online, percebeu-se desconhecimento ou descontentamento da popula????o
            em rela????o ?? ouvidoria p??blica, bem como baixa ades??o ao sistema,
            sendo preterido pelo telefone e pelas redes sociais, tanto entre as
            pessoas que j?? registraram alguma manifesta????o quanto entre as que
            ainda n??o o fizeram. O engajamento nas redes sociais (29,16%) e o
            registro de manifesta????es via telefone da prefeitura (29,16%) seriam
            as principais escolhas das pessoas que nunca registraram reclama????o,
            evidenciando-se que h?? demanda por uma nova forma de participa????o
            social frente a ouvidoria p??blica da prefeitura (16,6%).{' '}
          </p>
          <p>
            Sendo assim, um sistema web baseado na usabilidade das redes
            sociais, simples, transparente, com acessibilidade e dando
            visibilidade ??s demandas poderia estimular os mun??cipes a exercer a
            participa????o cidad?? e o controle social, expandindo o contato entre
            os pr??prios mun??cipes e deles com o poder p??blico.
          </p>
        </div>
      </section>

      <section className={styles.section_map} id='ocorrencias-lista'>
        <div className='container'>
          <h2>Acompanhar ocorr??ncias</h2>
          <p>
            Clica no ponto desejado para ter mais informa????es e compartilhar nas
            redes sociais.
          </p>
          <div className='row'>
            <div className='col-12 col-lg-8'>
              <div id='project-app'>
                {isMounted && (
                  <MapIndex occurrences={occurrences} categories={categories} />
                )}
              </div>
              <h3 style={{ marginTop: '20px'}}>Legendas</h3>
              <div className='row'>
                {categories.map((category, i) => {
                  return (
                    <div className='col-12 col-lg-6 box-content-legend-category-map' key={i}>
                      <div
                        className={`box-legend-category-map box-legend-color-${category.color}`}
                      ></div>
                      <span>{category.name}</span>
                    </div>
                  );
                })}
                <div className='col-6 col-lg-3'></div>
              </div>
            </div>
            <div
              className='col-12 col-lg-4'
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <p>
                Crie sua ocorr??ncia de forma simples e r??pida assim podemos
                mapear e agrupar os problemas da cidade e solicitar melhorias de
                forma assertiva.
              </p>
              <Link href='/occurrences/create'>
                <a className='btn btn-primary'>
                  Criar ocorr??ncia
                  <FiPlus size={20} color='#fff' />
                </a>
              </Link>
              <Link href='/occurrences/all'>
                <a
                  className='btn btn-primary-outline'
                  style={{ marginTop: '10px' }}
                >
                  Ver melhor todas ocorr??ncias
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

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

