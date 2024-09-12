import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RecipeDetailPage() {
  const { id } = useParams(); // Assuming you're using React Router
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=f5da979edcd74faa9026601b77ffc614`
        );
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching the recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);
  
  if(loading) {
    return <div>Loading...</div>
  }
  if(!recipe) {
    return <div>No recipe found.</div>
  }
  
  return (
    <div className='recipe'>
      <div className='recipe-header'>
        <Link to={"/"}><i class="fa-solid fa-arrow-left"></i></Link>
        <h1 className='recipe-title'>{recipe.title}</h1>
      </div>
      <div className='recipe-img-stats'>
        <img className='recipe-image' src={recipe.image} alt={recipe.title} />
        <div className='recipe-stats-detail'>
          <span><i class="fa-solid fa-money-bill"></i> {recipe.pricePerServing}$ </span>
          <span><i class="fa-regular fa-clock"></i> {recipe.readyInMinutes} mins </span>
          <span className='recipe-servings'><i class="fa-solid fa-bowl-food"></i> {recipe.servings} servings</span>
        </div>
      </div>
      
      <article className='recipe-info'>
        <div className='recipe-ingredients'>
          <h3>Ingredients</h3>
          <ul className='recipe-ingredients-list'>
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        </div>
        <h3>Instructions</h3>
        <div className='recipe-instructions' dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        <h3>This recipe match the dish types</h3>
        <ul className='recipe-dish-types'>
          {recipe.dishTypes.map((dish) => (
            <li key={dish.id}>{dish}</li>
          ))}
        </ul>
      </article>
      <p className='recipe-copyright'>&#169; Credits for this recipe: {recipe.sourceName}</p>
    </div>
  );

}

export default RecipeDetailPage;
