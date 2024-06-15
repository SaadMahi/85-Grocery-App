const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://192.168.0.112:1337/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");
const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((res) => res.data.data);

export default { getCategory, getSliders };
