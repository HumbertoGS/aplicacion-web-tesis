import { useState } from "react";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { PostData } from "../../custom-hooks/useFetch";
import TablaPedidos from "../RegistroVentas/TablaPedidos";
import BusquedaAvz from "../components/Busqueda";
import PedidoDetalles from "../RegistroVentas/Modal/PedidoDetalles";

const urlPedidos = `${process.env.REACT_APP_API_CORE_URL}pedido/buscar`;

const StatusPedido = ({ user }) => {
  const [datos, setDatos] = useState(null);
  const [cargar, setCargar] = useState(true);

  const [modalPedido, setModalPedido] = useState(false);
  const [numeroPedido, setNumeroPedido] = useState([]);

  PostData(urlPedidos, { status: 1, num_ident: user?.cedula }, cargar, (x) => {
    setDatos(x?.datos);
    setCargar(false);
  });

  const [open, setOpen] = useState(true);
  const [datosBuscar, setDatosBuscar] = useState({
    status: 1,
    num_pedido: "",
    num_ident: user?.cedula,
  });
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
      <Card body className="Card">
        <div className="mx-2 pt-2" style={{ width: "50%" }}>
          <h5 className="text-start">Estado del Pedido</h5>
          <hr />
        </div>

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
                url={urlPedidos}
                datosBuscar={datosBuscar}
                estado={true}
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
            estado={true}
            reload={() => {}}
            detallesPedido={(item) => {
              setNumeroPedido(item);
              setModalPedido(true);
            }}
            detallesCliente={(item) => {}}
          />
        )}

        {modalPedido && (
          <PedidoDetalles
            data={numeroPedido}
            filtro={datosBuscar ?? { status: "1" }}
            show={modalPedido}
            onHide={() => setModalPedido(false)}
          />
        )}
      </Card>
    </>
  );
};

export default StatusPedido;
