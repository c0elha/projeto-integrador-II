import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import { useAuth } from '../src/contexts/AuthContext';
import Image from 'next/image'
import { getAPIClient } from '../src/services/axios'
import { parseCookies, destroyCookie } from 'nookies'
import ImagemIlustracao from './../src/images/ilustracao-plana-de-suporte-ao-cliente1.png'
const Home: NextPage = () => {
  const { user } = useAuth();

  useEffect(() => {

  }, [])

  return (
    <main>
      <section className='section-description-project'>
        <div className='container section-description-project-content'>
          <div className='section-description-project-info'>
            <h1>Sistema web para registro de ocorrências pelos munícipes de Lins-SP</h1>
            <p>Um sistema web baseado na usabilidade das redes sociais, simples,
              transparente, com acessibilidade e dando visibilidade às demandas poderia estimular os
              munícipes a exercer a participação cidadã e o controle social, expandindo o contato entre os
              próprios munícipes e deles com o poder público.</p>
          </div>
          <div>
            <Image src={ImagemIlustracao} alt='teste' width={500} height={500}/>
          </div>
        </div>
      </section>
      <section className='section-description-about' id="about">
        <div className='container'>
          <h1>Sobre o projeto</h1>
          <p>As ouvidorias públicas são instrumentos de participação popular que possibilitam o atendimento
            dos interesses dos cidadãos, captando as demandas e facilitando a tomada de decisão dos
            gestores públicos. Entre os meios mais utilizados de comunicação entre o poder público e a
            população encontram-se telefones, sites, redes sociais e formulários próprios. Neste contexto, o
            objetivo deste trabalho é desenvolver uma plataforma web na qual os munícipes de Lins-SP
            possam compartilhar reclamações, sugestões e elogios relativos à gestão da cidade. </p><p>Mediante
            entrevistas presenciais e distribuição de questionário online, percebeu-se desconhecimento ou
            descontentamento da população em relação à ouvidoria pública, bem como baixa adesão ao
            sistema, sendo preterido pelo telefone e pelas redes sociais, tanto entre as pessoas que já
            registraram alguma manifestação quanto entre as que ainda não o fizeram. O engajamento nas
            redes sociais (29,16%) e o registro de manifestações via telefone da prefeitura (29,16%) seriam
            as principais escolhas das pessoas que nunca registraram reclamação, evidenciando-se que há
            demanda por uma nova forma de participação social frente a ouvidoria pública da prefeitura
            (16,6%). </p><p>Sendo assim, um sistema web baseado na usabilidade das redes sociais, simples,
            transparente, com acessibilidade e dando visibilidade às demandas poderia estimular os
            munícipes a exercer a participação cidadã e o controle social, expandindo o contato entre os
            próprios munícipes e deles com o poder público.</p>
        </div>
      </section>
      <section className='section-description-map' id="occurrences-map">
        <div className='container'>
          <h1>Acompanhar ocorrências</h1>
          <div className='description-map-content' style={{height: '400px'}}>
            <div>Mapa</div>
            <div className='description-map-info'>
              <p>Pequena descrição</p>
              <button className='btn btn-primary'>Regitrar uma ocorrência</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home