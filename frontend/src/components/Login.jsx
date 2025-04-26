import React, { useState } from 'react';
import {Input,Button,Logo} from './index.js';
import '../css/Signup.css';
import { useForm } from 'react-hook-form';
import {Link} from "react-router-dom"



const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Login Data:', data);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
      <span className="logo-container">
        <Link to={"/"}>  <Logo size={44} /></Link>
        </span>
        <h2 className="signup-title">Login to your account</h2>
     

        <p className="mt-2 text-center text-base text-black/60">
          Don't have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <div className="input-group">
          <Input
            label="Email"
            name="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            className="input-field"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div className="input-group">
          <Input
            label="Password"
            name="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            className="input-field"
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="signup-button">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
