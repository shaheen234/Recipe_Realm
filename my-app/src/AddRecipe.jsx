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
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      category,
      title,
      image,
      ingredients,
      instructions,
      cookingTime
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    };

    try {
      let response = await fetch('http://localhost:8000/api/add-recipe/', requestOptions);
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        navigate('/home', { state: { message: 'Recipe added successfully! ✅' } });
      } else {
        let data = await response.json();
        setError(data.detail);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="add-recipe-page">
      <div className="add-recipe-container">
        <h2>Add Recipe</h2>
        {error && <div className="error-msg">{error}</div>}
        <form className='form-container' onSubmit={handleSubmit}>
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
    </div>
  );
}

export default AddRecipe;
