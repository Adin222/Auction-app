import axios from "axios";

axios.defaults.withCredentials = true;

export const get = async (path) => {
  try {
    const response = await axios.get(path);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const post = async (path, body) => {
  try {
    const response = await axios.post(path, body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const patch = async (path, body) => {
  try {
    const response = await axios.patch(path, body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const put = async (path, body) => {
  try {
    const response = await axios.put(path, body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const del = async (path) => {
  try {
    const response = await axios.delete(path);
    return response;
  } catch (error) {
    return error.response;
  }
};
