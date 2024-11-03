import { useContext, useState } from 'react'
import './App.css'
import SideBar from './components/SideBar'
import { ItemContext } from './context/ItemContext';
import SearchSettings from './components/SearchSettings';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('es')
  const {selectedRegion, selectedRealm, selectedAuctionHouse} = useContext(ItemContext);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang)
  }


  return (
    <>
    <SideBar selectedLanguage={selectedLanguage} handleLanguageChange={handleLanguageChange} />
    <main>
      {
        !selectedRegion && !selectedRealm && !selectedAuctionHouse ? (
          <SearchSettings />
        ) : (
          <h1>Region: {selectedRegion}, Realm: {selectedRealm}, Auction House: {selectedAuctionHouse}</h1>
        )
      }
      <img src="./goblin-decoration.png" alt="" />
    </main>
    </>
  )
}

export default App
