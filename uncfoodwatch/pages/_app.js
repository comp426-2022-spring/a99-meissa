// Set up app 
import { AuthUserProvider } from '../context/AuthUserContext';
import ProtectedRoute from "./ProtectedRoute";

function MyApp({ Component, pageProps }) {
  return <AuthUserProvider><Component {...pageProps} /></AuthUserProvider>
}

// Export App
export default MyApp;