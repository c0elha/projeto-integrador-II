import type { NextPage} from 'next';

const Header : NextPage = () => {
    return (
        <div className='header-wrapper'>
            <div className='container'>
            <div className='presentation-header-content'>
                um icone ou algo?
                <h1 className='presentation-header-content--title'>Nome do projeto</h1>
                <h2 className='presentation-header-content--subtitle'>Descrição curta do projeto</h2>
            </div>

            <ul className='menu-header-content'>
                <li className='menu-header-content--item'>Home</li>
                <li className='menu-header-content--item'>Ocorrências</li>
            </ul>

            <div className='user-header-content'>
                {/* If logado */}
                Olá, Geovana Coelho (Editar perfil)
            </div>
            </div>
        </div>
    )
}

export default Header