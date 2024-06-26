import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeType, setSelectedRecipeType] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/get_all_recipes/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecipes(data.recipe);
        console.log(data.recipe);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const filterRecipes = (recipeType) => {
    setSelectedRecipeType(recipeType);
    return recipes.filter(recipe => recipe.recipe_type === recipeType);
  };

  const saveRecipe = async (recipeId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/save_recipe/${recipeId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Recipe saved successfully');
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  return (
    <div className="home-banner">
      <h1>What recipe you want?</h1>
      <div className='par-coursel'>
        <div className='coursel'>
          <div className="bubble-cuisines" role="button" aria-label="Breakfast">
            <Link to="#" onClick={() => filterRecipes('Breakfast')} role="button" aria-label="Breakfast" >
              <img alt="" src="https://x.yummlystatic.com/web/bubble/cuisine/american.png" className="bubble-image" />
              <span className="bubble-text">Breakfast</span>
            </Link>
          </div>
          <div className="bubble-cuisines" role="button" aria-label="Meal">
            <Link to="#" onClick={() => filterRecipes('Meal')} role="button" aria-label="Meal">
              <img alt="" src="https://x.yummlystatic.com/web/bubble/cuisine/american.png" className="bubble-image" />
              <span className="bubble-text">Meal</span>
            </Link>
          </div>
          <div className="bubble-cuisines" role="button" aria-label="Dessert">
            <Link to="#" onClick={() => filterRecipes('Dessert')} role="button" aria-label="Dessert">
              <img alt="" src="https://x.yummlystatic.com/web/bubble/cuisine/american.png" className="bubble-image" />
              <span className="bubble-text">Dessert</span>
            </Link>
          </div>
        </div>
      </div>
      <ul className="posts-grid">
        {selectedRecipeType ? (
          recipes.map(recipe => (
            recipe.recipe_type === selectedRecipeType && (
              <li key={recipe.recipe_id} className="post-item">
                <Link to={`/post/${recipe.recipe_id}`}>
                  <img src={`http://127.0.0.1:8000${recipe.image}`} alt={recipe.title} />
                  <h2 className="recipe-title">{recipe.title}</h2>
                  <p className="recipe-desc">{recipe.description}</p>
                </Link>
                <button onClick={() => saveRecipe(recipe.recipe_id)}>Save Recipe</button>
              </li>
            )
          ))
        ) : (
          recipes.map(recipe => (
            <li key={recipe.recipe_id} className="post-item">
              <Link to={`/post/${recipe.recipe_id}`}>
                <img src={`http://127.0.0.1:8000${recipe.image}`} alt={recipe.title} />
                <h2 className="recipe-title">{recipe.title}</h2>
                <p className="recipe-desc">{recipe.description}</p>
              </Link>
              <button onClick={() => saveRecipe(recipe.recipe_id)}>Save Recipe</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default HomePage;
