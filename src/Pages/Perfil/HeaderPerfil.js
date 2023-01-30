import Button from "react-bootstrap/esm/Button";

export default function HeaderPerfil({ user, cambio, opcion }) {
  return (
    <div className="mt-3">
      <h5 className="text-center">Bienvenido {user?.nombre}</h5>
      <div className="d-flex">
        <Button
          style={{ border: "0px", borderRadius: "0px" }}
          variant="outline-secondary"
          onClick={cambio}
        >
          {!opcion
            ? "Actualizar Datos"
            : user?.permisos == 1
            ? "Administrar Empleados"
            : "Estado de Pedido"}
        </Button>
      </div>
      <hr className="pt-0 mt-0" />
    </div>
  );
}
