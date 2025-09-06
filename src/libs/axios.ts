import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const apiV1 = axios.create({
  baseURL: `${API_URL}/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiV2 = axios.create({
  baseURL: `${API_URL}/v2`,
  headers: {
    "Content-Type": "application/json",
  },
});

// ENDPOINTS
export const MOVIES_ENDPOINT = "/movies";
export const COMMENTS_ENDPOINT = "/comments";
