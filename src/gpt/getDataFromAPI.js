  // Get regions
export const getAllRealms = async (hangleRegionsDataChange) => {
    try {
      const res = await fetch('http://localhost:5000/api/realms');
      const data = await res.json();
      const newRealms = [];
      for (let realm in data) {
        newRealms.push(data[realm]);
      }
      hangleRegionsDataChange(newRealms);  // Save regions data
      // console.log('Regions:', data);  // Log for retrieved regions
    } catch (error) {
      console.error('Error fetching regions from APP:', error);  // Error while fetching regions
    }
  };

  // Get realms from a specific region
export const getRegionRealms = async (regionId, handleRealmChange) => {
    try {
      const res = await fetch(`http://localhost:5000/api/region/${regionId}`);
      const data = await res.json();
      // Check if the response is an array
      const newRealms = [];
      for (let realm in data) {
        newRealms.push(data[realm]);
      }
      handleRealmChange(newRealms[1]);  // Save realms data
      console.log('Realms:', newRealms[1]);  // Log for retrieved
   
    } catch (error) {
      console.error('Error fetching realms:', error);  // Error while fetching realms
    }
  };

  // Get auction house information
export const getAuctionHouseInfo = async (regionId, realmId, handleAuctionPricesChange) => {
    try {
      const res = await fetch(`http://localhost:5000/api/auctionhouse/${regionId}/${realmId}`);
      const data = await res.json();
      const newAuctionHouses = [];
      for (let auctionHouse in data) {
        newAuctionHouses.push(data[auctionHouse]);
      }
      handleAuctionPricesChange(data);  // Save auction house prices data
      console.log('Auction house info:', data);  // Log auction
    } catch (error) {
      console.error('Error fetching auction house information:', error);  // Error while fetching auction house info
    }
  };

  // Get auction prices for a specific item
export const getAuctionPrices = async (auctionHouseId, itemId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/auction-prices/${auctionHouseId}/${itemId}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching auction prices:', error);  // Error while fetching auction prices
    }
  };