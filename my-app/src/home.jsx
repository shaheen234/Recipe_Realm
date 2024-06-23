import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';  // Import the CSS file




// Sample posts data
const posts = [
  { id: 1, title: 'Chili', description: 'This is the first post', imageUrl: '/chili.jpg' },
  { id: 2, title: 'Chili', description: 'This is the first post', imageUrl: '/chili.jpg' },
  { id: 3, title: 'Chili', description: 'This is the first post', imageUrl: '/chili.jpg' },
  { id: 4, title: 'Chili', description: 'This is the first post', imageUrl: '/chili.jpg' },
  { id: 5, title: 'Chili', description: 'This is the first post', imageUrl: '/chili.jpg' },
  { id: 6, title: 'Chili', description: 'This is the first post', imageUrl: '/chili.jpg' },
  { id: 7, title: 'Chili', description: 'This is the first post', imageUrl: '/chili.jpg' },
  { id: 8, title: 'Chili', description: 'This is the first post', imageUrl: '/chili.jpg' }
];



const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/get_all_recipes/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecipes(data.recipe); 
      // Assuming data is an array of recipes
      console.log(data.recipe)
    } catch (error) {
      console.error('Error fetching recipes:', error);
      // Handle error, show a message, etc.
    }
  };

  fetchRecipes();
}, []);
  return (
    <div className="home-banner">
      <h1>What recipe you want?</h1>
      <div className='par-coursel'>
        <div className='coursel'>
          <div class="bubble-cuisines" role="button" aria-label="American">
            <img alt="" src="https://x.yummlystatic.com/web/bubble/cuisine/american.png" class="bubble-image"/>
            <span class="text micro-caps font-bold bubble-text">American</span>
          </div>
          <div class="bubble-cuisines" role="button" aria-label="American">
            <img alt="" src="https://x.yummlystatic.com/web/bubble/cuisine/american.png" class="bubble-image"/>
            <span class="text micro-caps font-bold bubble-text">American</span>
          </div>
          <div class="bubble-cuisines" role="button" aria-label="American">
            <img alt="" src="https://x.yummlystatic.com/web/bubble/cuisine/american.png" class="bubble-image"/>
            <span class="text micro-caps font-bold bubble-text">American</span>
          </div>
        </div>
      </div>      
      <ul className="posts-grid">
        {recipes.map(recipe => (
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
}

export default HomePage;

