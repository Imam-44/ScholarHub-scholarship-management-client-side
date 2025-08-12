import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { useEffect, useState, createContext } from "react";
import { app } from "../Firebase/firebase.init";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Global axios instance for secure requests
export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token to every secure request
axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google sign in
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Sign out
  const signOutUser = () => {
    setLoading(true);
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

  // Fetch role from DB
  const fetchUserRole = async (email) => {
    try {
      const res = await axiosSecure.get(`/api/users/role/${email}`);
      return res.data.role || "user"; // Default role if not found
    } catch (error) {
      return "user";
    }
  };

  // Auth State Observer + JWT Handling
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        try {
          // 1. Get JWT token
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/jwt`,
            { email: currentUser.email }
          );
          const token = res.data.token;
          localStorage.setItem("access-token", token);

          // 2. Get role using global axiosSecure
          const role = await fetchUserRole(currentUser.email);

          // 3. Set user with role
          setUser({
            ...currentUser,
            role,
          });
        } catch (error) {
          setUser(currentUser); // fallback: no role
        }
      } else {
        setUser(null);
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    signIn,
    signInWithGoogle,
    signOutUser,
    user,
    setUser,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
