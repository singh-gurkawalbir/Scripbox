import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import './styles/Navbar.css';
export default function Navbar() {
  const { logout } = useLogout();

  return (
    <nav className='navigation'>
      <h1>HackIdeas</h1>
      <ul>
        <li className='list-active underLine'>
          <Link to='/'>Home</Link>
        </li>
        <li className='list-active underLine'>
          <Link to='/login'>Login</Link>
        </li>
        <li className='list-active underLine'>
          <Link to='/signup'>Signup</Link>
        </li>
        <li className='list-active underLine' onClick={logout}>
          Logout
        </li>
      </ul>
    </nav>
  );
}
