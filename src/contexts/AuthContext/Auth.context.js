import React, { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from 'firebase/auth';
import firebaseApp from '../../utils/firebase';

export const AuthContext = React.createContext({});

export function AuthContextProvider({children}){

  const [user, setUser] = useState(null);

  const auth = getAuth(firebaseApp);

  useEffect(()=>{
    auth.onAuthStateChanged((user=>{
      setUser(user)
    }))
  },[])

  const authCtxValue = {
    getUserID: ()=>user?.uid,
    createAccount: (email, password)=>{
      createUserWithEmailAndPassword(auth, email, password);
    },
    signIn: (email, password)=>{
      signInWithEmailAndPassword(auth, email, password);
    },
    signOut: ()=>{
      signOut(auth)
    }
  }

  return (
    <>
      <AuthContext.Provider value={authCtxValue}>{children}</AuthContext.Provider>
    </>
  )
}