import cf_axios from "./cf_axios";
import api from "./interceptorAPI";

const postService = {
    getFilterjob: async (params,page,limit) => {
        const res = await cf_axios.get("/post/getFilterjob",{params: { ...params, page, limit }});
        return res.data;
    },

    getSearchjob: async (search,page,limit) => {
        const res = await cf_axios.get("/post/getSearchjob",{params: {search , page, limit }});
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

    getALLJobByCO: async (idCO,page,limit) => {
        const res = await cf_axios.get(`/post/getALLJobbyCO/${idCO}`,{params: { page, limit }});
        return res.data;
    },

    create: async (formData,accessToken) => {
        const res = await api.post(`/post/create`,formData,
            {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
          });
        return res.data;
    },

    update: async (formData,accessToken,idjob) => {
        const res = await api.put(`/post/update/${idjob}`,formData,
            {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
          });
        return res.data;
    },
    

};

export default postService;