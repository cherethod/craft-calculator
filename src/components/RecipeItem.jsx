import { useEffect, useState } from 'react';
import Data from '../mocks/itemData.json';

const RecipeItem = ({ recipe, index }) => {
    const [craftedItems, setCraftedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (craftedItems.length > 0) return;

        const newCraftedItems = [];

        for (let itemId in Data.items) {
            const newRecipe = {
                id: itemId,
                name: Data.items[itemId].name[1],  // Nombre en español
                image: Data.items[itemId].image,
                price: Data.items[itemId].price,
                mats: Data.items[itemId].reagents
            };
            newCraftedItems.push(newRecipe);
        }

        setCraftedItems(newCraftedItems);
        setLoading(false);
    }, []);

    // Efecto para actualizar la receta seleccionada
    useEffect(() => {
        if (selectedRecipeId) {
            const recipe = craftedItems.find(item => item.id === selectedRecipeId);
            setSelectedRecipe(recipe);
        }
    }, [selectedRecipeId, craftedItems]);

    // Efecto para sumar el precio de los materiales
    useEffect(() => {
        if (selectedRecipe) {
            // Calcula el coste total de los materiales
            const totalMatsPrice = Object.entries(selectedRecipe.mats).reduce((acc, [matId, quantity]) => {
                const matPrice = Data.reagents[matId].price;
                return acc + (matPrice * quantity);
            }, 0);
    
            // Convertir el coste de los materiales a oro/plata/cobre
            const matsCost = convertCopperToGoldSilverCopper(totalMatsPrice);
    
            // Convertir el valor del ítem a oro/plata/cobre
            const itemPrice = convertCopperToGoldSilverCopper(selectedRecipe.price);
    
            // Calcula el posible beneficio (profit)
            const profitInCopper = selectedRecipe.price - totalMatsPrice;
            const profit = convertCopperToGoldSilverCopper(profitInCopper);
    
            // Establecer los valores en el estado
            setTotalPrice({ matsCost, itemPrice, profit });
        }
    }, [selectedRecipe]);

    const convertCopperToGoldSilverCopper = (copperAmount) => {
        const gold = Math.floor(copperAmount / 10000);  // Oro = total en cobres dividido entre 10,000
        const remainderAfterGold = copperAmount % 10000;  // Restante después de calcular el oro
        const silver = Math.floor(remainderAfterGold / 100);  // Plata = restante dividido entre 100
        const copper = remainderAfterGold % 100;  // Cobres = restante después de calcular la plata
    
        return { gold, silver, copper };
    };

    return (
        <div className="recipe_item">
            {
                !loading && (
                    <div>
                        <select onChange={(e) => setSelectedRecipeId(e.target.value)}>
                            <option value="" disabled>Select an item</option>
                            {                 
                                craftedItems.map((item, index) => (
                                    <option key={index} value={item.id}>
                                        {item.name} - {item.id}
                                    </option>
                                ))
                            }
                        </select>       
                        
                        {selectedRecipe && (
                            <div className="recipe-details">
                                <h2>{selectedRecipe.name}</h2>
                                <img src={selectedRecipe.image} alt={selectedRecipe.name} />
                                <p>Price: {selectedRecipe.price}</p>
                                <h3>Materials</h3>
                                <ul>
                                    {Object.entries(selectedRecipe.mats).map(([matId, quantity]) => (
                                        <li key={matId}>
                                            {Data.reagents[matId].name[1]} - {quantity} pcs
                                        </li>
                                    ))}
                                </ul>
                                <h3>Total Price</h3>
                                <p>Coste de materiales: {totalPrice.matsCost.gold}g {totalPrice.matsCost.silver}s {totalPrice.matsCost.copper}c</p>
                                <p>Precio del ítem: {totalPrice.itemPrice.gold}g {totalPrice.itemPrice.silver}s {totalPrice.itemPrice.copper}c</p>
                                <p>Posible profit: {totalPrice.profit.gold}g {totalPrice.profit.silver}s {totalPrice.profit.copper}c</p>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default RecipeItem;
