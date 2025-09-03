import { Navigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

// This is a wrapper component. It takes other components as "children".
const ProtectedRoute = ({ children }) => {
  // Get the user's info from our global state.
  const { userInfo } = useUserStore();

  // If there's no user info, it means they are not logged in.
  if (!userInfo) {
    // Redirect them to the login page.
    return <Navigate to="/login" />;
  }

  // If they are logged in, show the component they were trying to access.
  return children;
};

export default ProtectedRoute;