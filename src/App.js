import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Pages/Content/Layout";
import Inicio from "./Pages/Inicio";
import Registrar from "./Pages/Registrar";
import RegistroVentas from "./Pages/RegistroVentas"
import NoPage from "./Pages/NoPage";
import Catalogo from "./Pages/Catalogo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="catalogo" element={<Catalogo/>} />
           {/*<Route path="carrito" element={<Carrito />} /> */}
          <Route path="registrar" element={<Registrar />} />
          <Route path="noPage" element={<NoPage />} />
          <Route path="*" element={<Navigate to="noPage" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );


}

export default App;
