import axios from 'axios';

let accessToken = null;
let tokenExpiresAt = 0;

export async function getAccessToken() {
   const currentTime = Math.floor(Date.now() / 1000);

   // Si el token no existe o ha expirado, obtén uno nuevo
   if (!accessToken || currentTime >= tokenExpiresAt) {
      try {
         const response = await axios.post('https://auth.tradeskillmaster.com/oauth2/token', {
            client_id: process.env.API_CLIENT_ID,
            grant_type: 'api_token',
            scope: 'app:realm-api app:pricing-api',
            token: process.env.API_TOKEN
         });
         accessToken = response.data.access_token;
         tokenExpiresAt = currentTime + response.data.expires_in;
      } catch (error) {
         console.error('Error authenticating:', error);
         throw new Error('Authentication failed');
      }
   }

   return accessToken;
}