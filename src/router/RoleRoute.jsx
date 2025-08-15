import { Navigate } from 'react-router-dom';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const RoleRoute = ({ children, allowedRole }) => {
  const { role, loading } = useRole();

  if (loading) return <LoadingSpinner />;

  if (role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleRoute;
