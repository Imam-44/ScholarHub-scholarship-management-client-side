import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, 
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          navigate("/signin"); 
        }
        return Promise.reject(error);
      }
    );

    return () => axiosSecure.interceptors.response.eject(interceptor);
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
