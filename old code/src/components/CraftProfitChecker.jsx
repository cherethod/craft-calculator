import { useState } from "react";
import Item from "./Item";
import useItems from '../hooks/useItems';

const CraftProfitChecker = ({getAuctionPrices, auctionHouseId}) => {
     
     const [alchemySelected, setAlchemySelected] = useState(false);
     const [professionSelected, setProfessionSelected] = useState(false);
     const {items, isLoadingData} = useItems({professionSelected, getAuctionPrices, auctionHouseId});

    return (     
        <>
          <header className="profesion_header">
               <div className="alchemy_switcher">
                    <div className="profesion_icon_container" onClick={() => setAlchemySelected(!alchemySelected)}>
                         <img src="https://wow.zamimg.com/images/wow/icons/large/trade_alchemy.jpg" alt="Alchemy"/>
                    {
                         alchemySelected && (
                              <div className={`mastery_selector ${alchemySelected ? 'active' : ''}`}>
                                   <div className="mastery_icon_container" onClick={()=> setProfessionSelected('potion')}>
                                        <img src="https://wow.zamimg.com/images/wow/icons/large/inv_alchemy_80_potion02yellow.jpg" alt="Potions"/>
                                   </div>
                                   <div className="mastery_icon_container" onClick={()=> setProfessionSelected('transmute')}>
                                        <img src="https://wow.zamimg.com/images/wow/icons/large/inv_misc_truegold.jpg" alt="Transmutes"/>
                                   </div>
                                   <div className="mastery_icon_container" onClick={()=> setProfessionSelected('elixir')}>
                                        <img src="https://wow.zamimg.com/images/wow/icons/large/inv_alchemy_endlessflask_01.jpg" alt="Elixir / Flasks"/>
                                   </div>
                              </div>
                         )
                    }
                    </div>
               </div>   
          </header>
            <h1>Items table</h1>
           {
                isLoadingData ? (
                     <div className="loader"></div>
                ) : (
                     <div className="items">
                          {items.map((item, index) => (
                            <Item key={index} item={item} items={items} isLoadingData={isLoadingData}  />
                          ))}
                     </div>
                )
           }
        </>
    );
}

export default CraftProfitChecker;
