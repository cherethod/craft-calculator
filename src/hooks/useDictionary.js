import es_dic from '../locales/es.json';
import en_dic from '../locales/en.json';
import { useEffect, useState } from 'react';

const useDictionary = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('es')
    const [dictionary, setDictionary] = useState(null);

    useEffect(() => {
        if (selectedLanguage) {
            setDictionary(selectedLanguage === 'es' ? es_dic : en_dic);
        }
    }, [selectedLanguage]);
    
    const handleLanguageChange = (lang) => {
        setSelectedLanguage(lang)
      }

    return {selectedLanguage, handleLanguageChange, dictionary};
}

export default useDictionary;
