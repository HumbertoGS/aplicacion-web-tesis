import { useState } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Pages/Content/Layout";
import { CardsInicio, Iniciar } from "./Pages/Inicio/Inicio";
import Registrar from "./Pages/Inicio/Registrar";
import Login from "./Pages/Inicio/Login";
// import LoginEmp from "./Pages/Inicio/LoginEmp";
import RegistroVentas from "./Pages/RegistroVentas/RegistroVentas";
import Carrito from "./Pages/Carrito";
import NoPage from "./Pages/components/NoPage";
import Catalogo from "./Pages/Catalogo/Catalogo";
import RegistroProducto from "./Pages/RegistroProducto";
import Inventario from "./Pages/Inventario/Inventario";
import StatusPedido from "./Pages/Perfil/StatusPedido";

import ActualizarDatos from "./Pages/Perfil/ActualizarDatos";

import { ProtectedRoute } from "./Pages/components/ProtectedRoute";

import { PostData } from "./custom-hooks/accesoMenu";

import secureLocalStorage from "react-secure-storage";

const permisos = [1, 2];

function App() {
  // const user = JSON.parse(localStorage.getItem("user"));
  const user = secureLocalStorage.getItem("user");

  console.log(user)
  // useEffect(() => {
  //   if (variant) {
  //     const interval = setTimeout(() => {
  //       setVariant("");
  //     }, 4000);
  //     return () => clearInterval(interval);
  //   }
  // }, [variant]);

  return (
    <BrowserRouter>
      {/* {variant ? <MensajeAlert variant={variant} mensaje={mensaje} /> : <></>} */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Catalogo />} />
          <Route
            path="Inicio"
            element={<Navigate to={user ? "/Perfil" : "/Pagina-Principal"} />}
          />

          <Route path="Pagina-Principal" element={<CardsInicio />} />
          <Route path="Perfil" element={<ActualizarDatos user={user} />} />

          <Route path="Catalogo" element={<Catalogo />} />
          {/* <Route path="Inventario" element={<Inventario />} /> */}
          <Route
            path="Inventario"
            element={
              <ProtectedRoute user={user} permisos={[1]}>
                <Inventario />
              </ProtectedRoute>
            }
          />
          <Route
            path="Registro-Ventas"
            element={
              <ProtectedRoute user={user} permisos={permisos}>
                <RegistroVentas />
              </ProtectedRoute>
            }
          />
          <Route
            path="Registrar-Productos"
            element={
              <ProtectedRoute user={user} permisos={permisos}>
                <RegistroProducto />
              </ProtectedRoute>
            }
          />
          <Route path="Carrito" element={<Carrito user={user} />} />
          <Route path="Ingresar" element={<Login />} />
          <Route path="Registrar" element={<Registrar />} />
          <Route path="Status-Pedido" element={<StatusPedido user={user} />} />
          <Route path="No-Page" element={<NoPage />} />
          <Route path="*" element={<Navigate to="No-Page" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
