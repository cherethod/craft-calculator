const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let accessToken = ''; // Current access token
let tokenExpiresAt = 0; // Expiration time in epoch format (seconds)

// Function to check and update the token if necessary
const checkAuth = async () => {
  const currentTime = Math.floor(Date.now() / 1000);

  // If the token has expired or is not defined, get a new one
  if (!accessToken || currentTime >= tokenExpiresAt) {
    try {
      const response = await axios.post('https://auth.tradeskillmaster.com/oauth2/token', {
        client_id: API_CLIENT_ID,
        grant_type: 'api_token',
        scope: 'app:realm-api app:pricing-api',
        token: 'aa8e585e-7464-480e-afc7-c97657dff57e'
      });

      accessToken = response.data.access_token;
      tokenExpiresAt = Math.floor(Date.now() / 1000) + response.data.expires_in;  // Calculate expiration time
    } catch (error) {
      console.error('Error authenticating:', error);
      throw new Error('Error authenticating with the TradeSkillMaster API');
    }
  }
};

// Route to handle authentication requests
app.post('/api/auth', async (req, res) => {
  try {
    const response = await axios.post('https://auth.tradeskillmaster.com/oauth2/token', {
      client_id: API_CLIENT_ID,,
      grant_type: 'api_token',
      scope: 'app:realm-api app:pricing-api',
      token: 'aa8e585e-7464-480e-afc7-c97657dff57e'
    });

    accessToken = response.data.access_token;  
    tokenExpiresAt = Math.floor(Date.now() / 1000) + response.data.expires_in;  // Calculate expiration time

    res.json({
      access_token: accessToken,
      expires_at: tokenExpiresAt  // Also send the expiration time
    });
  } catch (error) {
    console.error('Error authenticating:', error);
    res.status(500).json({ message: 'Error authenticating with the TradeSkillMaster API' });
  }
});

// Route to get auction prices for an item
app.get('/api/auction-prices/:auctionHouseId/:itemId', async (req, res) => {
  const  {auctionHouseId, itemId } = req.params;  

  try {
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if the token has expired
    if (!accessToken || currentTime >= tokenExpiresAt) {
      return res.status(401).json({ message: 'Invalid or expired token. Please authenticate again.' });
    }

    // Make the request to the TradeSkillMaster API using the token
    const response = await axios.get(`https://pricing-api.tradeskillmaster.com/ah/${auctionHouseId}/item/${itemId}`, {
      // const response = await axios.get(`https://pricing-api.tradeskillmaster.com/ah/${auctionHouseId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    res.json(response.data);  // Send price data to the frontend
  } catch (error) {
    console.error('Error fetching prices:', error);

    if (error.response && error.response.status === 401) {
      // The token has expired or is invalid
      return res.status(401).json({ message: 'Invalid or expired token. Please authenticate again.' });
    }

    res.status(500).json({ message: 'Error fetching prices from the TradeSkillMaster API' });
  }
});

// Route to get regions
app.get('/api/realms', async (req, res) => {
  try {
    await checkAuth();  // Check the token before making the request

    const response = await axios.get('https://realm-api.tradeskillmaster.com/realms', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    res.json(response.data);  // Send the regions to the frontend
    
  } catch (error) {
    console.error('Error fetching realms:', error);
    res.status(500).json({ message: 'Error fetching realms from the TradeSkillMaster API' });
  }
});

// Route to get realms of a specific region
app.get('/api/region/:regionId', async (req, res) => {
  const { regionId } = req.params;

  try {
    await checkAuth();  // Check the token before making the request

    const response = await axios.get(`https://realm-api.tradeskillmaster.com/regions/${regionId}/realms`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    res.json(response.data);  // Send the realms to the frontend
  } catch (error) {
    console.error('Error fetching realms:', error);
    res.status(500).json({ message: 'Error fetching realms from the TradeSkillMaster API' });
  }
});

// Route to get info of a specific realm
app.get('/api/realms/:realmId', async (req, res) => {
  const { realmId } = req.params;

  try {
    await checkAuth();  // Check the token before making the request

    const response = await axios.get(`https://realm-api.tradeskillmaster.com/realms/${realmId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    res.json(response.data);  // Send the realm data to the frontend
  } catch (error) {
    console.error('Error fetching realms:', error);
    res.status(500).json({ message: 'Error fetching realm data from the TradeSkillMaster API' });
  }
});

// Route to get auction house IDs of a realm
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
    console.error('Error fetching auction house ID:', error);
    res.status(500).json({ message: 'Error fetching auction house data' });
  }
});

// Route to get auction house info by ID
app.get('/api/auction-houses/:auctionHouseId', async (req, res) => {
  const { auctionHouseId } = req.params;

  try {
    await checkAuth();  // Check the token before making the request

    const response = await axios.get(`https://pricing-api.tradeskillmaster.com/ah/${auctionHouseId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    res.json(response.data);  // Send auction house data to the frontend
  } catch (error) {
    console.error('Error fetching auction house:', error);
    res.status(500).json({ message: 'Error fetching auction house data from the TradeSkillMaster API' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Proxy server running at http://localhost:5000');
});
