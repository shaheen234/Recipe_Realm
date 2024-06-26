import React, { useState } from 'react';

const EditRecipeModal = ({ recipe, onUpdate, onClose }) => {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [minutes_to_cook, setMinutesToCook] = useState(recipe.minutes_to_cook);
  
  const handleUpdate = async () => {
    const updatedRecipe = {
      ...recipe,
      title,
      description,
      ingredients,
      minutes_to_cook
    };
    onUpdate(updatedRecipe);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Recipe</h2>
        <form onSubmit={handleUpdate}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label>Ingredients:</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
          <label>minutes to cook:</label>
          <textarea
            value={minutes_to_cook}
            onChange={(e) => setMinutesToCook(e.target.value)}
            required
          />
          <div className="modal-actions">
            <button type="submit" className="update-btn">Update</button>
            <button onClick={onClose} className="close-btn">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipeModal;
