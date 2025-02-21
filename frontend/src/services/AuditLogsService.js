import cf_axios from "./cf_axios";
import api from "./interceptorAPI";

const AuditLogsService = {
    getAll: async (accessToken) => {
        const res = await api.get("/Auditlog/getAll", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    },


};

export default AuditLogsService;