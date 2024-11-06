// /api/realms.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { accessToken } = req.headers;
        console.log('Token de acceso:', accessToken);
        
        if (!accessToken) {
            return res.status(400).json({ message: 'Access token is required' });
        }

        try {
            const response = await axios.get('https://realm-api.tradeskillmaster.com/realms', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            console.log('Respuesta completa:', response.data);
            res.json(response.data); // Enviamos los datos de los reinos al frontend
            
        } catch (error) {
            console.error('Error fetching realms:', error);
            res.status(500).json({ message: 'Error fetching realms from the TradeSkillMaster API' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
