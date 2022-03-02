import axios from "axios";
import moment from "moment";

// export const baseUrl = 'https://guarded-cliffs-29944.herokuapp.com/'
export const baseUrl = 'https://api.qorasuvagro.uz/'

export const http = axios.create({
  baseURL: 'https://api.qorasuvagro.uz/api',
  // baseURL: 'https://guarded-cliffs-29944.herokuapp.com/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
});

export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

export const getDate = (date) => moment(date).format("LLLL");

export const kFormatter = (num) => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num);

export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");

export const isUserLoggedIn = () => {
  return localStorage.getItem("userData") && localStorage.getItem("Qaccess_Token");
};
export const getUserData = () => JSON.parse(localStorage.getItem("userData"));
