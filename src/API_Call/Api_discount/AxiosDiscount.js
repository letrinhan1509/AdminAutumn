import axios from "axios";
require('dotenv').config()

const AxiosDiscount = axios.create({
    baseURL: process.env.REACT_APP_API_URL_DISCOUNT,
    headers: {
        "content-type": "application/json"
    }
});
export default AxiosDiscount;