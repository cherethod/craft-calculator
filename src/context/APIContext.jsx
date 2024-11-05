import { createContext, useContext } from "react";
import useAPIProvider from "../hooks/useAPIProvider";

const APIContext = createContext();

export const APIProvider = ({ children }) => {
    const api = useAPIProvider();
    return (
        <APIContext.Provider value={api}>
            {children}
        </APIContext.Provider>
    );
};

export const useAPI = () => {
    return useContext(APIContext);
};
