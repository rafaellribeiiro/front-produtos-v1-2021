import axios from "axios";

export const http = axios.create({
  baseURL: "https://apirest-produtos-v1-2021.herokuapp.com",
});
