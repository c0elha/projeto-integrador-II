import { parseCookies, destroyCookie } from 'nookies';
import { useAuth } from '../contexts/AuthContext';
import ActiveLink from './ActiveLink';
import styles from './../../styles/Header.module.scss';
import { getAPIClient } from '../services/axios';
import axios from 'axios';

const Header = () => {
    const { user } = useAuth();

    async function handleLogout() {
        const { 'nextauth.token-refresh': refresh } = parseCookies()
        const { 'nextauth.token': token } = parseCookies();

        window.loadingUtils.show();

        const api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_URL_API,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        await api
            .post(`user/logout/`, { 'refresh_token': refresh }).then(({ data }) => {
                console.log('data', data);
                destroyCookie(null, 'nextauth.token');
                destroyCookie(null, 'nextauth.token-refresh');

                window.location.href = '/'
            })
            .catch(() => { })
            .finally(() => window.loadingUtils.hide());
    }

    return (
        <header className={styles.header_wrapper} id="ir">
            <div role="container-accessibility" className={`container ${styles.header_wrapper_container} ${styles.header_wrapper_container_accesskeys}`}>
                <ul role="menu-accessibility">
                    <li>
                        <a accessKey='1' href="#irconteudo" aria-label="ir para o conteúdo">Ir para o conteúdo <span className="keysNum">[1]</span></a>
                    </li>
                    <li>
                        <a accessKey='2' href="#irmenu" aria-label="ir para o menu">Ir para o menu <span className="keysNum">[2]</span></a>
                    </li>
                    <li>
                        <a accessKey='3' href="#irrodape" aria-label="ir para o rodapé">Ir para o rodapé <span className="keysNum">[3]</span></a>
                    </li>
                </ul>
            </div>
            <div role="container-navigation" className={`container ${styles.header_wrapper_container}`}>
                <div className={styles.header_wrapper_presentation}>
                    <h1 className={styles.header_wrapper_presentation_title}>Grupo 21</h1>
                    {/* <h2 className={styles.header_wrapper_presentation_subtitle}>Sistema web para registro de ocorrências pelos munícipes de Lins-SP</h2> */}
                </div>

                <nav id="irmenu" role="navigation">
                    <ul className={styles.header_wrapper_menu} role="menu">
                        <li className={styles.header_wrapper_menu_item} role="menuitem">
                            <ActiveLink href="/" activeClassName="active">
                                <a className={styles.header_wrapper_menu_item_a}>Home</a>
                            </ActiveLink>
                        </li>
                        <li className={styles.header_wrapper_menu_item} role="menuitem">
                            <ActiveLink href="/#sobre" activeClassName="active">
                                <a className={styles.header_wrapper_menu_item_a}>Sobre o projeto</a>
                            </ActiveLink>
                        </li>
                        <li className={styles.header_wrapper_menu_item} role="menuitem">
                            <ActiveLink href="/#ocorrencias-lista" activeClassName="active">
                                <a className={styles.header_wrapper_menu_item_a}>Acompanhar ocorrências</a>
                            </ActiveLink>
                        </li>
                    </ul>
                </nav>

                <div className='user-header-content'>

                    {user ? (
                        <div className='header-menu-actions'>
                            <ActiveLink href="/auth/profile" activeClassName="active">
                                <a className=""><strong>Olá,</strong> {user.username}!</a>
                            </ActiveLink>
                            <ActiveLink href="/occurrences/list" activeClassName="active">
                                <a className="">Minhas Ocorrências</a>
                            </ActiveLink>
                            <button onClick={handleLogout} className='btn btn-white-outline'>Sair</button>
                        </div>
                    ) : (
                        <div className='header-menu-actions'>
                            <ActiveLink href="/auth/register" activeClassName="active" >
                                <a className="btn">Cadastrar-se</a>
                            </ActiveLink>
                            <ActiveLink href="/auth/login" activeClassName="active" >
                                <a className="btn btn-white-outline">Entrar</a>
                            </ActiveLink>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header