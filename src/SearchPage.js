import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]); // Initialize as an empty array
  const [cuisine, setCuisine] = useState('');

  const cuisines = [
    'Asian',
    'American',
    'Chinese',
    'European',
    'French',
    'Japanese',
    'Italian',
    'Mexican',
    'Thai',
    'Mediterranean'
  ]

  const fetchRecipes = async (cuisineOverride = cuisine) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&cuisine=${cuisineOverride}&apiKey=f5da979edcd74faa9026601b77ffc614&addRecipeInformation=true`
      );
      const data = await response.json();
      setRecipes(data.results || []); // Ensure recipes is an array
    } catch (error) {
      console.error("Error fetching the recipes:", error);
      setRecipes([]); // Set recipes to an empty array on error
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchRecipes();
    }
  };
  const handleSearch = () => {
    fetchRecipes();
  };

  const handleCuisineSelect = (selectedCuisine) => {
  setCuisine(selectedCuisine); // Update the cuisine state
  fetchRecipes(selectedCuisine); // Fetch recipes using the selected cuisine directly
};
  return (
    <main className='recipe-search-page'>
      <div className='recipe-search'>
        <h1 className='recipe-search-heading'>What would you like to cook today?</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes"
          onKeyDown={handleKeyDown} // Trigger search on Enter key
        />
        <button onClick={handleSearch}><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
      
      {/* Cuisine categories section */}
      
      <div className='recipes-cuisine'>
        <h3>Select a Cuisine:</h3>
        <div className='recipes-cuisine-btn'>
        {cuisines.map((cuisineOption) => (
          <button
            className='cuisine-btn'
            key={cuisineOption}
            onClick={() => handleCuisineSelect(cuisineOption)}
            style={{
              marginRight: '10px',
              padding: '10px',
              backgroundColor: cuisine === cuisineOption ? 'lightblue' : 'lightgray',
            }}
          >
            {cuisineOption}
          </button>
        ))}
        </div>
        
      </div>

      <div className='recipes-list'>
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Link className='recipe-details-link' to={`recipes/${recipe.id}`}>
              <div className='recipe-preview' key={recipe.id}>
                  <img className='img-search' src={recipe.image} alt={recipe.title} />
                  <div className='recipe-facts'>
                    <h2>{recipe.title}</h2>
                    <div className='recipe-stats'>
                      <span><i class="fa-regular fa-clock"></i> {recipe.readyInMinutes} mins </span>
                      <span className='recipe-servings'><i class="fa-solid fa-bowl-food"></i> {recipe.servings} servings</span>
                    </div>
                  </div>
              </div>
            </Link>
            
          ))
        ) : (
          <p className='no-recipes'>No recipes found. Try another search!</p>
        )}
      </div>
    </main>
  );
}

export default SearchPage;
