import cf_axios from "./cf_axios";
import api from "./interceptorAPI";

const COService = {
    getAll: async () => {
        const res = await cf_axios.get("/CO/getALL");
        return res.data;
    },

    getByID: async (id) => {
        const res = await cf_axios.get(`/CO/getCObyID/${id}`);
        return res.data;
    },

    updateStatus: async (id, newStatus,reason) => {
        const res = await cf_axios.put(`/CO/update-status/${id}`, { status: newStatus,reason:reason });
        return res;
    },

    updateIdaccountCO: async (idCO,idacc) => {
        const res = await cf_axios.put(`/CO/update-idacc/${idCO}`, { idaccount_manager:idacc });
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