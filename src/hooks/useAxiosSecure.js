// hooks/useAxiosSecure.jsx
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // ✅ Cookie পাঠানোর জন্য
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          navigate('/signin'); // unauthorized হলে login page
        }
        return Promise.reject(error);
      }
    );

    return () => axiosSecure.interceptors.response.eject(responseInterceptor);
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
