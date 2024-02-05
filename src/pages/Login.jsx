// Login.js
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import './styles.css';
import { Typography } from '@mui/material';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className='container'>
      <Typography
        sx={{ fontFamily: 'Raleway', fontWeight: 500 }}
        className='heading'
        variant='h5'
        display='block'
        gutterBottom
      >
        Login
      </Typography>{' '}
      <form className='form' onSubmit={handleSubmit}>
        <label className='label'>
          <span className='labelText'>Email:</span>
          <input
            className='input'
            required
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label className='label'>
          <span className='labelText'>Password:</span>
          <input
            className='input'
            required
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button className='button'>Log In</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
}
