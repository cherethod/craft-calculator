import { useState } from 'react'
import './App.css'
import SideBar from './components/SideBar'
import SearchSettings from './components/SearchSettings';
import useAPI from './hooks/useAPI';

function App() {
  const {selectedRegion, selectedRealm, selectedAuctionHouse} = useAPI();
  const [selectedMode, setSelectedMode] = useState('default');

  const handleSelectMode = (mode) => {
    setSelectedMode(mode);
  }

  return (
    <>
    <SideBar handleSelectMode={handleSelectMode} />
    <main>
      {
        !selectedRegion && !selectedRealm && !selectedAuctionHouse || selectedMode === "search_settings" ? (
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
