const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://172.20.10.4:1337/api",
});

// Get Data
const getCategory = () => axiosClient.get("/categories?populate=*");
const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((res) => res.data.data);
const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((res) => res.data.data);
const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((res) => {
    return res.data.data;
  });
const getProductsByCategory = (category) =>
  axiosClient
    .get("/products?filters[categories][name][$in]=" + category + "&populate=*")
    .then((res) => {
      return res.data.data;
    });

// Auth User
const registerUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const signIn = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  signIn,
};
