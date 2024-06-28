import { default as axiosPackage } from "axios";
import { getCookie } from "cookies-next";

const token = getCookie("token");

const axios = axiosPackage.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default axios;
