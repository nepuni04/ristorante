import React, { useState, useEffect, useContext, createContext } from 'react'
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import firebaseApp from './firebase'

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

      setLoading(false)
      setUser(user)
      return user
    } else {
      setLoading(false)
      setUser(false)
      return false
    }
  }

  const signinWithGitHub = () => {
    setLoading(true)
    return signInWithPopup(auth, new GithubAuthProvider())
      .then((response) => handleUser(response.user))
  }

	const signinWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => handleUser(response.user))
  }

  const logout = () => {
    return signOut(auth)
      .then(() => handleUser(false))
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
    logout,
  }
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  }
}