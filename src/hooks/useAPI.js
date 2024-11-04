import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useAPI = () => {
    const [token, setToken] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedRealm, setSelectedRealm] = useState(null);
    const [selectedAuctionHouse, setSelectedAuctionHouse] = useState(446);
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





        const handleTokenChange = (newToken) => {
            setToken(newToken);
        };

        const handleRegionChange = (newRegion) => {
            setSelectedRegion(newRegion);
        };

        const handleRealmChange = (newRealm) => {
            setSelectedRealm(newRealm);
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
            handleTokenChange,
            handleRegionChange,
            handleRealmChange,
            handleAuctionHouseIdChange,
            getAuctionPrices,
            getRealms,
        };
        
    }
 
export default useAPI;