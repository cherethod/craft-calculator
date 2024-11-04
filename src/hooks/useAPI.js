import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { regionsData } from "../mocks/regionResponse";

const useAPI = () => {
    const [token, setToken] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedRealm, setSelectedRealm] = useState(null);
    const [selectedAuctionHouse, setSelectedAuctionHouse] = useState(null);
    const [regions, setRegions] = useState([]);
    const [realms, setRealms] = useState([]);
    const [auctionHouses, setAuctionHouses] = useState([]);
    const { accessToken, getAuthToken } = useAuth();

    const [selectedMode, setSelectedMode] = useState(!selectedRegion || !selectedRealm || !selectedAuctionHouse ? "search_settings" : "default");

    const handleSelectMode = (mode) => {
        if (!selectedRegion || !selectedRealm || !selectedAuctionHouse)  return;
      setSelectedMode(mode);
    }

    useEffect(() => {
            // const storedToken = localStorage.getItem('token');
            // if (storedToken) {
            //     setToken(storedToken);
            // }

            // else {
            const fetchToken = async () => {
            try {
                const authToken = await getAuthToken();
                console.log('authToken:', authToken);
                if (authToken) {
                    setToken(authToken);
                    // localStorage.setItem('token', authToken);
                }
            } catch (error) {
                console.error('Error getting token:', error);

                
            }
                // const authToken = getAuthToken()
                //     .then((newToken) => {
                //         setToken(newToken);
                //         // localStorage.setItem('token', newToken);
                //     })
                //     .catch((error) => {
                //         console.error('Error getting token:', error);
                //     });
                // setToken(authToken);
            } 
        if (!token) {
            fetchToken();
        }

        // }        
    }, []);

    
    useEffect(() => {
        const fetchRealms = async () => {
            if (token) {
                try {
                    const regionsData = await getRealms();
                    console.log('Regions:', regionsData.items);  // Ahora debería mostrar los datos correctos
                    setRegions(regionsData.items);  // Asegúrate de que la estructura `items` sea correcta
                } catch (error) {
                    console.error('Error fetching regions:', error);
                }
            }
        };
    
        fetchRealms();
    }, [token]);

    useEffect(() => {
        const localSelectedRegion = localStorage.getItem('selectedRegion');
        const localSelectedRealm = localStorage.getItem('selectedRealm');
        const localSelectedAuctionHouse = localStorage.getItem('selectedAuctionHouse');

        if (localSelectedRegion && regions) {
            setSelectedRegion(localSelectedRegion);
            const selectedRegion = Object.values(regions).find(region => region.regionId == localSelectedRegion);
            if (selectedRegion) {
                setRealms(selectedRegion.realms);
            }
        }

        if (localSelectedRealm && realms) {
            setSelectedRealm(localSelectedRealm);
            const realmEntry = Object.values(realms).find(realm => realm.realmId == selectedRealm);
            if (realmEntry) {
                setAuctionHouses(realmEntry.auctionHouses);
            }
        }

        if (localSelectedAuctionHouse) {
            setSelectedAuctionHouse(localSelectedAuctionHouse);
        }
        
    }, [regions, realms, auctionHouses]);


// // Temp dev data load
//     useEffect(() => {
//         setRegions(regionsData);
//     }, []);

        const handleTokenChange = (newToken) => {
            setToken(newToken);
        };

        const handleRegionChange = (regionSelection) => {
            const selectedRegion = Object.values(regions).find(region => region.regionId === regionSelection);
            if (selectedRegion) {
                console.log('inside if');                
                setSelectedRegion(selectedRegion.regionId);
                setRealms(selectedRegion.realms);
            } else {
                console.log('inside else');                
                setSelectedRegion(null);
                setRealms([]);
            }
        };

        const handleRealmChange = (realmName) => {
            const realmEntry = Object.values(realms).find(realm => realm.name === realmName);
            if (realmEntry) {
                setSelectedRealm(realmEntry.realmId); // Guarda solo el realmId
                setAuctionHouses(realmEntry.auctionHouses);
                
            } else {
                setSelectedRealm(null); // Si no encuentra coincidencia, limpia la selección
                setAuctionHouses([]); // Limpia las casas de subastas
            }
        };
        

        const handleAuctionHouseIdChange = (newAuctionHouseId) => {
            console.log('newAuctionHouseId: ',newAuctionHouseId);
            
            setSelectedAuctionHouse(newAuctionHouseId);
        };

        const handleSubmitSearchSettings = (e) => {
            e.preventDefault();
            if (selectedRegion && selectedRealm && selectedAuctionHouse) {
                console.log('selectedRegion: ',selectedRegion);
                console.log('selectedRealm: ',selectedRealm);
                console.log('selectedAuctionHouse: ',selectedAuctionHouse);
            }
        }

        const handleStoreSettings = () => {
            console.log('Settings stored:', selectedRegion, selectedRealm, selectedAuctionHouse);
            localStorage.setItem('selectedRegion', selectedRegion);
            localStorage.setItem('selectedRealm', selectedRealm);
            localStorage.setItem('selectedAuctionHouse', selectedAuctionHouse);
        }



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
            const res = await fetch('https://craft-calculator-puce.vercel.app/api/realms');
            if (!res.ok) throw new Error('Failed to fetch realms');
            const data = await res.json();
            return data;
        };

        

        return {
            token,
            selectedRegion,
            selectedRealm,
            selectedAuctionHouse,
            regions,
            realms,
            auctionHouses,
            selectedMode,
            handleSelectMode,
            handleTokenChange,
            handleRegionChange,
            handleRealmChange,
            handleAuctionHouseIdChange,
            handleSubmitSearchSettings,
            handleStoreSettings,
            getAuctionPrices,
            getRealms,
        };
        
    }
 
export default useAPI;