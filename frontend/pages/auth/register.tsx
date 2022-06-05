import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { useAuth } from '../../src/contexts/AuthContext';

const Register: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const { register : registerUser, signIn } = useAuth();

  async function handleRegister(data: any) {
    // Register
    await registerUser(data)
      .then(async () => {
        // Sign In
        await signIn({ username: data.username, password: data.password})
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
    <>
      <form style={{maxWidth: '600px', margin: '0 auto', padding: '10px '}} onSubmit={handleSubmit(handleRegister)}>
        <h1>Register</h1>

        <div>
          <label htmlFor="first_name" className="">Firt name</label>
          <input
            {...register('first_name')}
            id="first_name"
            name="first_name"
            type="text"
            autoComplete="first_name"
            required
            className=""
            placeholder="first_name"
          />
        </div>

        <div>
          <label htmlFor="last_name" className="">Last name</label>
          <input
            {...register('last_name')}
            id="last_name"
            name="last_name"
            type="text"
            autoComplete="last_name"
            required
            className=""
            placeholder="last_name"
          />
        </div>

        <div>
          <label htmlFor="username" className="">Username</label>
          <input
            {...register('username')}
            id="username"
            name="username"
            type="username"
            autoComplete="username"
            required
            className=""
            placeholder="Username"
          />
        </div>

        <div>
          <label htmlFor="email" className="">E-mail</label>
          <input
            {...register('email')}
            id="email"
            name="email"
            type="text"
            autoComplete="email"
            required
            className=""
            placeholder="email"
          />
        </div>

        <div>
          <label htmlFor="password" className="">Password</label>
          <input
            {...register('password')}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className=""
            placeholder="Password"
          />
        </div>

        <div>
          <label htmlFor="password_confirmation" className="">Password confirmation</label>
          <input
            {...register('password_confirmation')}
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            autoComplete="current-password"
            required
            className=""
            placeholder="Password confirmation"
          />
        </div>

        <button type='submit'>Cadastrar</button>
      </form>
    </>
  )
}

export default Register
