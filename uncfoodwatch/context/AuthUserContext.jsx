// Import React
import { createContext, useContext, Context } from 'react';

// Import Firebase Auth for endpoint
import useFirebaseAuth from '../lib/useFirebaseAuth';

// Create Auth Context
const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {},
  deleteUser: async () => {},
  updateUser: async () => {}
});

// Create Provider 
export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

// Use Auth
export const useAuth = () => useContext(authUserContext);