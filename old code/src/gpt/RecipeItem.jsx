import { useEffect, useState } from 'react';
import Data from '../mocks/itemData.json';

const RecipeItem = ({ recipe, index }) => {
    const [craftedItems, setCraftedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    // Effect to populate the crafted items list
    useEffect(() => {
        if (craftedItems.length > 0) return;  // Prevent refetch if items are already loaded

        const newCraftedItems = [];

        for (let itemId in Data.items) {
            const newRecipe = {
                id: itemId,
                name: Data.items[itemId].name[1],  // Name in Spanish
                image: Data.items[itemId].image,
                price: Data.items[itemId].price,
                mats: Data.items[itemId].reagents  // Materials (reagents) required
            };
            newCraftedItems.push(newRecipe);  // Add new recipe to the list
        }

        setCraftedItems(newCraftedItems);  // Update crafted items state
        setLoading(false);  // Stop loading once data is set
    }, []);

    // Effect to update the selected recipe when an item is chosen
    useEffect(() => {
        if (selectedRecipeId) {
            const recipe = craftedItems.find(item => item.id === selectedRecipeId);
            setSelectedRecipe(recipe);  // Set the selected recipe based on ID
        }
    }, [selectedRecipeId, craftedItems]);

    // Effect to calculate the total material cost and potential profit when a recipe is selected
    useEffect(() => {
        if (selectedRecipe) {
            // Calculate the total cost of the materials
            const totalMatsPrice = Object.entries(selectedRecipe.mats).reduce((acc, [matId, quantity]) => {
                const matPrice = Data.reagents[matId].price;  // Fetch material price from data
                return acc + (matPrice * quantity);  // Total = price * quantity
            }, 0);
    
            // Convert the material cost from copper to gold/silver/copper
            const matsCost = convertCopperToGoldSilverCopper(totalMatsPrice);
    
            // Convert the item price from copper to gold/silver/copper
            const itemPrice = convertCopperToGoldSilverCopper(selectedRecipe.price);
    
            // Calculate the potential profit in copper
            const profitInCopper = selectedRecipe.price - totalMatsPrice;
            const profit = convertCopperToGoldSilverCopper(profitInCopper);  // Convert profit to gold/silver/copper
    
            // Set the calculated values in the state
            setTotalPrice({ matsCost, itemPrice, profit });
        }
    }, [selectedRecipe]);

    // Helper function to convert copper to gold, silver, and copper denominations
    const convertCopperToGoldSilverCopper = (copperAmount) => {
        const gold = Math.floor(copperAmount / 10000);  // Gold = total copper divided by 10,000
        const remainderAfterGold = copperAmount % 10000;  // Remainder after gold
        const silver = Math.floor(remainderAfterGold / 100);  // Silver = remainder divided by 100
        const copper = remainderAfterGold % 100;  // Copper = remainder after silver
    
        return { gold, silver, copper };  // Return an object with the gold, silver, and copper values
    };

    return (
        <div className="recipe_item">
            {
                !loading && (  // Only display content once data has finished loading
                    <div>
                        <select onChange={(e) => setSelectedRecipeId(e.target.value)}>  // Dropdown to select a recipe
                            <option value="" disabled>Select an item</option>
                            {                 
                                craftedItems.map((item, index) => (  // Populate dropdown with items
                                    <option key={index} value={item.id}>
                                        {item.name} - {item.id}
                                    </option>
                                ))
                            }
                        </select>       
                        
                        {selectedRecipe && (  // Display selected recipe details
                            <div className="recipe-details">
                                <h2>{selectedRecipe.name}</h2>  // Recipe name
                                <img src={selectedRecipe.image} alt={selectedRecipe.name} />  // Recipe image
                                <p>Price: {selectedRecipe.price}</p>  // Item price in copper
                                <h3>Materials</h3>
                                <ul>
                                    {Object.entries(selectedRecipe.mats).map(([matId, quantity]) => (  // Display materials required for recipe
                                        <li key={matId}>
                                            {Data.reagents[matId].name[1]} - {quantity} unit 
                                        </li>
                                    ))}
                                </ul>
                                {/* <h3>Total Price</h3>
                                <p>Coste de materiales: {totalPrice.matsCost.gold}g {totalPrice.matsCost.silver}s {totalPrice.matsCost.copper}c</p>  // Material cost in gold/silver/copper
                                <p>Precio del ítem: {totalPrice.itemPrice.gold}g {totalPrice.itemPrice.silver}s {totalPrice.itemPrice.copper}c</p>  // Item price in gold/silver/copper
                                <p>Posible profit: {totalPrice.profit.gold}g {totalPrice.profit.silver}s {totalPrice.profit.copper}c</p>  // Potential profit in gold/silver/copper */}
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default RecipeItem;
