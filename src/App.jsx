import { useEffect } from 'react';
import './App.css';
import SideBar from './components/SideBar';
import SearchSettings from './components/SearchSettings';
import { useAPI } from './context/APIContext';
import Prices from './components/Prices';

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
          && (<SearchSettings />)
        }
        {
          selectedRegion && selectedRealm && selectedAuctionHouse && selectedMode === "prices" && (
            <Prices />
          )          
        }

        <img className='home-bg-image' src="./goblin-decoration.png" alt="" />
      </main>
    </>
  );
}

export default App;
