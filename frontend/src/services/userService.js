import cf_axios from "./cf_axios";

const userService = {
    login: async (email, password) => {
        const res = await cf_axios.post("/user/login", { email, password });
        return res.data;
    },
    register: async (fullName, email, password) => {
        const res = await cf_axios.post("/user/signup", {fullName, email, password});
        return res.data;
    },
    getUser: async () => {
        const res = await cf_axios.get("/users");
        return res.data;
    },
    getUserById: async () => {
        // get token from localStorage
        const token = localStorage.getItem("token");
        const res = await cf_axios.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    },
    deleteUser: async (id) => {
        const res = await cf_axios.delete(`/users/${id}`);
        return res.data;
    },
    resetPassword: async (id, password) => {
        const res = await cf_axios.put(`/users/${id}`, { password });
        return res.data;
    },
    updateUser: async (data) => {
        const token = localStorage.getItem("token");
        console.log(data);
        const res = await cf_axios.patch("/user", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res);
        return res.data;
    },
    };


export default userService;