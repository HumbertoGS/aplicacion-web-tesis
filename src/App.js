import { useState } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Pages/Content/Layout";
import { CardsInicio, Iniciar } from "./Pages/Inicio/Inicio";
import Registrar from "./Pages/Inicio/Registrar";
import Login from "./Pages/Inicio/Login";
import LoginEmp from "./Pages/Inicio/LoginEmp";
import RegistroVentas from "./Pages/RegistroVentas/RegistroVentas";
import Carrito from "./Pages/Carrito";
import NoPage from "./Pages/NoPage";
import Catalogo from "./Pages/Catalogo/Catalogo";
import RegistroProducto from "./Pages/RegistroProducto";
import Inventario from "./Pages/Inventario/Inventario";
import StatusPedido from "./Pages/StatusPedido";

import { ProtectedRoute } from "./Pages/components/ProtectedRoute";

import { PostData } from "./custom-hooks/accesoMenu";

function App() {
  const userLocal = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(false);

  PostData((datos) => {
    setUser(datos);
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Catalogo />} />
          <Route
            path="Inicio"
            element={
              <Navigate to={userLocal ? "/Perfil" : "/Pagina-Principal"} />
            }
          />

          <Route path="Pagina-Principal" element={<CardsInicio />} />
          <Route path="Perfil" element={<Iniciar />} />

          <Route path="Catalogo" element={<Catalogo />} />
          {/* <Route path="Inventario" element={<Inventario />} /> */}
          <Route
            path="Inventario"
            element={
              <ProtectedRoute redirectTo="/" user={user}>
                <Inventario />
              </ProtectedRoute>
            }
          />
          <Route
            path="Registro-Ventas"
            element={
              <ProtectedRoute redirectTo="/" user={user}>
                <RegistroVentas />
              </ProtectedRoute>
            }
          />
          <Route
            path="Registrar-Productos"
            element={
              <ProtectedRoute redirectTo="/" user={user}>
                <RegistroProducto />
              </ProtectedRoute>
            }
          />
          {/* <Route path="Registro-Ventas" element={<RegistroVentas />} /> */}
          <Route path="Carrito" element={<Carrito />} />
          {/* <Route path="Registrar-Productos" element={<RegistroProducto />} /> */}
          <Route path="Ingreso-Ad" element={<LoginEmp />} />
          <Route path="Ingresar" element={<Login />} />
          <Route path="Registrar" element={<Registrar />} />
          <Route path="Status-Pedido" element={<StatusPedido />} />
          <Route path="No-Page" element={<NoPage />} />
          <Route path="*" element={<Navigate to="No-Page" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
