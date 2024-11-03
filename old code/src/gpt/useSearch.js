import { useState } from "react";

const useSearch = () => {
    
  // DATA STATES
  const [regions, setRegions] = useState();
  const [realms, setRealms] = useState();
  const [auctionHouses, setAuctionHouses] = useState();

  // SELECTED OPTIONS STATES
  const [regionId, setRegionId] = useState('');
  const [realmId, setRealmId] = useState();
  const [auctionHouseId, setAuctionHouseId] = useState(446);
    
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
 return { regions, realms, auctionHouses, regionId, realmId, auctionHouseId, handleSelectedAuctionHouse, handleSelectedRegion, handleSelectedRealm, searchItem, handleSearchedItemChange, hangleRegionsDataChange };
}

export default useSearch;
