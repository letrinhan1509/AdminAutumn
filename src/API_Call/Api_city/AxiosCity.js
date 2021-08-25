import axios from "axios";
require('dotenv').config()

const AxiosCity = axios.create({
    baseURL: process.env.REACT_APP_API_URL_CITY,
    headers: {
        "content-type": "application/json"
    }
});
export default AxiosCity;