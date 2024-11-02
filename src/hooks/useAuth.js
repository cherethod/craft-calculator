import { useState } from "react";
import axios from "axios";

const useAuth = () => { 
    const [accessToken, setAccessToken] = useState('');
    const [tokenExpiresAt, setTokenExpiresAt] = useState(0);

    const getAuthToken = async () => {
        const currentTime = Math.floor(Date.now() / 1000);

        if (!accessToken || currentTime >= tokenExpiresAt) {
            try {
                const response = await axios.post('/api/auth'); // Aquí usamos el endpoint intermedio
                setAccessToken(response.data.access_token);
                return response.data.access_token;
             } catch (error) {
                console.error("Error al obtener el token de autenticación:", error);
                throw new Error("Error al autenticar con la API de TradeSkillMaster");
             }
        }

        return accessToken; // If the token is valid, return it
    };

    return { accessToken, getAuthToken };
};

export default useAuth;
