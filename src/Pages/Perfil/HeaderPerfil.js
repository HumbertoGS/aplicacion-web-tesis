import Button from "react-bootstrap/esm/Button";

export default function HeaderPerfil({ user, cambio, opcion }) {
  return (
    <div className="mt-3">
      <h5 className="text-center">Bienvenido {user?.nombre}</h5>
      <div className="d-flex">
        {user?.permisos == 1 ? (
          <Button
            style={{ border: "0px", borderRadius: "0px" }}
            variant="outline-secondary"
            onClick={cambio}
          >
            {!opcion ? "Actualizar Datos" : "Administrar Empleados"}
          </Button>
        ) : (
          <Button
            style={{ border: "0px", borderRadius: "0px" }}
            variant="outline-secondary"
          >
            Actualizar Datos
          </Button>
        )}
      </div>
      <hr className="pt-0 mt-0" />
    </div>
  );
}
