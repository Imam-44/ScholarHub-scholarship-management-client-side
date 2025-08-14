import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refresh-token');
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/refresh-token`, { refreshToken });
            localStorage.setItem('access-token', res.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
            return axiosSecure(originalRequest); // Retry original request
          } catch (err) {
            // Refresh token invalid হলে logout
            localStorage.removeItem('access-token');
            localStorage.removeItem('refresh-token');
            navigate('/signin');
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
