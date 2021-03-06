import React, { useState, useEffect, useContext, createContext } from 'react'
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  signOut,
  signInWithEmailAndPassword 
} from "firebase/auth";
import firebaseApp from './firebase'
import Router from 'next/router'
import { createUser } from './db'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const auth = getAuth(firebaseApp);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser)
      const { token, ...userWithoutToken } = user

      createUser(user.uid, userWithoutToken)
      setLoading(false)
      setUser(user)
      
      return user
    } 
    else {
      setLoading(false)
      setUser(null)
      
      return false
    }
  }

  const signinWithEmail = (email, password) => {
    setLoading(true);

    console.log(email, password)

    return signInWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user);
        Router.push('/sites');
      });
  };

  const signinWithGitHub = () => {
    setLoading(true)
    return signInWithPopup(auth, new GithubAuthProvider())
      .then((response) => handleUser(response.user))
  }

	const signinWithGoogle = (redirect) => {
    setLoading(true)
    return signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user)

        if (redirect) {
          Router.push(redirect)
        }
      })
  }

  const logout = () => {
    return signOut(auth)
      .then(() => handleUser(null))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser)

    return () => unsubscribe()
  }, [])

  return {
    user,
    loading,
    signinWithGitHub,
		signinWithGoogle,
    signinWithEmail,
    logout,
  }
}

const formatUser = (user) => {
  // console.log("Raw user data", user)
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    token: user.accessToken,
    photoUrl: user.photoURL,
  }
}