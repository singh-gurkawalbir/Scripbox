// Signup.js
import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignUp';
import './styles.css';
import { Typography } from '@mui/material';
export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password);
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
        Sign Up
      </Typography>
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
        <button className='button'>Sign Up</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
}
