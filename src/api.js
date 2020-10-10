import axios from "axios";
import qs from 'querystring'

const getToken = () => {
    return localStorage.getItem("token") || "";
  };

const API_BASE = process.env.REACT_APP_API_BASE || "https://boka.techbuddy.io/api";

const buildURL = (endpoint) => {
  return API_BASE + endpoint;
}

const buildAuthHeader = () => {
  return {
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
}

const parseJSON = (response) => {
  console.log(response);
  return response.data;
}

const get = (url) => {
  return axios.get(buildURL(url), buildAuthHeader()).then(parseJSON);
}

const post = (url, data) => {
  return axios.post(buildURL(url), qs.stringify(data), buildAuthHeader()).then(parseJSON);
}

const api = {
    login: ({phone, code}) => {
      return post(`/signup`, {id: phone, code});
    },
    getCode: (phone) => {
      return get(`/buddy/login/${phone}`);
    },
};

export default api;