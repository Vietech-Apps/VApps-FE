import axios from "axios";
export const API_BASE_URL = "/api/";
export const BackEnd_URL = "http://localhost:8080";
const jwtAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.jwtExpired) {
      console.log("Need to logout user");
      // store.dispatch({type: LOGOUT});
      localStorage.removeItem("token");
    }
    return Promise.reject(err);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    jwtAxios.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("token", token);
  } else {
    delete jwtAxios.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

export default jwtAxios;

export const getData = async (url) => {
  try {
    let res = await jwtAxios.get(url);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const postData = async (url, data) => {
  try {
    let res = await jwtAxios.post(url, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const putData = async (url, data) => {
  try {
    let res = await jwtAxios.put(url, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const patchData = async (url, data) => {
  try {
    let res = await jwtAxios.patch(url, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteData = async (url, data) => {
  try {
    let res = await jwtAxios.delete(url, data);
    return res;
  } catch (error) {
    console.log(error);
  }
 };
