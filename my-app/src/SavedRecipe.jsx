// SavedRecipes.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/get_saved_recipes/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSavedRecipes(data.recipes);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div className="saved-recipes">
      <h1>Saved Recipes</h1>
      <ul className="posts-grid">
        {savedRecipes.map(recipe => (
          <li key={recipe.recipe_id} className="post-item">
            <Link to={`/post/${recipe.recipe_id}`}>
              <img src={`http://127.0.0.1:8000${recipe.image}`} alt={recipe.title} />
              <h2 className="recipe-title">{recipe.title}</h2>
              <p className="recipe-desc">{recipe.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedRecipes;
