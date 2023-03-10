import { Row, Col } from "react-bootstrap";
import BtnCambioOpciones from "../components/OpcionPantalla";

export default function HeaderPerfil({ user, state, estados }) {
  let { actualizar, opciones, reporte, grafica } = state;

  return (
    <Row className="mt-3">
      <Col>
      <h5 className="text-center pb-2">Bienvenido {user?.nombre}</h5>
      <Row
        // className="d-flex my-3"
        style={{ borderBottom: "1px solid #d2d8dd" }}
      >
        <BtnCambioOpciones
          estado={actualizar}
          onClick={() =>
            estados({
              reporte: false,
              actualizar: true,
              opciones: false,
              grafica: false,
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
              grafica: false,
            })
          }
          nameBtn={
            user?.permisos === 1 ? "Administrar Empleados" : "Estado de Pedido"
          }
        />

        {user?.permisos === 1 ? (
          <BtnCambioOpciones
            estado={reporte}
            onClick={() =>
              estados({
                reporte: true,
                actualizar: false,
                opciones: false,
                grafica: false,
              })
            }
            nameBtn="Reporte"
          />
        ) : null}

        {user?.permisos === 1 ? (
          <BtnCambioOpciones
            estado={grafica}
            onClick={() =>
              estados({
                reporte: false,
                actualizar: false,
                opciones: false,
                grafica: true,
              })
            }
            nameBtn="Estadistica"
          />
        ) : null}
      </Row></Col>
    </Row>
  );
}
