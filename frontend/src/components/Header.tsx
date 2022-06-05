import Router from 'next/router'
import Link from 'next/link';
import { parseCookies, destroyCookie } from 'nookies';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

const Header = () => {
    const { user } = useAuth();

    async function handleLogout() {
        const { 'nextauth.token-refresh': refresh } = parseCookies()
    
        await api
            .post(`user/logout/`, {'refresh_token' : refresh }).then(({ data }) => {
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
                    um icone ou algo?
                    <h1 className='presentation-header-content--title'>Nome do projeto</h1>
                    <h2 className='presentation-header-content--subtitle'>Descrição curta do projeto</h2>
                </div>

                <ul className='menu-header-content'>
                    <li className='menu-header-content--item'>
                        <Link href="/">Home</Link>
                    </li>
                    <li className='menu-header-content--item'>
                        <Link href="/occurrences/map">Acompanhar ocorrências</Link>
                    </li>
                    {user ? (
                        <li className='menu-header-content--item'>
                            <Link href="/occurrences/list">Minhas Ocorrências</Link>
                        </li>
                    ) : null}
                </ul>

                <div className='user-header-content'>
                    {user ? (
                        <div className='header-menu-actions'>
                            <span>Olá, {user.username}</span>
                            <button onClick={handleLogout}>Sair</button>
                        </div>
                    ) : (
                        <div className='header-menu-actions'>
                            <Link href="/auth/register">Cadastrar-se</Link>
                            <Link href="/auth/login">Entrar</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header