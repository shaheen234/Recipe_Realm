import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/my-recipes/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchMyRecipes();
  }, []);

  const handleDelete = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/delete-recipe/${recipeId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }
      setRecipes(recipes.filter(recipe => recipe.recipe_id !== recipeId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="my-recipes-page">
      <h2>My Recipes</h2>
      {error && <div className="error-msg">{error}</div>}
      <ul className="posts-grid">
        {recipes.map(recipe => (
          <li key={recipe.recipe_id} className="post-item">
            <img src={`http://localhost:8000${recipe.image}`} alt={recipe.title} />
            <h2 className="recipe-title">{recipe.title}</h2>
            <p className="recipe-desc">{recipe.description}</p>
            <div className="recipe-actions">
              <Link to={`/edit-recipe/${recipe.recipe_id}`} className="edit-btn">Edit</Link>
              <button onClick={() => handleDelete(recipe.recipe_id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;
