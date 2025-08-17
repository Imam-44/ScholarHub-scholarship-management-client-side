import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // cookie পাঠানোর জন্য
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Cookie ব্যবহারে requestInterceptor প্রয়োজন নেই
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Cookie স্বয়ংক্রিয়ভাবে clear হবে backend থেকে, localStorage নাই
          navigate('/signin');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
