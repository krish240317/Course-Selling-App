import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/AddCourse.css"
const AddContent = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        alert('No access token found. Please log in.');
        return;
      }
      const response = await axios.post(`${String(import.meta.env.VITE_API_URL)}/addcourse`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        
        alert('Course added successfully!');
        navigate('/uploadvideo');
      } else {
        alert('Failed to add course!');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Add New Course</h2>

        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            {...register('category', { required: 'Category is required' })}
          />
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            {...register('price', { required: 'Price is required' })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>

        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddContent;