import { useEffect, useState } from 'react'
import './App.css'
import useAuth from './hooks/useAuth';
import RecipeComponent from './components/RecipeComponent';
import CraftProfitChecker from './components/CraftProfitChecker';
import { getAllRealms, getRegionRealms, getAuctionPrices } from './services/getDataFromAPI';
import ItemSearchHeader from './components/headers/ItemSearchHeader';

function App() {
  const [toolActive, setToolActive] = useState(false);
  const { token, getAuth } = useAuth();
  // DATA STATES
  const [regions, setRegions] = useState();
  const [realms, setRealms] = useState();
  const [auctionHouses, setAuctionHouses] = useState();

  // SELECTED OPTIONS STATES
  const [regionId, setRegionId] = useState('');
  const [realmId, setRealmId] = useState();
  const [auctionHouseId, setAuctionHouseId] = useState(446);

  //  ITEMS STATES
  const [searchedItem, setSearchedItem] = useState(null);



  const handleRealmChange = (realmId) => {
    setRealms(realmId);
  }

  const hangleRegionsDataChange = (regionsData) => {
    setRegions(regionsData);
  }

  const handleSelectedAuctionHouse = (e) => {
    setAuctionHouseId(e.target.value);
  }

  const handleSelectedRegion = (e) => {
    setRegionId(e.target.value);
    getRegionRealms(e.target.value, handleRealmChange);
  }

  const handleSelectedRealm = (e) => {
    setRealmId(e.target.value);
    const selectedRealm = Object.values(realms).find(realm => realm.realmId === Number(e.target.value));
    const newAuctionHouses = [];
    for (let auctionHouse of selectedRealm.auctionHouses) {
      newAuctionHouses.push(auctionHouse);
    }
    setAuctionHouses(newAuctionHouses);
  }

  const handleSearchedItemChange = (item) => {
    setSearchedItem(item);
  }

  const searchItem = (e) => {
    e.preventDefault();
    getAuctionPrices(auctionHouseId, Number(e.target['item-id'].value)).then(data => {
      handleSearchedItemChange(data);
    }).catch(error => {
      console.error('Error fetching item:', error);
    });
  }


 
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
