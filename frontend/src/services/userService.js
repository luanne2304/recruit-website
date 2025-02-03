import cf_axios from "./cf_axios";
import api from "./interceptorAPI";

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

    testUser: async (accessToken) => {
        const res = await api.post("/auth/test",null, {
            headers: {
                Authorization: `Bearer ${accessToken}` // Gắn token vào header
            }
          });
        return res.data;
    },


    getUser: async (token) => {
        const res = await cf_axios.get("/users");
        return res.data;
    },
    getUserById: async (token) => {
        const res = await cf_axios.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    },
    deleteUser: async (id,token) => {
        const res = await cf_axios.delete(`/users/${id}`);
        return res.data;
    },
    resetPassword: async (id, password,token) => {
        const res = await cf_axios.put(`/users/${id}`, { password });
        return res.data;
    },
    updateUser: async (data ,token) => {
        const res = await cf_axios.patch("/user", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    },
    };


export default userService;