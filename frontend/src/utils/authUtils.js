import { createContext, useContext, useState, useEffect } from "react";
import userService from "../services/userService"; // API để request token

// Tạo Context
const AuthContext = createContext();

// Hook để dùng AuthContext
export const useAuth = () => useContext(AuthContext);

let setAccessTokenGlobal = () => {}; // ✅ Biến toàn cục để lưu hàm cập nhật token

// Provider để bao bọc toàn bộ App
export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // ✅ Thêm trạng thái load

    useEffect(() => {
        const checkToken = async () => {
            try {
                const res = await userService.requesttoken();
                if (res && res.accessToken) {
                    setAccessToken(res.accessToken);
                    console.log("Access Token cập nhật:", res.accessToken);
                }
            } catch (error) {
                console.error("Lỗi khi kiểm tra token:", error);
                setAccessToken(null);
            }
            finally {
                setIsLoading(false); // ✅ Đảm bảo cập nhật trạng thái
            }
        };
        checkToken();
    }, []);

    setAccessTokenGlobal = (token) => {
        setAccessToken(token); 
    };

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken ,isLoading }}>
            {!isLoading ? children : <div>Loading...</div>} 
        </AuthContext.Provider>
    );
};

export const setAccessTokenUtil = (token) => {
    setAccessTokenGlobal(token);
};
