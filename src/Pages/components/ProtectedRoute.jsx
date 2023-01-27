import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  children,
  redirectTo = "/Catalogo",
  user,
  permisos,
}) => {
  if (!user) return <Navigate to={redirectTo} />;
  if (!permisos.some((x) => x === user.permisos))
    return <Navigate to={redirectTo} />;
  return children;
};
