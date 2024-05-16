import axios from "axios";

export const base_url = "https://localhost:7064/api/";
export const axios_noauth = axios.create({
  baseURL: base_url,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const axios_auth = axios.create({
  baseURL: base_url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export const axios_auth_form = axios.create({
  baseURL: base_url,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
export const axios_noauth_form = axios.create({
  baseURL: base_url,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});
