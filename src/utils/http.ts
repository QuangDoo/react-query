import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:4000/',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' }
});

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
