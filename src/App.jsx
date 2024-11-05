import { useEffect } from 'react';
import './App.css';
import SideBar from './components/SideBar';
import SearchSettings from './components/SearchSettings';
import { useAPI } from './context/APIContext';

function App() {
  const { selectedRegion, selectedRealm, selectedAuctionHouse, selectedMode } = useAPI();
  
  useEffect(() => {
    console.log('App.jsx selectedMode:', selectedMode);
  }, [selectedMode]);

  return (
    <>
      <SideBar />
      <main>
        {(!selectedRegion || !selectedRealm || !selectedAuctionHouse || selectedMode === "search_settings")
          ? (<SearchSettings />)
          : (<h1>Region: {selectedRegion}, Realm: {selectedRealm}, Auction House: {selectedAuctionHouse}</h1>)
        }
        <img src="./goblin-decoration.png" alt="" />
      </main>
    </>
  );
}

export default App;
