import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import TablaPedidos from "./TablaPedidos";
import PedidoDetalles from "./Modal/PedidoDetalles";
import ClienteDetalles from "./Modal/ClienteDetalles";

import { ReloadData } from "../../custom-hooks/useFetch";
import { BtnGuardar } from "../components/BtnAccion";

const urlPedidos = `${process.env.REACT_APP_API_CORE_URL}pedido`;

const busqueda = {
  status: 1,
  num_pedido: "",
  num_ident: "",
};

const RegistroVentas = () => {
  const [datos, setDatos] = useState(null);
  const [cargar, setCargar] = useState(true);

  const [numeroPedido, setNumeroPedido] = useState([]);
  const [idCliente, setIdCliente] = useState(null);
  const [titulo, setTitulo] = useState("en Espera");

  const [modalPedido, setModalPedido] = useState(false);
  const [modalCliente, setModalCliente] = useState(false);

  ReloadData(urlPedidos, cargar, (x) => {
    setDatos(x?.datos);
    setCargar(false);
  });

  const [open, setOpen] = useState(true);
  const [datosBuscar, setDatosBuscar] = useState(null);

  const onlyNumber = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^\d+$/.test(keyValue) && ![8, 46, 37, 39].includes(keyCode)) {
      event.preventDefault();
    }
  };

  const BusquedaAvz = () => {
    return (
      <>
        <div className="d-flex py-2" style={{ justifyContent: "space-around" }}>
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

          <Form.Group className="d-flex flex-row align-items-center">
            <Form.Label className="fw-bold w-50">Número del pedido</Form.Label>
            <Form.Control
              className="mx-3 w-75"
              type="text"
              maxLength={5}
              defaultValue={datosBuscar?.num_pedido}
              onKeyDown={(e) => {
                onlyNumber(e);
              }}
              onChange={(event) => {
                busqueda.num_pedido = event.target.value;
              }}
            />
          </Form.Group>

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
        </div>
        <div className="d-flex justify-content-center">
          <BtnGuardar
            datos={busqueda}
            url={urlPedidos + "/buscar"}
            handleRespond={(x) => {
              setDatos(x);
              setTitulo(
                busqueda.status === "1"
                  ? "en Espera"
                  : busqueda.status === "2"
                  ? "Pagados"
                  : "Cancelados"
              );
              setDatosBuscar(busqueda);
              setOpen(!open);
            }}
            mensajeResp="Búsqueda Realizada"
          />
          <Button
            className="mx-2"
            variant="outline-secondary"
            disabled={!datosBuscar}
            onClick={() => {
              busqueda.num_pedido = "";
              busqueda.num_ident = "";
              setDatosBuscar({
                status: busqueda.status,
                num_pedido: "",
                num_ident: "",
              });
            }}
          >
            Limpiar
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      <Card body className="Card" style={{ minHeight: "70vh" }}>
        <Accordion>
          <Accordion.Item eventKey={open}>
            <Accordion.Header>
              <Form.Label className="fw-bold w-50 my-0">
                Filtro de Búsqueda
              </Form.Label>
              <hr />
            </Accordion.Header>
            <Accordion.Body>
              <BusquedaAvz />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {datos && (
          <TablaPedidos
            Titulo={"Pedidos " + titulo}
            filtro={datosBuscar}
            data={datos}
            reload={() => {
              const interval = setTimeout(() => {
                setCargar(true);
              }, 2000);
              return () => clearInterval(interval);
            }}
            detallesPedido={(item) => {
              setNumeroPedido(item);
              setModalPedido(true);
            }}
            detallesCliente={(item) => {
              setIdCliente(item);
              setModalCliente(true);
            }}
          />
        )}
      </Card>

      {modalPedido && (
        <PedidoDetalles
          data={numeroPedido}
          filtro={datosBuscar ?? { status: "1" }}
          show={modalPedido}
          onHide={() => setModalPedido(false)}
        />
      )}

      {modalCliente && (
        <ClienteDetalles
          data={idCliente}
          show={modalCliente}
          onHide={() => setModalCliente(false)}
        />
      )}
    </>
  );
};

export default RegistroVentas;
