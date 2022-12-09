import axios from "axios";
import config from "../config.js"

export default axios.create({
    baseURL: config.api.baseUrl,
    params: {
        api_key: config.api.apiKey
    }
});