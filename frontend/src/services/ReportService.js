import cf_axios from "./cf_axios";
import api from "./interceptorAPI";

const ReportService = {
    getAll: async () => {
        const res = await cf_axios.get("/report/getAll");
        return res.data;
    },

    create: async (idjob,reason,accessToken) => {
        const res = await api.post(`/report/create`, { idpost:idjob,reason },
            {
            headers: {
                Authorization: `Bearer ${accessToken}` // Gắn token vào header
            }
          });
        return res;
    },
    updateStatus: async (ids,accessToken) => {
        const res = await api.put(`/report/update-Status`, { ids },
            {
            headers: {
                Authorization: `Bearer ${accessToken}` // Gắn token vào header
            }
          });
        return res;
    },



};

export default ReportService;