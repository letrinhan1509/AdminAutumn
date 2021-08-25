import axios from "axios";
require('dotenv').config()

const AxiosCatalog = axios.create({
    baseURL: process.env.REACT_APP_API_URL_DANHMUC,
    headers: {
        "content-type": "application/json"
    }
});
export default AxiosCatalog;