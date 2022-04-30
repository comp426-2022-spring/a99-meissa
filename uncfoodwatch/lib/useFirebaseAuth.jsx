// Firebase Auth Functionality
import { useState, useEffect } from 'react'
import firebase from './firebase';
import { useAuth } from '../context/AuthUserContext';

// Format User
const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email
});

// Add User Auth
export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return;
    }

    setLoading(true)

    var formattedUser = formatAuthUser(authState);

    setAuthUser(formattedUser);

    setLoading(false);

  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };


  // Add Info to Firebase
  const signInWithEmailAndPassword = (email, password) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = (email, password) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

  const signOut = () =>
    firebase.auth().signOut().then(clear);
  
  const deleteUser = () => {
    if (firebase.auth().currentUser != null){
      firebase.auth().currentUser.delete()
    }}
  
  const updateUser = (password) => {
    if (firebase.auth().currentUser != null){
      firebase.auth().currentUser.updatePassword(password)
    }
  }


  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    deleteUser,
    updateUser
  };

}