import axios from "axios";

const cf_axios = axios.create({
    baseURL: "http://localhost:4000/api",
});

export default cf_axios;