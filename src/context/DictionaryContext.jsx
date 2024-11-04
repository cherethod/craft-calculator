import { createContext, useContext, useEffect, useState } from 'react';
import es_dic from '../locales/es.json';
import en_dic from '../locales/en.json';

const DictionaryContext = createContext();

export const DictionaryProvider = ({ children }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('es');
    const [dictionary, setDictionary] = useState(es_dic);

    useEffect(() => {
        setDictionary(selectedLanguage === 'es' ? es_dic : en_dic);
    }, [selectedLanguage]);

    const handleLanguageChange = (lang) => setSelectedLanguage(lang);

    return (
        <DictionaryContext.Provider value={{ selectedLanguage, dictionary, handleLanguageChange }}>
            {children}
        </DictionaryContext.Provider>
    );
};

export const useDictionary = () => useContext(DictionaryContext);
