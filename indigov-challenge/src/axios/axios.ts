import axios from 'axios';

const axiosInstance = axios.create({
    // in a real application I wouldn't use just a plain text env file
    baseURL: process.env.REACT_APP_API_URL, 
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}` // Example token
    }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        console.log('Request sent:', config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Error in response:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;