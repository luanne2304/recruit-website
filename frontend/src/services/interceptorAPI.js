import axios from "axios";
import { useAuth,setAccessTokenUtil } from "../utils/authUtils" 

const api = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true, // Để gửi cookie refreshToken
});

api.interceptors.response.use(
     (response) => {
        // Kiểm tra nếu token mới được gửi trong response header
    
        const newAccessToken =  response.headers['authorization'];
        if (newAccessToken) {
            const token = newAccessToken.split(' ')[1];
            setAccessTokenUtil(token);
        }
        return response;
    },
    (error) => {
       
        return Promise.reject(error);
    }

);

export default api;
