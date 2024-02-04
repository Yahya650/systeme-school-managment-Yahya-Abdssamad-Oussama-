import axios, { formToJSON } from "axios";

export const BACKEND_URL = "http://localhost:8000";
export const AxiosClient = axios.create({
    baseURL: BACKEND_URL + "/api",
    withCredentials: true
})

AxiosClient.interceptors.request.use(function (config) {
    const ud = JSON.parse(localStorage.getItem("ud"));
    if (ud) {
        config.headers.Authorization = 'Bearer ' + ud._token
    }
    return config
})