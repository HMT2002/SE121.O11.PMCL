import { useAuth } from '../../contexts/auth-context';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth?.isAuthorized ? children : <Navigate to="/login" state={{ from: location }} replace />;
};
