import useAPI from "../hooks/useAPI";
import useDictionary from "../hooks/useDictionary";

const SearchSettings = () => {
    // const {selectedRegion, realm, auctionHouseId, handleRegionChange, handleRealmChange, handleAuctionHouseIdChange} = useContext(ItemContext);
    const {regions} = useAPI();
    const dictionary = useDictionary();

    return (
        <form className="search_settings">
            <div className="input_container">
                {/* <label htmlFor="region">{dictionary['region']}</label> */}
                <select name="region" id="region">
                    {
                        dictionary && <option value="" disabled>{dictionary['selectRegion']}</option>                        
                    }
                </select>
            </div>
        </form>
    );
};

export default SearchSettings;