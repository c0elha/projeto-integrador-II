import type { NextPage } from 'next';
import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import ImagemIlustracao from './../src/images/ilustracao-plana-de-suporte-ao-cliente1.png';
import RenderCompleted from '../src/components/RenderCompleted';
import { FiPlus } from "react-icons/fi";
import styles from './../styles/pages/index.module.scss';
import { api } from '../src/services/api';
import Link from 'next/link';

interface Occurrence {
  id: number;
  title: string;
  description: string;
}

const Home: NextPage = () => {
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

  const isMounted = RenderCompleted();
  const MapIndex = useMemo(
    () =>
      dynamic(() => import('./../src/components/MapIndex'), {
        loading: () => <p>Loading map...</p>,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    api
    .get('/occurrences-all-list/NOT_COMPLETED/')
    .then(({ data }) => {
      setOccurrences(data);
    })
    .catch((error) => { });
  }, []);

  return (
    <main>
      <section className={styles.section_presentation}>
        <div className={`container ${styles.section_presentation_content}`}>
          <div className={styles.section_presentation_content_info}>
            <h1>
              Sistema web para registro de ocorrências pelos munícipes de
              Lins-SP
            </h1>
            <p>
              Um sistema web baseado na usabilidade das redes sociais, simples,
              transparente, com acessibilidade e dando visibilidade às demandas
              poderia estimular os munícipes a exercer a participação cidadã e o
              controle social, expandindo o contato entre os próprios munícipes
              e deles com o poder público.
            </p>
          </div>
          <div className={styles.section_presentation_content_image}>
            <Image
              src={ImagemIlustracao}
              alt='teste'
            />
          </div>
        </div>
      </section>
      <section className={styles.section_about} id="about">
        <div className={`container`}>
          <h1>Sobre o projeto</h1>
          <p>
            As ouvidorias públicas são instrumentos de participação popular que
            possibilitam o atendimento dos interesses dos cidadãos, captando as
            demandas e facilitando a tomada de decisão dos gestores públicos.
            Entre os meios mais utilizados de comunicação entre o poder público
            e a população encontram-se telefones, sites, redes sociais e
            formulários próprios. Neste contexto, o objetivo deste trabalho é
            desenvolver uma plataforma web na qual os munícipes de Lins-SP
            possam compartilhar reclamações, sugestões e elogios relativos à
            gestão da cidade.
          </p>
          <p>
            Mediante entrevistas presenciais e distribuição de questionário
            online, percebeu-se desconhecimento ou descontentamento da população
            em relação à ouvidoria pública, bem como baixa adesão ao sistema,
            sendo preterido pelo telefone e pelas redes sociais, tanto entre as
            pessoas que já registraram alguma manifestação quanto entre as que
            ainda não o fizeram. O engajamento nas redes sociais (29,16%) e o
            registro de manifestações via telefone da prefeitura (29,16%) seriam
            as principais escolhas das pessoas que nunca registraram reclamação,
            evidenciando-se que há demanda por uma nova forma de participação
            social frente a ouvidoria pública da prefeitura (16,6%).{' '}
          </p>
          <p>
            Sendo assim, um sistema web baseado na usabilidade das redes
            sociais, simples, transparente, com acessibilidade e dando
            visibilidade às demandas poderia estimular os munícipes a exercer a
            participação cidadã e o controle social, expandindo o contato entre
            os próprios munícipes e deles com o poder público.
          </p>
        </div>
      </section>

      <section className={styles.section_map} id="occurrences-map">
        <div className='container'>
          <h1>Acompanhar ocorrências</h1>
          <p>Descrição</p>
          <div className='row'>
            <div className='col-12 col-lg-8'>
              <div id='project-app'>
                {isMounted && <MapIndex occurrences={occurrences}/>}
              </div>
            </div>
            <div className='col-12 col-lg-4'>
              <p>Pequena descrição</p>
              <Link href="/occurrences/create">
                <a className='btn btn-primary'>
                  Criar ocorrência
                  <FiPlus size={20} color="#fff" />
                  </a>
              </Link>
              <Link href="/occurrences/all">
                <a className='btn btn-primary-outline' style={{marginTop: '10px'}}>
                  Ver melhor todas ocorrências
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
