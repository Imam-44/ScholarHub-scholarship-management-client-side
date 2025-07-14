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

   // Auth State Observer + JWT Cookie Handling
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async currentUser => {
    if (currentUser?.email) {
      setUser(currentUser);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email: currentUser.email }
      );
      localStorage.setItem('access-token', res.data.token);
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