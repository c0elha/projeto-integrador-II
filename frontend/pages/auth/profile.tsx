import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../src/contexts/AuthContext';

const Profile: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  
  async function handleUpdateUser(data: any) {
    console.log('handleUpdateUser', data);
  }

  return (
    <main className='container'>
      {user ? (
        <form onSubmit={handleSubmit(handleUpdateUser)} className='form-mini'>
          <fieldset>
            <legend>Atualizar dados</legend>

            <div className='row'>
              <div className='col-12 col-md-6 form-group'>
                <label htmlFor="first_name" className="">Nome<span className='required-icon'>*</span></label>
                <input
                  {...register('first_name')}
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="first_name"
                  required
                  className="form-control"
                  placeholder="Nome"
                  value={user.first_name}
                />
              </div>

              <div className='col-12 col-md-6 form-group'>
                <label htmlFor="last_name" className="">Sobrenome</label>
                <input
                  {...register('last_name')}
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="last_name"
                  required
                  className="form-control"
                  placeholder="Sobrenome"
                  value={user.last_name}
                />
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor="username" className="">Usuário<span className='required-icon'>*</span></label>
              <input
                {...register('username')}
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="form-control"
                placeholder="Usuário"
                value={user.username}
              />
            </div>

            <button type='submit' className='btn btn-primary-outline w-100'>Salvar</button>
          </fieldset>
        </form>
      ) : null}
    </main>
  )
}

export default Profile
