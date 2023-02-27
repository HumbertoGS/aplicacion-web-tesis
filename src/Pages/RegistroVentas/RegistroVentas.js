import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import TablaPedidos from "./TablaPedidos";
import PedidoDetalles from "./Modal/PedidoDetalles";
import ClienteDetalles from "./Modal/ClienteDetalles";
import BusquedaAvz from "../components/Busqueda";

import { ReloadData } from "../../custom-hooks/useFetch";

const urlPedidos = `${process.env.REACT_APP_API_CORE_URL}pedido`;

const RegistroVentas = ({ user }) => {
  const [datos, setDatos] = useState(null);
  const [cargar, setCargar] = useState(true);

  const [numeroPedido, setNumeroPedido] = useState([]);
  const [idCliente, setIdCliente] = useState(null);

  const [modalPedido, setModalPedido] = useState(false);
  const [modalCliente, setModalCliente] = useState(false);

  ReloadData(urlPedidos, cargar, (x) => {
    setDatos(x?.datos);
    setCargar(false);
  });

  const [open, setOpen] = useState(true);
  const [datosBuscar, setDatosBuscar] = useState(null);
  const [titulo, setTitulo] = useState("en Espera");

  const handleRespondBusq = (x, busqueda) => {
    setTitulo(
      busqueda.status === "1"
        ? "en Espera"
        : busqueda.status === "2"
        ? "Pagados"
        : "Cancelados"
    );
    setDatosBuscar(busqueda);
    setDatos(x);
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
              <BusquedaAvz
                url={urlPedidos + "/buscar"}
                datosBuscar={datosBuscar}
                resetFiltre={(resetData) => {
                  setDatosBuscar(resetData);
                }}
                closedBusq={() => {
                  setOpen(!open);
                }}
                handleRespond={handleRespondBusq}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {datos && (
          <TablaPedidos
            Titulo={"Pedidos " + titulo}
            filtro={datosBuscar}
            data={datos}
            reload={() => {
              setCargar(true);
            }}
            detallesPedido={(item) => {
              setNumeroPedido(item);
              setModalPedido(true);
            }}
            detallesCliente={(item) => {
              setIdCliente(item);
              setModalCliente(true);
            }}
            user={user}
          />
        )}
      </Card>

      {modalPedido && (
        <PedidoDetalles
          data={numeroPedido}
          filtro={datosBuscar ?? { status: "1" }}
          show={modalPedido}
          onHide={() => setModalPedido(false)}
          reload={() => {
            setCargar(true);
          }}
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
