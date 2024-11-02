import axios from 'axios';

export default async function handler(req, res) {
   if (req.method === 'POST') {
      try {
         const response = await axios.post('https://auth.tradeskillmaster.com/oauth2/token', {
            client_id: 'c260f00d-1071-409a-992f-dda2e5498536',
            grant_type: 'api_token',
            scope: 'app:realm-api app:pricing-api',
            token: 'aa8e585e-7464-480e-afc7-c97657dff57e'
         });
         res.status(200).json(response.data);
      } catch (error) {
         console.error("Error en autenticación:", error);
         res.status(500).json({ error: "Error autenticando con la API de TradeSkillMaster" });
      }
   } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
   }
}
