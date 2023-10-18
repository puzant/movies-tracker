import axios from 'axios';

const baseURL = 'https://api.themoviedb.org/3/'

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(
  (config) => {
    config.params = { ...config.params, api_key: '63d59f2df02d27e6739533218ba6c9d9' };
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;

