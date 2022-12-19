import React from "react";
import "../designer/theme.css"
import MenuL from "./MenuL";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="App">
      <MenuL /> 
      {/* <div className="App-content"> */}
      <div className="form-padre">
        <Outlet />
      </div>
    </div>
  );
}
