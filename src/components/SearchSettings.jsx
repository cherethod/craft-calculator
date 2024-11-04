import { useDictionary } from "../context/DictionaryContext";
import useAPI from "../hooks/useAPI";

const SearchSettings = () => {
    
    const { regions, realms, auctionHouses, selectedRegion, selectedRealm, selectedAuctionHouse, handleRegionChange, handleRealmChange, handleAuctionHouseIdChange, handleSubmitSearchSettings, handleStoreSettings } = useAPI();
    const { dictionary } = useDictionary();

    const getRealmNameById = (realmId) => {
        if (!selectedRegion || !selectedRealm) return;
         return Object.entries(regions).find((region) => region[1].regionId == selectedRegion)[1].realms
        .find((realm) => realm.realmId == realmId).name;
        
        // const realm = regions[selectedRegion].find(realm => realm.realmId === realmId);
        // return realm ? realm.name : "";
    };

    return (
        <form className="search_settings" onSubmit={handleSubmitSearchSettings}>
            <div className="input_container">
                <label htmlFor="region">{dictionary && dictionary["region"]}</label>
                <select 
                    name="region" 
                    id="region" 
                    value={selectedRegion || ""}
                    onChange={(e) => handleRegionChange(Number(e.target.value))}
                >
                     <option value="" disabled selected>{dictionary['selectRegion']}</option>
                    {
                      regions && regions.map((region) => {
                        return <option key={`region-${region.regionId}`} value={region.regionId}>[{region.regionPrefix.toUpperCase()}] - {region.name} ({region.gameVersion}) {region.regionId}</option>
                      })
                    }
                </select>
            </div>
            {
                regions && selectedRegion && realms && (
                    <div className="input_container">
                        <label htmlFor="region">{dictionary["realm"]}</label>
                        <input 
                            type="search" 
                            name="realm-search" 
                            id="realm-search"
                            list="realms-list"
                            placeholder={getRealmNameById(selectedRealm) || dictionary["searchRealm"]}
                            // value={getRealmNameById(selectedRealm) || ""}
                            onChange={(e) => handleRealmChange(e.target.value)} // Pasamos solo el nombre del reino
                        />
                        <datalist id="realms-list">
                            {Object.entries(realms).map(([key, realm]) => (
                                <option key={`realmSelection-${key}`} value={realm.name}>{realm.name}</option>
                            ))}
                        </datalist>                        
                    </div>
                )
            }
            {
                selectedRegion && selectedRealm && auctionHouses && (
                    <div className="input_container">
                        <label htmlFor="auctionHouse">{dictionary["auctionHouse"]}</label>
                        <select 
                            name="auctionHouse" 
                            id="auctionHouse" 
                            value={selectedAuctionHouse || ""}
                            onChange={(e) => handleAuctionHouseIdChange(Number(e.target.value))}
                        >
                            <option value="" disabled selected>{dictionary['selectAuctionHouse']}</option>
                            {
                            auctionHouses && auctionHouses.map((auctionHouse) => {
                                return <option key={`auctionHouse-${auctionHouse.auctionHouseId}`} value={auctionHouse.auctionHouseId}>{auctionHouse.type}</option>
                            })
                            }
                        </select>
                    </div>
                )
            }

            {
                selectedRegion && selectedRealm && selectedAuctionHouse && (
                    <button type="submit" className="save-btn" onClick={handleStoreSettings}>{dictionary["save"]}</button>
                )
            }

        </form>
    );
};

export default SearchSettings;