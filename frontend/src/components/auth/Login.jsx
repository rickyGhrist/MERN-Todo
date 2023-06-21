import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import classes from './AuthForm.module.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/auth/login', {
        email,
        password,
      });
      navigate('/');
      toast.success('Login success');
    } catch (err) {
      console.log(err.response.data.message);
      toast.error('Login failed');
    }
  };

  return (
    <div className={classes.register}>
      <h1 className={classes.title}>
        Login
      </h1>
      <form className={classes.authForm} onSubmit={login}>
        <label htmlFor="email">
          Email
          <input type="email" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
