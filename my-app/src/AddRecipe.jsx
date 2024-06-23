import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file

const AddRecipe = () => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ category, title, image, ingredients, instructions, cookingTime });
    navigate('/home'); // Redirect to home after submission
  }

  return (
    <div className="add-recipe-container">
      <h2>Add Recipe</h2>
      <form className='form-conatiner' onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            <option value="meal">Meal</option>
            <option value="breakfast">Breakfast</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        <div>
          <label>Ingredients:</label>
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        </div>
        <div>
          <label>Minutes of Cooking:</label>
          <input type="number" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddRecipe;
