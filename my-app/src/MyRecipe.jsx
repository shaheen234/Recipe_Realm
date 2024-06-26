import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  //const navigate = useNavigate();

  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };
  
  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/myrecipe/', {
          method: 'GET',
          credentials: 'include', // Ensure credentials are included
          headers: {
            Authorization: `Bearer ${getCookie('jwt_access_token')}`, // Assuming you have a function to get the cookie value
          },
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
      const response = await fetch(`http://localhost:8000/api/delete_recipe/${recipeId}/`, {
        method: 'DELETE',
        credentials: 'include', // Ensure credentials are included\
        headers: {
          Authorization: `Bearer ${getCookie('jwt_access_token')}`, // Assuming you have a function to get the cookie value
        }
      });
      console.log(response)
      if (!response.status === 204) {
        throw new Error('Failed to delete recipe');
      }
      setRecipes(recipes.filter(recipe => recipe.recipe_id !== recipeId));
      // let data = await response.json()
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
