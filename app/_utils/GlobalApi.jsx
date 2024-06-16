const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://192.168.0.112:1337/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");
const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((res) => res.data.data);
const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((res) => res.data.data);
const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((res) => {
    return res.data.data;
  });

export default { getCategory, getSliders, getCategoryList, getAllProducts };
