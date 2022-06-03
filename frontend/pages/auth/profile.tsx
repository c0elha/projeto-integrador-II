import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../src/contexts/AuthContext';

const Profile: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const { } = useAuth();

  async function handleUpdateUser(data: any) {
    console.log('handleUpdateUser', data);
  }
  
  return (
    <>
      <form style={{maxWidth: '600px', margin: '0 auto', padding: '10px '}} onSubmit={handleSubmit(handleUpdateUser)}>
        <h1>Atualizar dados</h1>

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

        <button type='submit'>Salvar</button>
      </form>
    </>
  )
}

export default Profile
