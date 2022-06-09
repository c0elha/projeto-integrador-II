import Router from 'next/router'
import Link from 'next/link';
import { parseCookies, destroyCookie } from 'nookies';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import ActiveLink from './ActiveLink';

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
        <div className='header-wrapper'>
            <div className='container'>
                <div className='presentation-header-content'>
                    <h1 className='presentation-header-content--title'>Nome</h1>
                    <h2 className='presentation-header-content--subtitle'>Descrição</h2>
                </div>

                <ul className='menu-header-content'>
                    <li className='menu-header-content--item'>
                        <ActiveLink href="/" activeClassName="active" >
                            <a className="">Home</a>
                        </ActiveLink>
                    </li>
                    <li className='menu-header-content--item'>
                        <ActiveLink href="/#about" activeClassName="active" >
                            <a className="">Sobre o projeto</a>
                        </ActiveLink>
                    </li>
                    <li className='menu-header-content--item'>
                        <ActiveLink href="/#occurrences-map" activeClassName="active">
                            <a className="">Acompanhar ocorrências</a>
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