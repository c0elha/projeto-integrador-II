import type { NextPage } from 'next';
import { useState } from 'react';
const Teste: NextPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  return (
    <div>
        {username}
      <form>
        <div>
          <label htmlFor="username-input">Username: </label>
          <input type="text" name="username" id="username-input" onChange={(e) => setUsername(e.target.value)}/>
        </div>

        <div>
          <label htmlFor="password-input">Password: </label>
          <input type="password" name="password" id="password-input" onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <button type="submit" id="login-button">Send</button>
      </form>
      </div>
  );
};

export default Teste;
