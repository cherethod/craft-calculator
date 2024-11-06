import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { regionsData } from "../mocks/regionResponse";

const useAPIProvider = () => {
    const [token, setToken] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedRealm, setSelectedRealm] = useState(null);
    const [selectedAuctionHouse, setSelectedAuctionHouse] = useState(null);
    const [regions, setRegions] = useState([]);
    const [realms, setRealms] = useState([]);
    const [auctionHouses, setAuctionHouses] = useState([]);
    const { accessToken, tokenExpiresAt, getAuthToken } = useAuth();
    const [ selectedMode, setSelectedMode ] = useState('default');

    // Intervalo en base a tokenExpiresAt
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const newToken = await getAuthToken();
                setToken(newToken);
                console.log('Token obtenido:', newToken);
            } catch (error) {
                console.error('Error obteniendo el token:', error);
            }
        };

        // Llamamos a `fetchToken` al montar
        fetchToken();

        // Configurar intervalo solo si hay un tiempo de expiración válido
        const intervalTime = tokenExpiresAt ? (tokenExpiresAt - Math.floor(Date.now() / 1000)) * 1000 : 60000; // 1 min por defecto
        const intervalId = setInterval(() => {
            if (!token) {
                fetchToken();
            }
        }, intervalTime);

        return () => clearInterval(intervalId);
    }, [token, tokenExpiresAt]);

    // fetchRealms sólo si `token` está disponible
    useEffect(() => {
        const fetchRealms = async () => {
            if (token) {
                try {
                    const regionsData = await getRealms();
                    console.log('Regions:', regionsData.items);
                    setRegions(regionsData.items);
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
         
        // Asegura que las regiones estén configuradas (puede ser con datos de prueba o reales)
        //    if (regions.length === 0) {
        //     setRegions(regionsData);  // Este sería el `regionsData` de tus datos locales, en desarrollo.
        // }

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

    useEffect(() => {
        if (!selectedRegion && !selectedRealm && !selectedAuctionHouse) {
            setSelectedMode('search_settings');
        }
    }, [selectedRegion, selectedRealm, selectedAuctionHouse]);

        const handleTokenChange = (newToken) => {
            setToken(newToken);
        };

        const handleRegionChange = (regionSelection) => {
            const selectedRegion = Object.values(regions).find(region => region.regionId === regionSelection);
            if (selectedRegion) {
                setSelectedRegion(selectedRegion.regionId);
                setRealms(selectedRegion.realms);
            } else {
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
            if (!newAuctionHouseId) {
                setSelectedAuctionHouse(null);
                return;
            }
            setSelectedAuctionHouse(newAuctionHouseId);
        };

        const handleSubmitSearchSettings = (e) => {
            e.preventDefault();
            
            if (selectedRegion && selectedRealm && selectedAuctionHouse) {
                localStorage.setItem('selectedRegion', selectedRegion);
                localStorage.setItem('selectedRealm', selectedRealm);
                localStorage.setItem('selectedAuctionHouse', selectedAuctionHouse);
                console.log('selectedRegion: ',selectedRegion);
                console.log('selectedRealm: ',selectedRealm);
                console.log('selectedAuctionHouse: ',selectedAuctionHouse);
                setSelectedMode('default');
            }
        };

        const priceCache = {};

        const getAuctionPrices = async (auctionHouseId, itemId) => {
            const cacheKey = `${auctionHouseId}-${itemId}`;
            if (priceCache[cacheKey]) {
                return priceCache[cacheKey];  // Devuelve el precio almacenado si ya fue consultado
            }
            try {
                const res = await fetch(`https://craft-calculator-puce.vercel.app/api/auction-prices?auctionHouseId=${auctionHouseId}&itemId=${itemId}`);
                const data = await res.json();
                priceCache[cacheKey] = data;  // Almacena el precio en la caché
                console.log('Auction Prices:', data);
                
                return data;
            } catch (error) {
                console.error('Error fetching auction prices:', error);
            }
        };

          const getRealms = async () => {
            const res = await fetch('api/realms');
            if (!res.ok) throw new Error('Failed to fetch realms');
            const data = await res.json();
            return data;
        };

        const handleSelectedMode = (mode) => {
            console.log('mode: ',mode);
            
            setSelectedMode(mode);
        }

        return {
            token,
            selectedRegion,
            selectedRealm,
            selectedAuctionHouse,
            regions,
            realms,
            auctionHouses,
            selectedMode,
            handleTokenChange,
            handleRegionChange,
            handleRealmChange,
            handleAuctionHouseIdChange,
            handleSubmitSearchSettings,
            handleSelectedMode,
            getAuctionPrices,
            getRealms,
        };
};

export default useAPIProvider;
