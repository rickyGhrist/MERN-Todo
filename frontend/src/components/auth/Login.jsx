import React from 'react';
import classes from './AuthForm.module.scss';

function Login() {
  return (
    <div className={classes.register}>
      <h1 className={classes.title}>
        Login
      </h1>
      <form className={classes.authForm}>
        <label htmlFor="email">
          Email
          <input type="email" name="email" placeholder="email" required />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" name="password" placeholder="password" required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
