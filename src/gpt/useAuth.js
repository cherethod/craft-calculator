import { useEffect, useState } from "react";

const useAuth = () => {
    const [token, setToken] = useState('');
    const [expiresAt, setExpiresAt] = useState(0);

    const saveToken = (token, expiresAt) => {
        localStorage.setItem('access_token', token);
        localStorage.setItem('expires_at', expiresAt);
        setToken(token);
        setExpiresAt(expiresAt);
    };

    const getAuth = async () => {
        try {
        const res = await fetch('http://localhost:5000/api/auth', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        console.log('Nuevo token obtenido: ',data.access_token);
        saveToken(data.access_token, data.expires_at);
        } catch (error) {
        console.error('Error:', error);
        }
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('access_token');
        const storedExpiresAt = localStorage.getItem('expires_at');
    
        if (storedToken && storedExpiresAt > Date.now() / 1000) {
          setToken(storedToken);
          setExpiresAt(storedExpiresAt);
          console.log('Token cargado desde localstorage: ', storedToken);
        } else {
          getAuth();
        }
          
      }, []);

    return { token, expiresAt, getAuth };
};

export default useAuth;