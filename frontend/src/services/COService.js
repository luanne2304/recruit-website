import cf_axios from "./cf_axios";
import api from "./interceptorAPI";

const COService = {
    getAll: async (search,page,limit) => {
        const res = await cf_axios.get("/CO/getALL",{params:{ search, page, limit }});
        return res.data;
    },

    create: async (accessToken, formData) => {
        const res = await api.post(`/CO/create`,formData,{
            headers: {
              'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`
            }
          });
        return res.data;
    },

    update: async (accessToken, formData,idCO) => {
        const res = await api.put(`/CO/update/${idCO}`,formData,{
            headers: {
              'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`
            }
          });
        return res.data;
    },

    updateCoverImg: async (accessToken, formData,idCO) => {
        const res = await api.put(`/CO/updateCoverImg/${idCO}`,formData,{
            headers: {
              'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`
            }
          });
        return res.data;
    },


    getByID: async (id) => {
        const res = await cf_axios.get(`/CO/getCObyID/${id}`);
        return res.data;
    },

    updateStatus: async (id, newStatus,reason,accessToken) => {
        const res = await api.put(`/CO/update-status/${id}`, { status: newStatus,reason:reason },{
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
        });
        return res;
    },

    updateIdaccountCO: async (idCO,idacc,accessToken) => {
        const res = await api.put(`/CO/update-idacc/${idCO}`, { idaccount_manager:idacc },{
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
        });
        return res;
    },

    getCObyuserID: async (accessToken) => {
        const res = await cf_axios.get(`/CO/check-ownership`,
            {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
          });
        return res.data;
    },

};

export default COService;