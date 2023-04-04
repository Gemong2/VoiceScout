import axios from "axios";

export const $ = axios.create({
  // baseURL: "https://j8a404.p.ssafy.io",
  baseURL: "http://localhost:4433/api",
  headers: {
    "Content-Type": "application/json",
  },
});
