import { default as axiosPackage } from "axios";
import { getCookie } from "cookies-next";

const token = getCookie("token");

const axios = axiosPackage.create({
  baseURL: "https://vanni-events-api.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default axios;
