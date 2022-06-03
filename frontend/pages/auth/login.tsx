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
    <>
      <form style={{maxWidth: '600px', margin: '0 auto', padding: '10px '}} onSubmit={handleSubmit(handleSignIn)}>
        <h1>Login</h1>
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

        <button type='submit'>Entrar</button>
      </form>
    </>
  )
}

export default Login
