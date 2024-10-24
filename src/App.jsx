import { useEffect, useState } from 'react'
import './App.css'
import useAuth from './hooks/useAuth';
import RecipeComponent from './components/RecipeComponent';
import PriceFixer from './components/PriceFixer';

function App() {
  const [toolActive, setToolActive] = useState(false);
  const { token, getAuth } = useAuth();
  const [realms, setRealms] = useState();
  const [realmId, setRealmId] = useState('');
  const [auctionHouseId, setAuctionHouseId] = useState('');
  const [auctionPrices, setAuctionPrices] = useState([]);
  const [itemPrice, setItemPrice] = useState(null);

  // Obtener las regiones
  const getAllRealms = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/realms');
      const data = await res.json();
      console.log('Regiones:', data);
      
      // setRealms(data);
      // Asignar la región de Europa como ejemplo
      // const europe = data.find(region => region.name === 'Europe');
      // setRegionId(europe.id);
    } catch (error) {
      console.error('Error al obtener las regiones desde APP:', error);
    }
  };

    // Obtener los reinos de la región seleccionada
    const getRegionRealms = async (regionId) => {
      try {
        const res = await fetch(`http://localhost:5000/api/region/${regionId}`);
        const data = await res.json();
        // Verificar si la respuesta es un array antes de actualizar el estado
      if (Array.isArray(data.items)) {
        setRealms([...data.items]);
      } else {
        console.error('Respuesta inesperada al obtener reinos:', data);
        setRealms([]);
      }
  
        // Asignar un reino de ejemplo, como Mandokir
        // const mandokir = Object.values(data).find(realm => realm.name === 'Mandokir');

        // const mandokir = data.find(realm => realm.name === 'Mandokir');
      // console.log('Mandokir realms:', mandokir.realmId);

      
        // setRealmId(mandokir.id);
        // setAuctionHouseId(mandokir.auctionHouseId);
      } catch (error) {
        console.error('Error al obtener los reinos:', error);
      }
    };

  // Obtener los reinos de la región seleccionada
  const getRealmInfo = async (realmId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/realms/${realmId}`);
      const data = await res.json();
      console.log('Reinos de la región:', data);

      // Asignar un reino de ejemplo, como Mandokir
      // const mandokir = data.find(realm => realm.name === 'Mandokir');
      // setRealmId(mandokir.id);
      // setAuctionHouseId(mandokir.auctionHouseId);
    } catch (error) {
      console.error('Error al obtener los reinos:', error);
    }
  };

  const getAuctionHouseInfo = async (auctionHouseId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/auction-houses/${auctionHouseId}`);
      const data = await res.json();
      setAuctionPrices(data);
      // console.log('Información de la casa de subastas:', data);
    } catch (error) {
      console.error('Error al obtener la información de la casa de subastas:', error);
    }
  };

  const getAuctionPrices = async (auctionHouseId, itemId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/auction-prices/${auctionHouseId}/${itemId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`  // Incluye el token en la cabecera
        }
      });
  
      if (res.status === 401) {
        console.log('Token expirado, reautenticando...');
        await getAuth();  // Vuelve a autenticar si es necesario
        return;  // Sal de la función hasta que el token esté actualizado
      }
  
      const data = await res.json();
      console.log('Precios de subastas para el ítem:', data);
    } catch (error) {
      console.error('Error al obtener los precios:', error);
    }
  };
 
  useEffect(() => {
    if (token && !realms) {
      // Primero obtenemos las regiones
      getAllRealms();
      getRegionRealms(14)
    }
  }, [token]);


  useEffect(() => {
    if (realms) {

    const mandokirRealms = Object.values(realms).filter(realm => realm.name === 'Mandokir');
    // console.log('Mandokir realms:', mandokirRealms[0].auctionHouses[1].auctionHouseId);
    setAuctionHouseId(mandokirRealms[0].auctionHouses[1].auctionHouseId);

      // // Vamos a iterar todos los reinos para buscar todos los reinos con nombre "Mandokir"
      // const mandokirRealms = realms.filter(realm => realm.name === 'Mandokir');
      // console.log('Mandokir realms:', mandokirRealms);
      

    }
  }, [realms]);
  useEffect(() => {
    if (auctionHouseId) {
      // getAuctionPrices(auctionHouseId, 52988);
      getAuctionHouseInfo(auctionHouseId);
      // Una vez que tenemos la región, obtenemos los reinos
    }
  }, [auctionHouseId]);
  
  useEffect(() => {
    if (auctionPrices) {

      // console.log('Precios de subastas:', auctionPrices);
      const item = Object.values(auctionPrices).find(item => item.id === 52988);
      console.log('Item:', item);
      
      
      // getAuctionPrices(52988);  // Hacer la solicitud solo si ya tenemos el token
    }
  }, [auctionPrices]);

  return (
    <>
      <h1>Craft Profit Calculator</h1>
      {
        toolActive && (
          <button className='btn back-btn' onClick={() => setToolActive(false)}>↩ Turn back</button>
        )
      }
      {
        !toolActive && (
          <div className='tools-btns'>
            <button className='btn' onClick={() => setToolActive('recipe-creator')}>Create New Recipe</button>
            <button className='btn' onClick={() => setToolActive('price-fixer')}>Price Fixer</button>
          </div>
        )
      }
      {
        toolActive == 'recipe-creator' && <RecipeComponent />
      }
      {
        toolActive == 'price-fixer' && <PriceFixer />}
    </>
  )
}

export default App
