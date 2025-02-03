import axios from "axios";

const cf_axios = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
});

export default cf_axios;