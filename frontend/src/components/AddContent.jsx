import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "../css/AddCourse.css";
const AddContent = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    navigate('/uploadvideo', { state: { formData: data } });

  };

  return (
    <div className="add-course-container">
      <form className="add-course-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="add-course-title">Add New Course</h2>

        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            className="form-input"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="form-error">{errors.title.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-textarea"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <p className="form-error">{errors.description.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            className="form-input"
            {...register('category', { required: 'Category is required' })}
          />
          {errors.category && <p className="form-error">{errors.category.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            className="form-input"
            {...register('price', { required: 'Price is required' })}
          />
          {errors.price && <p className="form-error">{errors.price.message}</p>}
        </div>

        <button type="submit" className="form-button">Next</button>
      </form>
    </div>
  );
};

export default AddContent;