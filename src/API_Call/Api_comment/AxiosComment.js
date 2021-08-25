import axios from "axios";
require('dotenv').config()

const AxiosComment = axios.create({
    baseURL: process.env.REACT_APP_API_URL_BINHLUAN,
    headers: {
        "content-type": "application/json"
    }
});
export default AxiosComment;