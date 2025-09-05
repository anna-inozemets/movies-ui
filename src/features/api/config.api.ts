export const API_URL = import.meta.env.VITE_API_URL;
export const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const baseHeaders: HeadersInit = {
  Authorization: API_TOKEN,
};