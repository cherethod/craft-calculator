const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let accessToken = ''; // Token de acceso actual
let tokenExpiresAt = 0; // Tiempo de expiración en formato epoch (segundos)

// Función para verificar y actualizar el token si es necesario
const checkAuth = async () => {
  const currentTime = Math.floor(Date.now() / 1000);

  // Si el token ha expirado o no está definido, obtenemos uno nuevo
  if (!accessToken || currentTime >= tokenExpiresAt) {
    try {
      const response = await axios.post('https://auth.tradeskillmaster.com/oauth2/token', {
        client_id: 'c260f00d-1071-409a-992f-dda2e5498536',
        grant_type: 'api_token',
        scope: 'app:realm-api app:pricing-api',
        token: 'aa8e585e-7464-480e-afc7-c97657dff57e'
      });

      accessToken = response.data.access_token;
      tokenExpiresAt = Math.floor(Date.now() / 1000) + response.data.expires_in;  // Calcula cuándo expira
    } catch (error) {
      console.error('Error al autenticar:', error);
      throw new Error('Error al autenticar con la API de TradeSkillMaster');
    }
  }
};

// Ruta para manejar la solicitud de autenticación
app.post('/api/auth', async (req, res) => {
  try {
    const response = await axios.post('https://auth.tradeskillmaster.com/oauth2/token', {
      client_id: 'c260f00d-1071-409a-992f-dda2e5498536',
      grant_type: 'api_token',
      scope: 'app:realm-api app:pricing-api',
      token: 'aa8e585e-7464-480e-afc7-c97657dff57e'
    });

    accessToken = response.data.access_token;  
    tokenExpiresAt = Math.floor(Date.now() / 1000) + response.data.expires_in;  // Calcula cuándo expira

    res.json({
      access_token: accessToken,
      expires_at: tokenExpiresAt  // Envía también el tiempo de expiración
    });
  } catch (error) {
    console.error('Error al autenticar:', error);
    res.status(500).json({ message: 'Error al autenticar con la API de TradeSkillMaster' });
  }
});

// Ruta para obtener los precios de subasta de un ítem
app.get('/api/auction-prices/:auctionHouseId/:itemId', async (req, res) => {
  const { itemId } = req.params;  

  try {
    const currentTime = Math.floor(Date.now() / 1000);

    // Verifica si el token ha expirado
    if (!accessToken || currentTime >= tokenExpiresAt) {
      return res.status(401).json({ message: 'Token inválido o expirado. Necesita autenticarse nuevamente.' });
    }

    // Hacer la solicitud a la API de TradeSkillMaster usando el token
    const response = await axios.get(`https://pricing-api.tradeskillmaster.com/ah/${auctionHouseId}/item/${itemId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    res.json(response.data);  // Envía los datos de precios al frontend
  } catch (error) {
    console.error('Error al obtener los precios:', error);

    if (error.response && error.response.status === 401) {
      // El token ha expirado o no es válido
      return res.status(401).json({ message: 'Token inválido o expirado. Necesita autenticarse nuevamente.' });
    }

    res.status(500).json({ message: 'Error al obtener precios de la API de TradeSkillMaster' });
  }
});


// Ruta para obtener las regiones
app.get('/api/realms', async (req, res) => {
  try {
    await checkAuth();  // Verifica el token antes de hacer la solicitud

    const response = await axios.get('https://realm-api.tradeskillmaster.com/realms', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    res.json(response.data);  // Enviar las regiones al frontend
    // console.log('Reinos:', response.data);
    
  } catch (error) {
    console.error('Error al obtener las reinos:', error);
    res.status(500).json({ message: 'Error al obtener las reinos de la API de TradeSkillMaster' });
  }
});


// Ruta para obtener reinos de una región específica
app.get('/api/region/:regionId', async (req, res) => {
  const { regionId } = req.params;

  try {
    await checkAuth();  // Verifica el token antes de hacer la solicitud

    const response = await axios.get(`https://realm-api.tradeskillmaster.com/regions/${regionId}/realms`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    res.json(response.data);  // Enviar los reinos al frontend
  } catch (error) {
    console.error('Error al obtener los reinos:', error);
    res.status(500).json({ message: 'Error al obtener los reinos de la API de TradeSkillMaster' });
  }
});

// Ruta para obtener info de un reino específico
app.get('/api/realms/:realmId', async (req, res) => {
  const { realmId } = req.params;

  try {
    await checkAuth();  // Verifica el token antes de hacer la solicitud

    const response = await axios.get(`https://realm-api.tradeskillmaster.com/realms/${realmId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    res.json(response.data);  // Enviar los reinos al frontend
  } catch (error) {
    console.error('Error al obtener los reinos:', error);
    res.status(500).json({ message: 'Error al obtener los reinos de la API de TradeSkillMaster' });
  }
});

// Ruta para obtener las id de las casas de subastas de un reino
app.get('/api/auctionhouse/:regionId/:realmId', async (req, res) => {
  const { regionId, realmId } = req.params;

  try {
    const response = await axios.get(`https://pricing-api.tradeskillmaster.com/ah/${regionId}/realms/${realmId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener la ID de la casa de subastas:', error);
    res.status(500).json({ message: 'Error al obtener la casa de subastas' });
  }
});

app.get('/api/auction-houses/:auctionHouseId', async (req, res) => {
  const { auctionHouseId } = req.params;

  try {
    await checkAuth();  // Verifica el token antes de hacer la solicitud

    const response = await axios.get(`https://pricing-api.tradeskillmaster.com/ah/${auctionHouseId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    res.json(response.data);  // Enviar los reinos al frontend
  } catch (error) {
    console.error('Error al obtener la casa de subastas:', error);
    res.status(500).json({ message: 'Error al obtener la casa de subastas de la API de TradeSkillMaster' });
  }
});

// Iniciar el servidor
app.listen(5000, () => {
  console.log('Servidor intermedio corriendo en http://localhost:5000');
});