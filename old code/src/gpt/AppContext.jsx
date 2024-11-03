import { createContext, useContext } from 'react';
import useAuth from '../hooks/useAuth';
import useSearch from '../hooks/useSearch';
import useItems from '../hooks/useItems';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const {token, getAuth} = useAuth();
    const { regions, realms, auctionHouses, regionId, realmId, auctionHouseId, handleSelectedAuctionHouse, handleSelectedRegion, handleSelectedRealm, searchItem, handleSearchedItemChange, hangleRegionsDataChange} = useSearch();
    const {items, handleItemsChange, isLoadingData } = useItems({ professionSelected: 'alchemy', auctionHouseId: 446 });

    return (
        <AppContext.Provider value={{ token, getAuth, regions, realms, auctionHouses, regionId, realmId, auctionHouseId, handleSelectedAuctionHouse, handleSelectedRegion, handleSelectedRealm, searchItem, handleSearchedItemChange, hangleRegionsDataChange, items, handleItemsChange, isLoadingData }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);