import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("API Url required");
}

export const HTTP_CLIENT = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});
