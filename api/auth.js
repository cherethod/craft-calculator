import axios from 'axios';

let accessToken = null;
let tokenExpiresAt = 0;
const client_id = process.env.API_CLIENT_ID;
const token = process.env.API_TOKEN;

export async function getAccessToken() {
   const currentTime = Math.floor(Date.now() / 1000);

   if (!accessToken || currentTime >= tokenExpiresAt) {
      try {
         const response = await axios.post('https://auth.tradeskillmaster.com/oauth2/token', {
            client_id,
            grant_type: 'api_token',
            scope: 'app:realm-api app:pricing-api',
            token,
         });
         accessToken = response.data.access_token;
         tokenExpiresAt = currentTime + response.data.expires_in;
         console.log('Access token:', accessToken);
         console.log('Token expires at:', tokenExpiresAt);
         console.log('Client ID:', client_id);
         console.log('Token:', token);         
         
      } catch (error) {
         console.error('Error authenticating:', error);
         throw new Error('Authentication failed');
      }
   }

   return accessToken, tokenExpiresAt, client_id, token;
}