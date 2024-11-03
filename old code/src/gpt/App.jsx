import { useEffect, useState } from 'react'
import './App.css'
// import useAuth from './hooks/useAuth';
import RecipeComponent from './components/RecipeComponent';
import CraftProfitChecker from './components/CraftProfitChecker';
import { getAllRealms, getRegionRealms, getAuctionPrices } from './services/getDataFromAPI';
import ItemSearchHeader from './components/headers/ItemSearchHeader';
import { useAppContext } from './context/AppContext';

function App() {
  const { 
    token,
    getAuth,
    regions,
    realms,
    auctionHouses,
    regionId,
    realmId,
    auctionHouseId,
    handleSelectedAuctionHouse,
    handleSelectedRegion,
    handleSelectedRealm,
    searchItem,
    handleSearchedItemChange,
    hangleRegionsDataChange,
    items,
    isLoadingData
  } = useAppContext();  
  const [toolActive, setToolActive] = useState(false);
  const [searchedItem, setSearchedItem] = useState(null);
  // const { token, getAuth } = useAuth();

  //  ITEMS STATES
  // const [
    // regions,
    // realms,
    // auctionHouses,
    // regionId,
    // realmId,
    // auctionHouseId,
    // handleSelectedAuctionHouse,
    // handleSelectedRegion,
    // handleSelectedRealm,
    // searchItem,
    // handleSearchedItemChange,
    // hangleRegionsDataChange
  // ] = useSearch();
  // const {items, isLoadingData} = useItems({professionSelected, getAuctionPrices, auctionHouseId});


 
  useEffect(() => {
    if (token && !regions) {
      getAllRealms(hangleRegionsDataChange);
    }
  }, [token]);

  return (
    <>
    <main>
    {
      !toolActive && (
        <>
        <ItemSearchHeader 
          regions={regions}
          searchItem={searchItem}
          handleSelectedRegion={handleSelectedRegion}
          realms={realms}
          handleSelectedRealm={handleSelectedRealm}
          realmId={realmId}
          auctionHouses={auctionHouses}
          handleSelectedAuctionHouse={handleSelectedAuctionHouse}
          auctionHouseId={auctionHouseId}
          />
         <h1>Craft Profit Calculator</h1>
        </>
      )
    }
      {
        toolActive && (
          <button className='btn back-btn' onClick={() => setToolActive(false)}>↩ Turn back</button>  
        )
      }
      {
        !toolActive && (
          <div className='tools-btns'>
            {/* <button className='btn' onClick={() => setToolActive('recipe-creator')}>Create New Recipe</button>  */}
            <button className='btn' onClick={() => setToolActive('price-fixer')}>Craft Profit Checker</button> 
          </div>
        )
      }
      {
        toolActive == 'recipe-creator' && <RecipeComponent /> 
      }
      {
        toolActive == 'price-fixer' && <CraftProfitChecker getAuctionPrices={getAuctionPrices} auctionHouseId={auctionHouseId} />
      }

      {
        searchedItem && (
          <>
            <h2>Item found</h2>
            <div className='item'>
              {/* <img src={items.find(i => i.id == searchItem.itemId).image} alt={searchedItem.name} /> */}
              <h3>{searchedItem.name}</h3>
              <p>{Math.floor(Number(searchedItem.minBuyout) / 10000)}g {Math.floor((Number(searchedItem.minBuyout) % 10000) / 100)}s {Number(searchedItem.minBuyout) % 100}c</p>
            </div>
          </>
        )
      }  
    </main>
    </>
  )
}

export default App
