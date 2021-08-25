import axios from "axios";
require('dotenv').config()

const AxiosOrder = axios.create({
    baseURL: process.env.REACT_APP_API_URL_DONHANG,
    headers: {
        "content-type": "application/json"
    }
});
export default AxiosOrder;