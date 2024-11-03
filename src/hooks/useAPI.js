import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import realmResponse from '../mocks/realmsResponse.json';

const useAPI = () => {
    const [token, setToken] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedRealm, setSelectedRealm] = useState(null);
    const [selectedAuctionHouse, setSelectedAuctionHouse] = useState(null);
    const [regions, setRegions] = useState([]);
    const [realms, setRealms] = useState([]);
    const [auctionHouses, setAuctionHouses] = useState([]);
    const { accessToken, getAuthToken } = useAuth();

    useEffect(() => {
        if (!token) {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
            }
            else {
                const authToken = getAuthToken()
                    .then((newToken) => {
                        setToken(newToken);
                        localStorage.setItem('token', newToken);
                    })
                    .catch((error) => {
                        console.error('Error getting token:', error);
                    });
                
                setToken(authToken);
            } 
        }        
    }, []);

    useEffect(() => {
        if (token) {
            console.log('Effect getRealms initiated');
            
            getRealms()
                .then((regions) => {
                    const newRegions = [];
                    for (let region in regions.items) {
                        
                        newRegions.push(regions.items[region]);
                    }
                    
                    setRegions(newRegions);
                })
                .catch((error) => {
                    console.error('Error getting regions:', error);
                });
        }
    }, []);

    useEffect(() => {
        if (selectedRegion) {
            console.log('selectedRegion: ',selectedRegion);
            
            const newRealms = [...selectedRegion.realms];
            setRealms(newRealms);
            
            // for (let realm in selectedRegion.realms) {
            //     console.log('realm: ',selectedRegion.realms[realm]);
                
            //     newRealms.push(selectedRegion.realms[realm]);
            // }
            // setRealms(newRealms);
        }
    }, [selectedRegion]);

    // useEffect(() => {
    //     if (realms) {
    //         console.log('realms: ',realms);
            
    //         const newAuctionHouses = [...selectedRealm.auctionHouses];
    //         log('newAuctionHouses: ',newAuctionHouses);
    //         // for (let auctionHouse in selectedRealm.auctionHouses) {
    //         //     console.log('auctionHouse: ',selectedRealm.auctionHouses[auctionHouse]);
                
    //         //     newAuctionHouses.push(selectedRealm.auctionHouses[auctionHouse]);
    //         // }
    //         // setAuctionHouses(newAuctionHouses);
    //     }
    // }, [selectedRegion, realms]);





        const handleTokenChange = (newToken) => {
            setToken(newToken);
        };

        const handleRegionChange = (newRegion) => {
            setSelectedRegion(regions[newRegion - 1]);
        };

        const handleRealmChange = (newRealm) => {
            console.log('selectedRegion: ',selectedRegion);
            console.log('newRealm: ',newRealm);
            
        };

        const handleAuctionHouseIdChange = (newAuctionHouseId) => {
            setSelectedAuctionHouse(newAuctionHouseId);
        };

        const getAuctionPrices = async (auctionHouseId, itemId) => {
            try {
              const res = await fetch(`https://craft-calculator-puce.vercel.app/api/auction-prices?auctionHouseId=${auctionHouseId}&itemId=${itemId}`);
              const data = await res.json();
              return data;
            } catch (error) {
              console.error('Error fetching auction prices:', error);  // Error while fetching auction prices
            }
          };

          const getRealms = async () => {
            try {
              const res = await fetch('https://craft-calculator-puce.vercel.app/api/realms');
              const data = await res.json();
              return data;
            } catch (error) {
              console.error('Error fetching realms:', error);  // Error while fetching realms
            }

            // return realmResponse;
          }

        

        return {
            token,
            selectedRegion,
            selectedRealm,
            selectedAuctionHouse,
            regions,
            realms,
            handleTokenChange,
            handleRegionChange,
            handleRealmChange,
            handleAuctionHouseIdChange,
            getAuctionPrices,
            getRealms,
        };
        
    }
 
export default useAPI;