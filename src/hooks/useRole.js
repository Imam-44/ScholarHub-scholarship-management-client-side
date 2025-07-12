import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth(); // ইউজার লগইন করা কিনা সেটা ধরে
  const [axiosSecure] = useAxiosSecure(); // secure axios instance

  const { data: role = "", isLoading: roleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading, // ইউজার থাকলে চলবে
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return { role, loading: roleLoading || loading };
};

export default useRole;
