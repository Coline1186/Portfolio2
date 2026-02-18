import axios from "axios"
export default axios.create({
   baseURL: import.meta.env.VITE_BACKEND_URL_FILES,
   headers: {
      "Content-Type": "multipart/form-data",
   },
})
