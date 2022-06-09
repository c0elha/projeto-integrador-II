import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { useAuth } from '../../src/contexts/AuthContext';
import Image from 'next/image'

const Register: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const { register: registerUser, signIn } = useAuth();

  async function handleRegister(data: any) {
    // Register
    await registerUser(data)
      .then(async () => {
        // Sign In
        await signIn({ username: data.username, password: data.password })
          .then(() => {
            console.log('sign in success');
          })
          .catch(res => {
            console.error('sign in error', res);
          })
      })
      .catch(res => {
        console.error('register error', res);
      })
  }

  return (
    <main className='container'>
      <form onSubmit={handleSubmit(handleRegister)} className='form-mini'>
        <fieldset>
          <legend>Cadastrar-se</legend>

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
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-12 form-group'>
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

            <div className='col-12 form-group'>
              <label htmlFor="email" className="">E-mail<span className='required-icon'>*</span></label>
              <input
                {...register('email')}
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="form-control"
                placeholder="E-mail"
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-12 col-md-6 form-group'>
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

            <div className='col-12 col-md-6 form-group'>
              <label htmlFor="password_confirmation" className="">Confirmação de senha<span className='required-icon'>*</span></label>
              <input
                {...register('password_confirmation')}
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                autoComplete="current-password"
                required
                className="form-control"
                placeholder="Informe sua senha novamente"
              />
            </div>
          </div>
        </fieldset>

          <button type='submit' className='btn btn-primary-outline w-100'>Cadastrar</button>
      </form>
    </main>
  )
}

export default Register
