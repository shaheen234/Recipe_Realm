import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Import the CSS file

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeType, setSelectedRecipeType] = useState(null); // State to keep track of selected recipe type

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
        // Handle error, show a message, etc.
      }
    };

    fetchRecipes();
  }, []);

  // Function to filter recipes based on selected recipe type
  const filterRecipes = (recipeType) => {
    setSelectedRecipeType(recipeType);
    // Filter recipes based on recipeType
    const filteredRecipes = recipes.filter(recipe => recipe.recipe_type === recipeType);
    return filteredRecipes;
  };

  return (
    <div className="home-banner">
      <h1>What recipe you want?</h1>
      <div className='par-coursel'>
        <div className='coursel'>
          <div className="bubble-cuisines" role="button" aria-label="Breakfast">
            <Link to="#" onClick={() => filterRecipes('Breakfast')} role="button" aria-label="Breakfast">
              <img alt="" src="https://x.yummlystatic.com/web/bubble/cuisine/american.png" className="bubble-image" />
              <span className="text micro-caps font-bold bubble-text">Breakfast</span>
            </Link>
          </div>
          <div className="bubble-cuisines" role="button" aria-label="Meal">
            <Link to="#" onClick={() => filterRecipes('Meal')} role="button" aria-label="Meal">
              <img alt="" src="https://x.yummlystatic.com/web/bubble/cuisine/american.png" className="bubble-image" />
              <span className="text micro-caps font-bold bubble-text">Meal</span>
            </Link>
          </div>
          <div className="bubble-cuisines" role="button" aria-label="Dessert">
            <Link to="#" onClick={() => filterRecipes('Dessert')} role="button" aria-label="Dessert">
              <img alt="" src="https://x.yummlystatic.com/web/bubble/cuisine/american.png" className="bubble-image" />
              <span className="text micro-caps font-bold bubble-text">Dessert</span>
            </Link>
          </div>
        </div>
      </div>
      <ul className="posts-grid">
        {/* Display filtered recipes if a recipe type is selected */}
        {selectedRecipeType ? (
          recipes.map(recipe => (
            recipe.recipe_type === selectedRecipeType && (
              <li key={recipe.recipe_id} className="post-item">
                <Link to={`/post/${recipe.recipe_id}`}>
                  <img src={`http://127.0.0.1:8000${recipe.image}`} alt={recipe.title} />
                  <h2 className="recipe-title">{recipe.title}</h2>
                  <p className="recipe-desc">{recipe.description}</p>
                </Link>
              </li>
            )
          ))
        ) : (
          // Display all recipes if no recipe type is selected
          recipes.map(recipe => (
            <li key={recipe.recipe_id} className="post-item">
              <Link to={`/post/${recipe.recipe_id}`}>
                <img src={`http://127.0.0.1:8000${recipe.image}`} alt={recipe.title} />
                <h2 className="recipe-title">{recipe.title}</h2>
                <p className="recipe-desc">{recipe.description}</p>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default HomePage;
