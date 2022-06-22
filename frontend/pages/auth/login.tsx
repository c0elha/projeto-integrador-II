import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { useAuth } from '../../src/contexts/AuthContext';

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, recoverUser } = useAuth();

  async function handleSignIn(data: any) {
    window.loadingUtils.show();
    await signIn(data)
      .then(() => {
        console.log('sign in success', data);
      })
      .catch((res) => {
        console.error('sign in error', res);
      })
      .finally(() => {
        window.loadingUtils.hide();
      })
  }

  return (
    <main className='container'>
      <form onSubmit={handleSubmit(handleSignIn)} className='form-mini'>
        <fieldset>
          <legend>Entrar</legend>

          <div className='form-group'>
            <label htmlFor='username' className=''>
              Usuário<span className='required-icon'>*</span>
            </label>
            <input
              {...register('username', {
                required: true,
                maxLength: 150,
                pattern: {
                  value: /^[a-zA-Z0-9_.-]*$/,
                  message:
                    'Entre com um username valido, apenas letras e números',
                },
              })}
              id='username'
              name='username'
              type='text'
              autoComplete='username'
              required
              className='form-control'
              placeholder='Usuário'
            />
            {errors.username?.message && (
              <div className='invalid-feedback'>{errors.username?.message}</div>
            )}
          </div>

          <div className='form-group'>
            <label htmlFor='password' className=''>
              Senha<span className='required-icon'>*</span>
            </label>
            <input
              {...register('password', {
                required: true,
                minLength: {
                  value: 8,
                  message: 'A senha deve ter pelo menos 8 caracteres',
                },
              })}
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              required
              className='form-control'
              placeholder='Informe sua senha'
            />
            {errors.password?.message && (
              <div className='invalid-feedback'>{errors.password?.message}</div>
            )}
          </div>
        </fieldset>

        <button type='submit' className='btn btn-primary-outline w-100'>
          Entrar
        </button>
      </form>
    </main>
  );
};

export default Login;
