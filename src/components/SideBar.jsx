import { useContext, useEffect, useState } from "react";
import { ItemContext } from "../context/ItemContext";
import es_dic from '../locales/es.json';
import en_dic from '../locales/en.json';

const SideBar = ({selectedLanguage, handleLanguageChange}) => {
    const {items} = useContext(ItemContext);
    const [dictionary, setDictionary] = useState(null);

    useEffect(() => {
        if (selectedLanguage) {
            setDictionary(selectedLanguage === 'es' ? es_dic : en_dic);
        }
    }, [selectedLanguage]);

    return (
        <aside>
            <div className="language_selector">
                <span onClick={() => handleLanguageChange('es')} className={selectedLanguage === 'es' ? 'selected' : ''}>🇪🇸</span>
                <span onClick={() => handleLanguageChange('en')} className={selectedLanguage === 'en' ? 'selected' : ''}>🇬🇧</span>
            </div>
           <div className="search_container">
            <label htmlFor="item-search">{dictionary && dictionary["searchItem"]}</label>
           <input 
                type="search" 
                name="item-search" 
                id="item-search" 
                list="items-list"
            />
            <datalist id="items-list">
                {Object.values(items).map((item) => (
                    <option key={item.id} value={selectedLanguage == 'es' ? item.name[1] : item.name[0]} />
                ))}
            </datalist>
           </div>
            <ul>
                <li><a href="#">{dictionary && dictionary["prices"]}</a></li>
                <li><a href="#">{dictionary && dictionary["craftProfit"]}</a></li>
                <li><a href="#">{dictionary && dictionary["justiceVendor"]}</a></li>
            </ul>
        </aside>
    )
}

export default SideBar;