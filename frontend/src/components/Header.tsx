import { parseCookies, destroyCookie } from 'nookies';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import ActiveLink from './ActiveLink';
import styles from './../../styles/Header.module.scss';

const Header = () => {
    const { user } = useAuth();

    async function handleLogout() {
        const { 'nextauth.token-refresh': refresh } = parseCookies()

        await api
            .post(`user/logout/`, { 'refresh_token': refresh }).then(({ data }) => {
                console.log('data', data);
                destroyCookie(null, 'nextauth.token');
                destroyCookie(null, 'nextauth.token-refresh');

                window.location.href = '/'
            })
            .catch(() => {

            })
    }

    return (
        <div className={styles.header_wrapper}>
            <div className={`container ${styles.header_wrapper_container}`}>
                <div className={styles.header_wrapper_presentation}>
                    <h1 className={styles.header_wrapper_presentation_title}>Grupo 21</h1>
                    {/* <h2 className={styles.header_wrapper_presentation_subtitle}>Sistema web para registro de ocorrências pelos munícipes de Lins-SP</h2> */}
                </div>

                <ul className={styles.header_wrapper_menu}>
                    <li className={styles.header_wrapper_menu_item}>
                        <ActiveLink href="/" activeClassName="active" >
                            <a className={styles.header_wrapper_menu_item_a}>Home</a>
                        </ActiveLink>
                    </li>
                    <li className={styles.header_wrapper_menu_item}>
                        <ActiveLink href="/#about" activeClassName="active" >
                            <a className={styles.header_wrapper_menu_item_a}>Sobre o projeto</a>
                        </ActiveLink>
                    </li>
                    <li className={styles.header_wrapper_menu_item}>
                        <ActiveLink href="/#occurrences-map" activeClassName="active">
                            <a className={styles.header_wrapper_menu_item_a}>Acompanhar ocorrências</a>
                        </ActiveLink>
                    </li>
                </ul>

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
        </div>
    )
}

export default Header