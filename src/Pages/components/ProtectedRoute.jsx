
import { useState } from "react";
import { Navigate } from "react-router-dom"
import { PostData } from "../../custom-hooks/accesoMenu";

const userLocal = JSON.parse(localStorage.getItem("user"));

export const ProtectedRoute = ({children, redirectTo="/", user}) => {
  if(!user && !userLocal) return <Navigate to={redirectTo}/>
  return children
}