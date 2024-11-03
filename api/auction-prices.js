import axios from 'axios';
import { getAccessToken } from './authHelper';

export default async function handler(req, res) {
   const { auctionHouseId, itemId } = req.query;

   if (req.method === 'GET') {
      try {
         const accessToken = await getAccessToken();
         const response = await axios.get(`https://pricing-api.tradeskillmaster.com/ah/${auctionHouseId}/item/${itemId}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
         });

         res.status(200).json(response.data);
      } catch (error) {
         console.error('Error fetching prices:', error);
         res.status(500).json({ message: 'Error fetching prices' });
      }
   } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
   }
}