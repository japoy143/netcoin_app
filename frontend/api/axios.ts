import axios from "axios";
const BASE_URL = "http://192.168.254.161:3000";

export const axiosCustom = axios.create({
  baseURL: BASE_URL,
});
