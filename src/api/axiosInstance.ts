import axios from 'axios';

const baseURL = 'https://api.themoviedb.org/3/'

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use((config) => {
  config.headers = Object.assign(
    {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2M2Q1OWYyZGYwMmQyN2U2NzM5NTMzMjE4YmE2YzlkOSIsInN1YiI6IjVlZjQ0Y2YxODFhN2ZjMDAzNWJkNzM0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kW7BJWdDB-axeqqvnyVi3oDyBdKv0MVWHwordsEB3q8`,
    },
    config.headers,
  );
  return config;
});

export default axiosInstance;