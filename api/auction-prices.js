// /api/auction-prices.js
import axios from 'axios';
import { getAccessToken } from './auth';

export default async function handler(req, res) {
   if (req.method === 'GET') {
      const { auctionHouseId, itemId } = req.query;

      try {
         // Obtener el token de acceso centralizado
         const accessToken = await getAccessToken();

         // Hacer la solicitud a la API con el token
         const response = await axios.get(`https://pricing-api.tradeskillmaster.com/ah/${auctionHouseId}/item/${itemId}`, {
            headers: {
               'Authorization': `Bearer ${accessToken}`
            }
         });

         res.status(200).json(response.data);  // Responder con los datos de la API
      } catch (error) {
         console.error('Error fetching prices:', error);

         // Responder con un mensaje específico si el token falla o cualquier otro error
         const status = error.response ? error.response.status : 500;
         res.status(status).json({
            message: error.message || 'Error fetching prices from the TradeSkillMaster API'
         });
      }
   } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
   }
}
