import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Pages/Content/Layout";
import Inicio from "./Pages/Inicio";
import Registrar from "./Pages/Registrar";
import RegistroVentas from "./Pages/RegistroVentas";
import Carrito from "./Pages/Carrito";
import NoPage from "./Pages/NoPage";
import Catalogo from "./Pages/Catalogo/Catalogo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/*<Route index element={<Inicio />} />*/}
          <Route path="Catalogo" element={<Catalogo />} />
          {/*<Route path="carrito" element={<Carrito />} /> */}
          <Route path="Registro-Ventas" element={<RegistroVentas />} />
          <Route path="Carrito" element={<Carrito />} />
          <Route path="Registrar" element={<Registrar />} />
          <Route path="No-Page" element={<NoPage />} />
          <Route path="*" element={<Navigate to="noPage" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
