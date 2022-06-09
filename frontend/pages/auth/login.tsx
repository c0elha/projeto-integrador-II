import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { useAuth } from '../../src/contexts/AuthContext';

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const { signIn, recoverUser } = useAuth();

  async function handleSignIn(data: any) {

    await signIn(data)
      .then(() => {
        console.log('sign in success');
      })
      .catch(res => {
        console.error('sign in error', res);
      })
  }

  return (
    <main className='container'>
      <form onSubmit={handleSubmit(handleSignIn)} className='form-mini'>
        <fieldset>
          <legend>Entrar</legend>

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
            />
          </div>

          <div className='form-group'>
            <label htmlFor="password" className="">Senha<span className='required-icon'>*</span></label>
            <input
              {...register('password')}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="form-control"
              placeholder="Informe sua senha"
            />
          </div>

        </fieldset>

        <button type='submit' className='btn btn-primary-outline w-100'>Entrar</button>
      </form>
    </main>
  )
}

export default Login
