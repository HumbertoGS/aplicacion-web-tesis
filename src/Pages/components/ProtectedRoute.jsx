
import { Navigate } from "react-router-dom"

const user = JSON.parse(localStorage.getItem("user"));

export const ProtectedRoute = ({children, redirectTo="/"}) => {

  if(!user) return <Navigate to={redirectTo}/>
  return children
}