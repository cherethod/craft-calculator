import { createContext, useEffect, useState } from "react";
import ItemData from "../mocks/itemData.json";
import useAPI from "../hooks/useAPI";

const ItemContext = createContext();

const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const { 
        token, 
        selectedRegion, 
        selectedRealm, 
        selectedAuctionHouse, 
        handleTokenChange, 
        handleRegionChange, 
        handleRealmChange, 
        handleAuctionHouseIdChange,
        getAuctionPrices,
        getRealms,
    } = useAPI();
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
                    price: getAuctionPrices(selectedAuctionHouse, item),
                };
                newItems.push(newItem);
                console.log('newItem: ',newItem);
                
            }

            for (let item in ItemData.reagents) {
                const reagentData = ItemData.reagents[item];
                const newItem = {
                    id: item,
                    name: reagentData.name,
                    reagents: [],
                    image: reagentData.image,
                    price: getAuctionPrices(selectedAuctionHouse, item),
                };
                newItems.push(newItem);
                console.log('newItem: ',newItem);
                
            }
            setItems(newItems);
        }
        const realmsResponse = getRealms();
        console.log('realmsResponse: ',realmsResponse);
        
        
    }, [items]);


    return (
        <ItemContext.Provider value={{items}}>
        {children}
        </ItemContext.Provider>
    );
};

export { ItemProvider, ItemContext };