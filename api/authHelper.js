import axios from 'axios';

let accessToken = null;
let tokenExpiresAt = 0;

export async function getAccessToken() {
   const currentTime = Math.floor(Date.now() / 1000);

   // Si el token no existe o ha expirado, obtén uno nuevo
   if (!accessToken || currentTime >= tokenExpiresAt) {
      try {
         const response = await axios.post('https://auth.tradeskillmaster.com/oauth2/token', {
            client_id: 'c260f00d-1071-409a-992f-dda2e5498536',
            grant_type: 'api_token',
            scope: 'app:realm-api app:pricing-api',
            token: 'aa8e585e-7464-480e-afc7-c97657dff57e'
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