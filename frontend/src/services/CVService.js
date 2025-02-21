import cf_axios from "./cf_axios";
import api from "./interceptorAPI";

const CVService = {
    getByUser: async (accessToken) => {
        const res = await api.get(`/CV/getCVByIduser`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,  
          }
        });
        return res.data;
    },

    upload: async (formData,accessToken) => {
        const res = await api.post(`/CV/uploadCV`,formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,  
                "Content-Type": "multipart/form-data"
          }
        });
        return res.data;
    },

    del: async (idCV,accessToken) => {
        const res = await api.delete(`/CV/delCV/${idCV}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
          }
        });
        return res;
    },

};

export default CVService;