import axios from "axios";
require('dotenv').config()

const AxiosProduct = axios.create({
    baseURL: process.env.REACT_APP_API_URL_SANPHAM,
    headers: {
        "content-type": "application/json"
    }
});
export default AxiosProduct;