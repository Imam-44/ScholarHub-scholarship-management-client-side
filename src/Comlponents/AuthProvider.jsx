import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { app } from "../Firebase/firebase.init";

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
    return signOut(auth)
  }

  //on auth stast change
  useEffect(()=> {
    const unSubscribe = onAuthStateChanged(auth, 
      currentUser => {
        setUser(currentUser);
        setLoading(false)
        console.log('user in the auth state change,', currentUser);
      }
    )
    return() => {
      unSubscribe();
    }
  }, [])

  const authInfo = {
    createUser,
    signIn,
    signInWithGoogle,
    user,
    signOutUser,
    setUser
  };

  return(
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider