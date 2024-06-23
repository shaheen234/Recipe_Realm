import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file

const AddRecipe = () => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null); // State to hold the uploaded image file
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('recipetype', category); // Assuming 'category' maps to 'recipetype'
    formData.append('description', ''); // You need to handle description separately if required
    formData.append('ingredients', ingredients);
    formData.append('title', title);
    formData.append('minutes_to_cook', cookingTime);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    try {
      let response = await fetch('http://localhost:8000/api/add-recipe/', requestOptions);
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        navigate('/home', { state: { message: 'Recipe added successfully! ✅' } });
      } else {
        let data = await response.json();
        setError(data.detail); // Assuming the server returns an error message in 'detail'
      }
    } catch (e) {
      console.error('Error adding recipe:', e);
      setError('Failed to add recipe. Please try again.'); // Generic error message for unexpected errors
    }
  };

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
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label>Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <small className='img-small'>Optional: Upload an image file</small>
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
};

export default AddRecipe;
