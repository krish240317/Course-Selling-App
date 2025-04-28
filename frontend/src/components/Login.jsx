import React, { useState } from 'react';
import { Input, Button, Logo } from './index.js';
import '../css/Signup.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login as authlogin } from '../store/authSlice.js';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${String(import.meta.env.VITE_API_URL)}/login`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      if (response.data.success) {
        dispatch(authlogin(response.data));
        const accessToken = response.data.data.accessToken;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken); // Store access token in localStorage
          localStorage.setItem("role", response.data.data.user.role); // Store role
          localStorage.setItem("email", response.data.data.user.email);
          alert("Login successful!");
          navigate('/dashboard');
        } else {
          alert("Token not received. Please try again.");
        }
      } else {
        alert("Login unsuccessful!");
      }
    } catch (error) {
      console.log("Unable to connect to the server. Please check your internet connection.");
    }
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
        </div>

        <Button type="submit" className="signup-button">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;