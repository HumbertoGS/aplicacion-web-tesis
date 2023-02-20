import BtnCambioOpciones from "../components/OpcionPantalla";

export default function HeaderPerfil({ user, cambio, opcion }) {
  return (
    <div className="mt-3">
      <h5 className="text-center pb-2">Bienvenido {user?.nombre}</h5>
      <div
        className="d-flex my-3"
        style={{ borderBottom: "1px solid #d2d8dd" }}
      >
        <BtnCambioOpciones
          styleBtn={{
            border: !opcion ? "0px" : "1px solid #d2d8dd",
            marginBottom: opcion ? "-1px" : "0px",
            background: opcion ? "#e9ecef" : "#ffff",
          }}
          onClick={cambio}
          nameBtn="Actualizar Datos"
        />

        <BtnCambioOpciones
          styleBtn={{
            border: opcion ? "0px" : "1px solid #d2d8dd",
            marginBottom: !opcion ? "-1px" : "0px",
            background: !opcion ? "#e9ecef" : "#ffff",
          }}
          onClick={cambio}
          nameBtn={
            user?.permisos === 1 ? "Administrar Empleados" : "Estado de Pedido"
          }
        />
      </div>
    </div>
  );
}
