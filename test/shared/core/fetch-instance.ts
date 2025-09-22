import axios from "axios";

export const fetchInstance = axios.create({
  baseURL: `https://api.chaca.app/api/v1`,
});
