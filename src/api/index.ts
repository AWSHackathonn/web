import axios from "axios";

export const instance = axios.create({
    baseURL:process.env.REACT_APP_SERVER_URL,
    timeout:5000,
    headers:{
        'Content-Type':'application/json',
    }
})