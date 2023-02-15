import { useState } from "react";
import Card from "react-bootstrap/Card";

import TablaPedidos from "./TablaPedidos";
import PedidoDetalles from "./Modal/PedidoDetalles";
import ClienteDetalles from "./Modal/ClienteDetalles";

import { ReloadData } from "../../custom-hooks/useFetch";

const urlPedidos = `${process.env.REACT_APP_API_CORE_URL}pedido/`;

const RegistroVentas = () => {
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

  return (
    <>
      <Card body className="Card" style={{ minHeight: "70vh" }}>
        {datos && (
          <TablaPedidos
            Titulo="Pedidos en espera"
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
