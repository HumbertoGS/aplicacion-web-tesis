import BtnCambioOpciones from "../components/OpcionPantalla";

export default function HeaderPerfil({ user, state, estados }) {
  let { actualizar, opciones, reporte } = state;

  return (
    <div className="mt-3">
      <h5 className="text-center pb-2">Bienvenido {user?.nombre}</h5>
      <div
        className="d-flex my-3"
        style={{ borderBottom: "1px solid #d2d8dd" }}
      >
        <BtnCambioOpciones
          estado={actualizar}
          onClick={() =>
            estados({
              reporte: false,
              actualizar: true,
              opciones: false,
            })
          }
          nameBtn="Actualizar Datos"
        />

        <BtnCambioOpciones
          estado={opciones}
          onClick={() =>
            estados({
              reporte: false,
              actualizar: false,
              opciones: true,
            })
          }
          nameBtn={
            user?.permisos === 1 ? "Administrar Empleados" : "Estado de Pedido"
          }
        />

        <BtnCambioOpciones
          estado={reporte}
          onClick={() =>
            estados({
              reporte: true,
              actualizar: false,
              opciones: false,
            })
          }
          nameBtn="Reporte"
        />
      </div>
    </div>
  );
}
