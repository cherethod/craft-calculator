import { useState } from "react";
import axios from "axios";

const useAuth = () => {
    const [accessToken, setAccessToken] = useState('');
    const [tokenExpiresAt, setTokenExpiresAt] = useState(0);

    const getAuthToken = async () => {
        const currentTime = Math.floor(Date.now() / 1000);

        if (!accessToken || currentTime >= tokenExpiresAt) {
            try {
                const response = await axios.post('/api/auth'); // Vercel endpoint
                const { access_token, expires_at } = response.data;

                setAccessToken(access_token);
                setTokenExpiresAt(expires_at);

                console.log('Token de acceso obtenido:', access_token);
                return access_token;
            } catch (error) {
                console.error("Error al obtener el token de autenticación:", error);
                throw new Error("Error en la autenticación con TradeSkillMaster");
            }
        }

        return accessToken;
    };

    return { accessToken, tokenExpiresAt, getAuthToken };
};

export default useAuth;
