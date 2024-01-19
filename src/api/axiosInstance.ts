import axios from "axios";

const baseURL = "http://localhost:3012/api";
const api = axios.create({ baseURL });

export default api;
