import { useContext } from "react";
import { ItemContext } from "../context/ItemContext";
import { useDictionary } from "../context/DictionaryContext";
import settings_icon from '../assets/settings_icon.svg';
import { useAPI } from '../context/APIContext';

const SideBar = () => {
    const { dictionary, selectedLanguage, handleLanguageChange } = useDictionary();
    const { items } = useContext(ItemContext);
    const { selectedAuctionHouse, selectedMode, handleSelectedMode } = useAPI();
    return (
        <aside>
            <div className="language_selector">
                <span onClick={() => handleLanguageChange('es')} className={selectedLanguage === 'es' ? 'selected' : ''}>🇪🇸</span>
                <span onClick={() => handleLanguageChange('en')} className={selectedLanguage === 'en' ? 'selected' : ''}>🇬🇧</span>
            </div>

            <div className="config_search_settings" onClick={() => handleSelectedMode('search_settings')}>
                <img src={settings_icon} alt="settings icon" />        
            </div>

        {
            selectedAuctionHouse && selectedMode === "default" && (
                <div className="search_container">
                    <label htmlFor="item-search">{dictionary && dictionary["searchItem"]}</label>
                    <input 
                        type="search" 
                        name="item-search" 
                        id="item-search" 
                        list="items-list"
                    />
                    <datalist id="items-list">
                    {
                    Object.values(items.reduce((acc, item) => {
                        acc[item.id] = item;
                        return acc;
                    }, {})).map((item) => (
                        <option key={`item-datalist-${item.id}`} value={selectedLanguage === 'es' ? item.name[1] : item.name[0]} />
                    ))
                    }
                    </datalist>
                 </div>
            )
        }
            <ul>
                <li><a href="#">{dictionary && dictionary["prices"]}</a></li>
                <li><a href="#">{dictionary && dictionary["craftProfit"]}</a></li>
                <li><a href="#">{dictionary && dictionary["justiceVendor"]}</a></li>
            </ul>
        </aside>
    )
}

export default SideBar;