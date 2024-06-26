import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditRecipeModal from './modals/EditRecipeModal'// Assuming you create EditRecipeModal component

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };
  
  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/myrecipe/', {
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${getCookie('jwt_access_token')}`,
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
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${getCookie('jwt_access_token')}`,
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

  const openEditModal = (recipeId) => {
    const recipeToEdit = recipes.find(recipe => recipe.recipe_id === recipeId);
    setEditingRecipe(recipeToEdit);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setEditingRecipe(null);
    setShowModal(false);
  };

  const handleUpdate = async (updatedRecipe) => {
    
    try {
      const response = await fetch(`http://localhost:8000/api/edit_recipe/${updatedRecipe.recipe_id}/`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('jwt_access_token')}`,
        },
        body: JSON.stringify(updatedRecipe),
      });
      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }
      const updatedRecipes = recipes.map(recipe =>
        recipe.recipe_id === updatedRecipe.recipe_id ? updatedRecipe : recipe
      );
      setRecipes(updatedRecipes);
      closeEditModal();
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
            <p className="recipe-desc">{recipe.description.slice(0,100)}...</p>
            <div className="recipe-actions">
              <button onClick={() => openEditModal(recipe.recipe_id)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(recipe.recipe_id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <EditRecipeModal
          recipe={editingRecipe}
          onUpdate={handleUpdate}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default MyRecipes;
