const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // Para parsear JSON en el body de la solicitud

// Endpoint para autenticación

app.post('/api/auth', async (req, res) => {
    try {
      const response = await axios.post('https://auth.tradeskillmaster.com/oauth2/token', {
        client_id: 'c260f00d-1071-409a-992f-dda2e5498536',
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

// Puedes agregar aquí otros endpoints para obtener precios o información adicional de TradeSkillMaster

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Servidor corriendo en el puerto ${PORT}`);
});
