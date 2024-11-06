import axios from 'axios';

let accessToken = null;
let tokenExpiresAt = 0;

export default async function handler(req, res) {
   if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método no permitido' });
   }

   const currentTime = Math.floor(Date.now() / 1000);
   const client_id = process.env.API_CLIENT_ID;
   const token = process.env.API_TOKEN;

   if (!accessToken || currentTime >= tokenExpiresAt) {
      try {
         console.log('Obteniendo nuevo token...');
         const response = await axios.post('https://auth.tradeskillmaster.com/oauth2/token', {
            client_id,
            grant_type: 'api_token',
            scope: 'app:realm-api app:pricing-api',
            token,
         });

         accessToken = response.data.access_token;
         tokenExpiresAt = currentTime + response.data.expires_at;
         console.log('Respuesta completa:', response.data);
         console.log('Token de acceso:', accessToken);
         console.log('Expira en:', tokenExpiresAt);
      } catch (error) {
         console.error('Error al autenticar:', error.response ? error.response.data : error.message);
         return res.status(500).json({ message: 'Error al autenticar con TradeSkillMaster' });
      }
   }

   res.json({ access_token: accessToken, expires_at: tokenExpiresAt });
}
