import React, { useState } from 'react';
import { authenticateUser } from '../auth';

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    if (authenticateUser(password)) {
      setAuthenticated(true);
    } else {
      alert('Authentication failed');
    }
  };

  return (
    <div>
      {authenticated ? (
        <p>Logged in successfully</p>
      ) : (
        <>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
};

export default LoginPage;