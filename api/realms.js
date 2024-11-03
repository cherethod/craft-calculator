// /api/realms.js
import axios from 'axios';
import { getAccessToken } from './auth.js';

export default async function handler(req, res) {
   if (req.method === 'GET') {
      try {
         const accessToken = await getAccessToken();

     
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
   } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
   }
}
