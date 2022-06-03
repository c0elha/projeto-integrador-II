import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../src/contexts/AuthContext';

const ChangePassword: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const {  } = useAuth();

  async function handleChangePassword(data: any) {
    console.log('handleChangePassword', data);
  }
  
  return (
    <>
      <form style={{maxWidth: '600px', margin: '0 auto', padding: '10px '}} onSubmit={handleSubmit(handleChangePassword)}>
        <h1>ChangePassword</h1>

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
            required
            className=""
            placeholder="Password _confirmation"
          />
        </div>

        <button type='submit'>Change password</button>
      </form>
    </>
  )
}

export default ChangePassword
