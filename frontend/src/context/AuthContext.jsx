import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(() => {
        const storedUser = localStorage.getItem('chat-user');
        console.log(storedUser);
        return storedUser ? JSON.parse(storedUser) : null;

    });

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
