import { createContext, useEffect, useState } from "react";
import ItemData from "../mocks/itemData.json";
import useAPI from "../hooks/useAPI";

const ItemContext = createContext();

const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const { token, region, realm, auctionHouseId, handleTokenChange, handleRegionChange, handleRealmChange, handleAuctionHouseIdChange} = useAPI();
    // Developement effetc to fullify the items array
    useEffect(() => {
        if (items.length === 0) {
            const newItems = [];

            for (let item in ItemData.items) {
                const itemData = ItemData.items[item];
                const reagents = [];
                for (let reagent in itemData.reagents) {
                    reagents.push({
                        id: reagent,
                        quantity: itemData.reagents[reagent],
                        name: ItemData.reagents[reagent].name,
                        image: ItemData.reagents[reagent].image,
                    });              
                }
                const newItem = {
                    id: item,
                    name: itemData.name,
                    reagents: reagents,
                    image: itemData.image,
                };
                newItems.push(newItem);
            }
            setItems(newItems);
        }
        console.log(items);
        console.log(token);
        
        
    }, [items]);


    return (
        <ItemContext.Provider value={{items}}>
        {children}
        </ItemContext.Provider>
    );
};

export { ItemProvider, ItemContext };