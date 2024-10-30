import { useEffect, useState } from "react";
import Data from '../mocks/itemData.json';

const useItems = ({professionSelected, getAuctionPrices, auctionHouseId}) => {
    const [items, setItems] = useState(null);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const handleItemsChange = (data) => {
    setItems(data);
    console.log('items updated');
  };

    // Precarga de precios de reagents
    const preloadedReagentsPrices = {};

  const getItemPrices = (itemId) => {
    return getAuctionPrices(auctionHouseId, itemId).then(data => {
      console.log(data);
      const itemPrice = data.minBuyout;
      const itemNumAuctions = data.numAuctions;
      const itemPostQuantity = data.postQuantity;
      const itemHistorical = data.historical;
      return [itemPrice, itemNumAuctions, itemPostQuantity, itemHistorical];
      
    }).catch(error => {
      console.error('Error fetching item:', error);
      return 0;
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const newItems = [];

      // Precargar todos los precios de reagents en una sola iteración
      for (let reagent in Data.reagents) {
        const [itemPrice, itemNumAuctions, itemPostQuantity, itemHistorical] = await getItemPrices(reagent);
        preloadedReagentsPrices[reagent] = {
          price: itemPrice,
          numAuctions: itemNumAuctions,
          postQuantity: itemPostQuantity,
          historical: itemHistorical
        };
      }

      // Procesa los items principales usando los precios precargados de reagents
      for (let item in Data.items) {
        const itemReagents = [];

        // Usar los precios precargados en lugar de hacer llamadas adicionales
        for (let reagent in Data.items[item].reagents) {
          const reagentData = preloadedReagentsPrices[reagent];
          if (reagentData) {
            itemReagents.push({
              id: reagent,
              quantity: Data.items[item].reagents[reagent],
              name: Data.reagents[reagent].name,
              image: Data.reagents[reagent].image,
              price: reagentData.price,
              numAuctions: reagentData.numAuctions,
              postQuantity: reagentData.postQuantity,
              historical: reagentData.historical,
            });
          }
        }

        if (Data.items[item].class.toLowerCase() === professionSelected) {
          const [itemPrice, itemNumAuctions, itemPostQuantity, itemHistorical] = await getItemPrices(item);
          const newItem = {
            id: item,
            name: Data.items[item].name,
            image: Data.items[item].image,
            price: itemPrice,
            units: Data.items[item].units,
            reagents: itemReagents,
            numAuctions: itemNumAuctions,
            postQuantity: itemPostQuantity,
            historical: itemHistorical,
          };
          newItems.push(newItem);
        }
      }

      // Agregar reagents individuales como items si es necesario
      for (let reagent in Data.reagents) {
        const reagentData = preloadedReagentsPrices[reagent];
        if (reagentData) {
          const newItem = {
            id: reagent,
            name: Data.reagents[reagent].name,
            image: Data.reagents[reagent].image,
            price: reagentData.price,
            reagents: false,
            numAuctions: reagentData.numAuctions,
            postQuantity: reagentData.postQuantity,
            historical: reagentData.historical,
          };
          newItems.push(newItem);
        }
      }

      handleItemsChange(newItems);
      setIsLoadingData(false);    
    };

    fetchData();
  }, [professionSelected]);

  return { items, handleItemsChange, isLoadingData };
};

export default useItems;
