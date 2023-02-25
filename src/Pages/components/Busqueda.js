import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { BtnGuardar } from "./BtnAccion";

const busqueda = {
  status: "1",
  num_pedido: "",
  num_ident: "",
};

const BusquedaAvz = ({
  url,
  datosBuscar,
  estado = false,
  handleRespond,
  resetFiltre,
  closedBusq,
}) => {
  if (datosBuscar?.num_ident) busqueda.num_ident = datosBuscar.num_ident;

  const onlyNumber = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^\d+$/.test(keyValue) && ![8, 46, 37, 39].includes(keyCode)) {
      event.preventDefault();
    }
  };

  const FormCustom = () => {
    return (
      <Row className="py-3 px-5">
        <Col md={4}>
          <Form.Group className="d-flex flex-row align-items-center">
            <Form.Label className="fw-bold w-50">Estado del pedido</Form.Label>
            <Form.Select
              className="mx-3 w-75"
              defaultValue={datosBuscar?.status}
              onChange={(event) => {
                busqueda.status = event.target.value;
              }}
            >
              <option value={1}>Pendiente</option>
              <option value={2}>Pagado</option>
              <option value={3}>Cancelado</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="d-flex flex-row align-items-center">
            <Form.Label className="fw-bold w-50">Número del pedido</Form.Label>
            <Form.Control
              className="mx-3 w-75"
              type="text"
              maxLength={5}
              defaultValue={busqueda?.num_pedido}
              onKeyDown={(e) => {
                onlyNumber(e);
              }}
              onChange={(event) => {
                busqueda.num_pedido = event.target.value;
              }}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          {!estado && (
            <Form.Group className="d-flex flex-row align-items-center">
              <Form.Label className="fw-bold w-50">
                Identificación del cliente
              </Form.Label>
              <Form.Control
                className="mx-3 w-75"
                type="text"
                maxLength={10}
                defaultValue={datosBuscar?.num_ident}
                onKeyDown={(e) => {
                  onlyNumber(e);
                }}
                onChange={(event) => {
                  busqueda.num_ident = event.target.value;
                }}
              />
            </Form.Group>
          )}
        </Col>
      </Row>
    );
  };

  return (
    <>
      <FormCustom />
      <div className="d-flex justify-content-center">
        <BtnGuardar
          datos={busqueda}
          url={url}
          handleRespond={(x) => {
            handleRespond(x, busqueda);
            const interval = setTimeout(() => {
              closedBusq();
            }, 2000);
            return () => clearInterval(interval);
            // closedBusq();
          }}
          mensajeResp="Búsqueda Realizada"
        />
        <Button
          className="mx-2"
          variant="outline-secondary"
          disabled={!(busqueda.num_ident || busqueda.num_pedido)}
          onClick={() => {
            busqueda.num_pedido = "";
            if (!estado) busqueda.num_ident = "";

            resetFiltre({
              status: busqueda.status,
              num_pedido: "",
              num_ident: estado ? datosBuscar?.num_ident : "",
            });
          }}
        >
          Limpiar
        </Button>
      </div>
    </>
  );
};

export default BusquedaAvz;
