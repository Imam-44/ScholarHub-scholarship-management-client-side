import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { app } from "../Firebase/firebase.init";
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //sign up
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }

  //sign in 
  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  //google sign in 
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  }

  //sign out user
  const signOutUser = () => {
    setLoading(true);
    localStorage.removeItem('access-token');
    return signOut(auth)
  }

    // Fetch role from DB
const fetchUserRole = async (email) => {
  try {
    const res = await axiosSecure.get(`/users/role/${email}`);
    return res.data.role || 'user'; // Default fallback
  } catch (error) {
    
    return 'user';
  }
};


   // Auth State Observer + JWT Cookie Handling
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser?.email) {
      try {
        // 1. Get JWT token
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          { email: currentUser.email }
        );
        const token = res.data.token;
        localStorage.setItem('access-token', token);

        // 2. Create secure axios instance with token
        const axiosSecure = axios.create({
          baseURL: import.meta.env.VITE_API_URL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 3. Get role from DB
        const roleRes = await axiosSecure.get(`/users/role/${currentUser.email}`);
        const role = roleRes.data?.role || 'user';

        // 4. Set user with role
        setUser({
          ...currentUser,
          role,
        });

      } catch (error) {
     
        setUser(currentUser); // fallback: set without role
      }
    } else {
      setUser(null);
      localStorage.removeItem('access-token');
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);


  const authInfo = {
    createUser,
    signIn,
    signInWithGoogle,
    user,
    signOutUser,
    setUser,
    loading
  };

  return(
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider