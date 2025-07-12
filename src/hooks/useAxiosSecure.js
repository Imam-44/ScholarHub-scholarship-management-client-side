import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", 
  withCredentials: true, 
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
         
          navigate("/signin");
        }
        return Promise.reject(error);
      }
    );
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
