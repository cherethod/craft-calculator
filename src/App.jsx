import { useContext, useState } from 'react'
import './App.css'
import SideBar from './components/SideBar'
import { ItemContext } from './context/ItemContext';
import SearchSettings from './components/SearchSettings';

function App() {
  const {selectedRegion, selectedRealm, selectedAuctionHouse} = useContext(ItemContext);



  return (
    <>
    <SideBar />
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
