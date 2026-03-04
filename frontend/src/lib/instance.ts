import axios from "axios";

export const uploadBaseUrl = import.meta.env.VITE_BACKEND_URL_FILES ?? "";

export default axios.create({
  baseURL: uploadBaseUrl.replace(/\/+$/, ""),
});
