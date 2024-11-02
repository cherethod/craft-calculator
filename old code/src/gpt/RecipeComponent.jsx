import { useState } from "react";
import RecipeItem from "./RecipeItem";


const RecipeComponent = () => {
    const [recipes, setRecipes] = useState([]);
    const handleAddNewRecipe = () => {
        setRecipes([...recipes, {}]);
        console.log('Recipe created');
        
    }

    return (
        <div>
            <button onClick={()=> handleAddNewRecipe()}>Create New Recipe</button>
            {
                recipes && recipes.length > 0 && recipes.map((recipe, index) => (
                    <RecipeItem key={index} recipe={recipe} index={index} />
                ))
                    
            }
        </div>
    );
}

export default RecipeComponent