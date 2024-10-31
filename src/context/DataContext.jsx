// DataContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useItems from '../hooks/useItems';
import { getAllRealms, getRegionRealms, getAuctionPrices } from '../services/getDataFromAPI';

// Crear el contexto
const DataContext = createContext();

export const DataProvider = ({ children }) => {
    // Usar autenticación y items
    const { token, getAuth } = useAuth();
    const { items, isLoadingData } = useItems({ getAuctionPrices });

    // Estados
    const [regions, setRegions] = useState();
    const [realms, setRealms] = useState();
    const [auctionHouses, setAuctionHouses] = useState();
    const [regionId, setRegionId] = useState('');
    const [realmId, setRealmId] = useState();
    const [auctionHouseId, setAuctionHouseId] = useState(446);
    const [professionSelected, setProfessionSelected] = useState(false);
    const [alchemySelected, setAlchemySelected] = useState(false);
    const [searchedItem, setSearchedItem] = useState(null);

    // Funciones de selección
    const handleRealmChange = (realmId) => setRealms(realmId);
    const handleSelectedRegion = (e) => {
        const newRegionId = e.target.value;
        setRegionId(newRegionId);
        getRegionRealms(newRegionId, handleRealmChange);
    };
    const handleSelectedRealm = (e) => {
        const newRealmId = e.target.value;
        setRealmId(newRealmId);
        const selectedRealm = Object.values(realms).find(realm => realm.realmId === Number(newRealmId));
        setAuctionHouses(selectedRealm ? selectedRealm.auctionHouses : []);
    };
    const handleSearchedItemChange = (item) => setSearchedItem(item);

    const searchItem = (e) => {
        e.preventDefault();
        getAuctionPrices(auctionHouseId, Number(e.target['item-id'].value))
        .then(data => handleSearchedItemChange(data))
        .catch(error => console.error('Error fetching item:', error));
    };

    // Cargar regiones
    useEffect(() => {
        if (token && !regions) getAllRealms(setRegions);
    }, [token]);

    // Proveer valores
    return (
        <DataContext.Provider
        value={{
            token, getAuth, regions, realms, auctionHouses, regionId, setRegionId, realmId,
            setRealmId, auctionHouseId, setAuctionHouseId, searchedItem, searchItem,
            handleSelectedRegion, handleSelectedRealm, handleSearchedItemChange, items, isLoadingData,
            professionSelected, setProfessionSelected, alchemySelected, setAlchemySelected, getAuctionPrices
        }}
        >
        {children}
        </DataContext.Provider>
    );
};

// Hook para usar el contexto
export const useDataContext = () => useContext(DataContext);
