import { useContext } from "react";
import useAPI from "../hooks/useAPI";
import { ItemContext } from "../context/ItemContext";

const SearchSettings = () => {
    const {
        dictionary
    } = useContext(ItemContext)
    // const {selectedRegion, realm, auctionHouseId, handleRegionChange, handleRealmChange, handleAuctionHouseIdChange} = useContext(ItemContext);
    const { regions, realms, auctionHouses, selectedRegion, selectedRealm, selectedAuctionHouse, handleRegionChange, handleRealmChange, handleAuctionHouseIdChange } = useAPI();

    return (
        <form className="search_settings">
            <div className="input_container">
                <label htmlFor="region">Region:</label>
                <select name="region" id="region" onChange={(e) => handleRegionChange(e.target.value)}>
                    <option value="" disabled selected>{dictionary && dictionary['selectRegion']}</option>
                    {
                      regions && regions.map((region) => {
                        return <option key={`region-${region.id}`} value={region.regionId}>[{region.regionPrefix.toUpperCase()}] - {region.name} ({region.gameVersion}) {region.regionId}</option>
                      })
                    }
                </select>
            </div>
        </form>
    );
};

export default SearchSettings;