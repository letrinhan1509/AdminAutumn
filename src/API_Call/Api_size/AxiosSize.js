import axios from "axios";
require('dotenv').config()

const AxiosSize = axios.create({
    baseURL: process.env.REACT_APP_API_URL_SIZE,
    headers: {
        "content-type": "application/json"
    }
});
export default AxiosSize;