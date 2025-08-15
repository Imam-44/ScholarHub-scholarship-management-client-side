import { Navigate } from 'react-router-dom';
import useRole from '../hooks/useRole';
// import LoadingSpinner from '...jsx';

const RoleRoute = ({ children, allowedRole }) => {
  const { role, loading } = useRole();

  if (loading) return <h1>Loading....</h1>;

  if (role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleRoute;
