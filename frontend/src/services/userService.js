import cf_axios from "./cf_axios";
import api from "./interceptorAPI";
import axios from "axios";

const userService = {
    login: async (email, password) => {
        const res = await cf_axios.post("/auth/login", { email, password });
        return res.data;
    },
    register: async (fullName, email, password) => {
        const res = await cf_axios.post("/auth/signup", {fullName, email, password});
        return res.data;
    },

    signinnwithGG: async (data) => {
        const res = await cf_axios.post("/auth/signinnwithGmail",{
            displayName: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL
          });
        return res.data;
    },

    logout: async (accessToken) => {
        const res = await api.post("/auth/logout",null, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        } );
        return res;
    },

    requesttoken: async () => {
        const res = await cf_axios.get("/auth/requestRefreshToken");
        return res.data;
    },

    testUser: async (accessToken) => {
        const res = await api.post("/auth/test",null, {
            headers: {
                Authorization: `Bearer ${accessToken}` // Gắn token vào header
            }
          });
        return res.data;
    },


    getAllUser: async () => {
        const res = await cf_axios.get("/user/getAllUsers");
        return res.data;
    },

    getUserById: async (accessToken) => {
        const res = await api.get("/user/GetUser", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    },

    updateStatus: async (ids, newStatus,reason,accessToken) => {
        const res = await api.put(`/user/update-status`, {ids, status: newStatus,reason }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        return res;
    },


    resetPassword: async ( oldPassword,newPassword,accessToken) => {
        const res = await api.put(`/user/resetPassword`, { oldPassword,newPassword }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        return res.data;
    },
    updateUser: async (formData,accessToken ) => {
        const res = await api.put(`/user/update/${formData.get("id")}`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data"
            },
        });
        return res.data;
    },
    };


export default userService;