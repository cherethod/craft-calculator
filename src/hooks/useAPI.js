import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useAPI = () => {
    const [token, setToken] = useState(null);
    const [region, setRegion] = useState(null);
    const [realm, setRealm] = useState(null);
    const [auctionHouseId, setAuctionHouseId] = useState(446);
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
                console.log(authToken);
                
                setToken(authToken);
            } 
        }
        
    }, [token]);

        const handleTokenChange = (newToken) => {
            setToken(newToken);
        };

        const handleRegionChange = (newRegion) => {
            setRegion(newRegion);
        };

        const handleRealmChange = (newRealm) => {
            setRealm(newRealm);
        };

        const handleAuctionHouseIdChange = (newAuctionHouseId) => {
            setAuctionHouseId(newAuctionHouseId);
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

        return {
            token,
            region,
            realm,
            auctionHouseId,
            handleTokenChange,
            handleRegionChange,
            handleRealmChange,
            handleAuctionHouseIdChange,
            getAuctionPrices,
        };
        
    }
 
export default useAPI;