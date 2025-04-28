import React, { useState } from 'react';
import { Input, Button, Select, Logo } from './index.js';
import '../css/Signup.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Signup = () => {

  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${String(import.meta.env.VITE_API_URL)}/signup`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        alert("Sign-up successful!");
        navigate('/login');
      } else {
        alert("Sign-up unsccessful!");
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <span className="logo-container">
          <Link to={"/"}> <Logo size={40} /></Link>
        </span>
        <h2 className="signup-title">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        <div className="input-group">
          <Input
            label="Name"
            name="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="input-field"
          />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>

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

        <div className="input-group">
          <Select
            label="Role"
            name="role"
            options={['instructor', 'student']}
            {...register('role', { required: 'Role is required' })}
            className="input-field"
          />
          {errors.role && <p className="error-text">{errors.role.message}</p>}
        </div>

        <Button type="submit" className="signup-button">
          Signup
        </Button>
      </form>
    </div>
  );
};

export default Signup;