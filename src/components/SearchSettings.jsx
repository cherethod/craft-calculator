import { useContext } from "react";
import { ItemContext } from "../context/ItemContext";

const SearchSettings = () => {
    const {selectedRegion, realm, auctionHouseId, handleRegionChange, handleRealmChange, handleAuctionHouseIdChange} = useContext(ItemContext);

    

    return (
        <form className="search_settings">
            <div className="input_container">
                <label htmlFor="region">Region:</label>
                <select name="region" id="region">
                    {
                        
                    }
                </select>
            </div>
        </form>
    );
};

export default SearchSettings;