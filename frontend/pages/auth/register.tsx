import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useContext, useRef } from 'react';
import { useAuth } from '../../src/contexts/AuthContext';
import Image from 'next/image';

const Register: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { register: registerUser, signIn } = useAuth();
  const password = useRef({});
  password.current = watch('password', '');

  async function handleRegister(data: any) {
    // Register
    await registerUser(data)
      .then(async () => {
        // Sign In
        await signIn({ username: data.username, password: data.password })
          .then(() => {
            console.log('sign in success');
          })
          .catch((res) => {
            console.error('sign in error', res);
          });
      })
      .catch((res) => {
        console.error('register error', res);
      });
  }

  return (
    <main className='container'>
      <form onSubmit={handleSubmit(handleRegister)} className='form-mini'>
        <fieldset>
          <legend>Cadastrar-se</legend>

          <div className='row'>
            <div className='col-12 col-md-6 form-group'>
              <label htmlFor='first_name' className=''>
                Nome<span className='required-icon'>*</span>
              </label>
              <input
                {...register('first_name', { required: true, maxLength: 150 })}
                id='first_name'
                name='first_name'
                type='text'
                required
                autoComplete='first_name'
                className='form-control'
                placeholder='Primeiro nome'
                aria-invalid={errors.first_name ? 'true' : 'false'}
              />
              {errors.first_name && errors.first_name.type === 'required' && (
                <div className='invalid-feedback'>Campo obrigatório</div>
              )}
              {errors.first_name && errors.first_name.type === 'maxLength' && (
                <div className='invalid-feedback'>
                  Comprimento máximo excedido
                </div>
              )}
            </div>

            <div className='col-12 col-md-6 form-group'>
              <label htmlFor='last_name' className=''>
                Sobrenome
              </label>
              <input
                {...register('last_name', { required: false, maxLength: 150 })}
                id='last_name'
                name='last_name'
                type='text'
                autoComplete='last_name'
                className='form-control'
                placeholder='Sobrenome'
              />
            </div>
            {errors.last_name?.message && (
              <div className='invalid-feedback'>
                {errors.last_name?.message}
              </div>
            )}
          </div>

          <div className='row'>
            <div className='col-12 form-group'>
              <label htmlFor='username' className=''>
                Usuário<span className='required-icon'>*</span>
              </label>
              <input
                {...register('username', { 
                  required: true, 
                  maxLength: 150,
                  pattern: {
                    value:
                      /^[a-zA-Z0-9_.-]*$/,
                    message: 'Entre com um username valido, apenas letras e números',
                  }
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
                <div className='invalid-feedback'>
                  {errors.username?.message}
                </div>
              )}
            </div>

            <div className='col-12 form-group'>
              <label htmlFor='email' className=''>
                E-mail<span className='required-icon'>*</span>
              </label>
              <input
                {...register('email', {
                  required: true,
                  maxLength: 255,
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Entre com um e-mail valido',
                  },
                })}
                id='email'
                name='email'
                type='email'
                required
                autoComplete='email'
                className='form-control'
                placeholder='E-mail'
              />
              {errors.email && errors.email.type === 'required' && (
                <div className='invalid-feedback'>Campo obrigatório</div>
              )}
              {errors.email?.message && (
                <div className='invalid-feedback'>{errors.email?.message}</div>
              )}
            </div>
          </div>

          <div className='row'>
            <div className='col-12 col-md-6 form-group'>
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
                <div className='invalid-feedback'>
                  {errors.password?.message}
                </div>
              )}
            </div>

            <div className='col-12 col-md-6 form-group'>
              <label htmlFor='password_confirmation' className=''>
                Confirmação de senha<span className='required-icon'>*</span>
              </label>
              <input
                {...register('password_confirmation', {
                  required: true,
                  validate: (value) =>
                    value === password.current || 'As senhas não combinam',
                })}
                id='password_confirmation'
                name='password_confirmation'
                type='password'
                autoComplete='current-password'
                required
                className='form-control'
                placeholder='Informe sua senha novamente'
              />

              {errors.password_confirmation?.message && (
                <div className='invalid-feedback'>
                  {errors.password_confirmation?.message}
                </div>
              )}
            </div>
          </div>
        </fieldset>

        <button type='submit' className='btn btn-primary-outline w-100'>
          Cadastrar
        </button>
      </form>
    </main>
  );
};

export default Register;
