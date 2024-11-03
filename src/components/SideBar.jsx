import { useContext, useEffect, useState } from "react";
import { ItemContext } from "../context/ItemContext";
import useDictionary from "../hooks/useDictionary";

const SideBar = () => {
    const {items} = useContext(ItemContext);
    const {selectedLanguage, handleLanguageChange, dictionary} = useDictionary();
  

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