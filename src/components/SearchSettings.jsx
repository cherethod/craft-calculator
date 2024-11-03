import { useContext } from "react";
import { ItemContext } from "../context/ItemContext";
import useAPI from "../hooks/useAPI";

const SearchSettings = () => {
    const {
        dictionary,
        regions, 
    } = useContext(ItemContext);

    const { selectedRegion, realms, selectedRealm, selectedAuctionHouse, handleRegionChange, handleRealmChange, handleAuctionHouseIdChange } = useAPI();

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
            {
                regions && selectedRegion && realms && (
                    <div className="input_container">
                        <label htmlFor="region">Realm:</label>
                        <input 
                        type="search" 
                        name="realm-search" 
                        id="realm-search"
                        list="realms-list"
                        />
                        <datalist id="realms-list">
                            {realms.map((realm) => (
                                <option key={realm.realmId} value={`${realm.name} - ${realm.realmId}`} />
                            ))}
                        </datalist>                        
                    </div>
                )
            }

            {/* {
                regions && selectedRegion && selectedRealm && (
                    <div className="input_container">
                        <label htmlFor="auctionHouse">Auction House:</label>
                        <select name="auctionHouse" id="auctionHouse" onChange={(e) => handleAuctionHouseIdChange(e.target.value)}>
                            <option value="" disabled selected>{dictionary && dictionary['selectAuctionHouse']}</option>
                            {
                            selectedRealm && selectedRealm.auctionHouses.map((auctionHouse) => {
                                return <option key={`auctionHouse-${auctionHouse.auctionHouseId}`} value={auctionHouse.auctionHouseId}>{auctionHouse.type}</option>
                            })
                            }
                        </select>
                    </div>
                )
            }

            {
                regions && selectedRegion && selectedRealm && selectedAuctionHouse && (
                    <button type="submit">{dictionary['save']}</button>
                )
            } */}
        </form>
    );
};

export default SearchSettings;