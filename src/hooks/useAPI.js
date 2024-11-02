import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useAPI = () => {
    const [token, setToken] = useState(null);
    const [region, setRegion] = useState(null);
    const [realm, setRealm] = useState(null);
    const [auctionHouseId, setAuctionHouseId] = useState(null);
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

        return {
            token,
            region,
            realm,
            auctionHouseId,
            handleTokenChange,
            handleRegionChange,
            handleRealmChange,
            handleAuctionHouseIdChange
        };
        
    }
 
export default useAPI;