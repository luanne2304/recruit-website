import React, { createContext, useContext, useState } from "react";

// Tạo Context
const AuthContext = createContext();

// Hook giúp các component dễ dàng sử dụng accessToken
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};