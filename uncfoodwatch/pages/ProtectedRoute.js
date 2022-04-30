import { useAuth } from '../context/AuthUserContext';

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";


const ProtectedRoute = ({ router, children }) => {
  //Identify authenticated user
  const { user } = useAuthContext();
  const isAuthenticated = user.isLoggedIn;

  let unprotectedRoutes = [
    '/sign_up',
  ];

  /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */
  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push(appRoutes.LOGIN_PAGE);
  }

  return children;
};

export default ProtectedRoute;