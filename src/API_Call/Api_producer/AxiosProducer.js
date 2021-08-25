import axios from "axios";
require('dotenv').config()

const AxiosProducer = axios.create({
    baseURL: process.env.REACT_APP_API_URL_NSX,
    headers: {
        "content-type": "application/json"
    }
});
export default AxiosProducer;