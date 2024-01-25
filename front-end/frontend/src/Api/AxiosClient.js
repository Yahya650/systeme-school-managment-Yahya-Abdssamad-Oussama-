import axios from "axios";

export const BACKEND_URL = "http://localhost:8000";

export const AxiosClient = axios.create({
    baseURL: BACKEND_URL + "/api",
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json",
        "Accept": "application/json"
    },
})