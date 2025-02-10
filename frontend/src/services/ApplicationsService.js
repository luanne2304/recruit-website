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


};

export default ApplicationsService;