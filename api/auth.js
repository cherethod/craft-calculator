import axios from 'axios';

let accessToken = null;
let tokenExpiresAt = 0;

export async function getAccessToken() {
   const currentTime = Math.floor(Date.now() / 1000);

   // Si el token no existe o ha expirado, obtén uno nuevo
   if (!accessToken || currentTime >= tokenExpiresAt) {
      try {
         const params = new URLSearchParams();
         params.append('client_id', 'c260f00d-1071-409a-992f-dda2e5498536');
         params.append('grant_type', 'api_token');
         params.append('scope', 'app:realm-api app:pricing-api');
         params.append('token', 'aa8e585e-7464-480e-afc7-c97657dff57e');

         const response = await axios.post(
            'https://auth.tradeskillmaster.com/oauth2/token',
            params,
            {
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
               }
            }
         );

         accessToken = response.data.access_token;
         tokenExpiresAt = currentTime + response.data.expires_in;
      } catch (error) {
         console.error('Error authenticating:', error.response ? error.response.data : error.message);
         throw new Error('Authentication failed');
      }
   }

   return accessToken;
}
