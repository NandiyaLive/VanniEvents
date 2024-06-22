import { default as axiosPackage } from "axios";

const axios = axiosPackage.create({
  baseURL: "http://localhost:3000/api",
});

export default axios;
