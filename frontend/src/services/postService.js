import cf_axios from "./cf_axios";
import api from "./interceptorAPI";

const postService = {
    getFilterjob: async (params) => {
        const res = await cf_axios.get("/post/getFilterjob",{params:params});
        return res.data;
    },

    getAll: async () => {
        const res = await cf_axios.get("/post/getALLjob");
        return res.data;
    },

    getJobbyID: async (id) => {
        const res = await cf_axios.get(`/post/getbyID/${id}`);
        return res.data;
    },

    getALLJobByCO: async (idCO) => {
        const res = await cf_axios.get(`/post/getALLJobbyCO/${idCO}`);
        return res.data;
    },


};

export default postService;