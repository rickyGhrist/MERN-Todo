import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import classes from './AuthForm.module.scss';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
    };

    try {
      await axios.post('/api/auth/register', user);
      toast.success('Register Successful');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.log(err.response.data.message);
      toast.error('Register failed');
    }
  };

  return (
    <div className={classes.register}>
      <h1 className={classes.title}>
        Register
      </h1>
      <form className={classes.authForm} onSubmit={register}>
        <label htmlFor="name">
          Name
          <input type="name" name="name" placeholder="Full Name" onChange={(e) => setName(e.target.value)} value={name} required />
        </label>
        <label htmlFor="email">
          Email
          <input type="email" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
