import axios from "axios";

const instance = axios.create({
  baseURL: 'http://43.200.169.101:8080',
});
const token = localStorage.getItem("token");
instance.defaults.headers.common["authorization"] = token 
  ? `${token}` 
  : null;
export default instance;
