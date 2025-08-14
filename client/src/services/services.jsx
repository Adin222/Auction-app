import axios from "axios";

axios.defaults.withCredentials = true;

const apiBase = import.meta.env.VITE_API_BASE_URL;

export const get = async (path) => {
  try {
    const response = await axios.get(`${apiBase}${path}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const post = async (path, body) => {
  try {
    const response = await axios.post(`${apiBase}${path}`, body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const patch = async (path, body) => {
  try {
    const response = await axios.patch(`${apiBase}${path}`, body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const put = async (path, body) => {
  try {
    const response = await axios.put(`${apiBase}${path}`, body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const del = async (path) => {
  try {
    const response = await axios.delete(`${apiBase}${path}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
