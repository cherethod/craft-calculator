import { useState } from "react";
import axios from "axios";

const useAuth = () => { 
    const [accessToken, setAccessToken] = useState('');
    const [tokenExpiresAt, setTokenExpiresAt] = useState(0);

    const getAuthToken = async () => {
        const currentTime = Math.floor(Date.now() / 1000);

        if (!accessToken || currentTime >= tokenExpiresAt) {
            try {
                const response = await axios.post(
                    'https://auth.tradeskillmaster.com/oauth2/token',
                    {
                        client_id: 'c260f00d-1071-409a-992f-dda2e5498536',
                        grant_type: 'api_token',
                        scope: 'app:realm-api app:pricing-api',
                        token: 'aa8e585e-7464-480e-afc7-c97657dff57e'
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        timeout: 10000
                    }
                );

                setAccessToken(response.data.access_token);
                setTokenExpiresAt(currentTime + response.data.expires_in);
                return response.data.access_token; // Return the new token directly
            } catch (error) {
                console.error('Error authenticating:', error);
                throw new Error('Error authenticating with the TradeSkillMaster API');
            }
        }

        return accessToken; // If the token is valid, return it
    };

    return { accessToken, getAuthToken };
};

export default useAuth;
