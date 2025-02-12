import cf_axios from "./cf_axios";
import api from "./interceptorAPI";

const ApplicationsService = {
    apply: async (idCV,idPost,accessToken) => {
        const res = await api.post("/Applications/apply",{idCV,idPost}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,  
          }
        });
        return res.data;
    },

    getAll: async () => {
        const res = await cf_axios.get("/post/getALLjob");
        return res.data;
    },

    getByIDpostandStatus: async (id,status,accessToken) => {
        const res = await api.get(`/Applications/getApplyPostByStatus/${id}`,  {
            params: { status: status }, 
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        return res.data;
    },

    updateStatusApply: async (id,selectedIds,status,accessToken) => {
        const res = await api.put(`/Applications/updateStatusApply/${id}`,{selectedIds,status}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,  
          }
        });
        return res.data;
    },

    getCVsAppliedbyUser: async (accessToken,page,limit) => {
        const res = await api.get(`/Applications/getCVsAppliedbyUser`, {
            params: {page, limit },
            headers: {
                Authorization: `Bearer ${accessToken}`,  
          }
        });
        return res.data;
    },


};

export default ApplicationsService;