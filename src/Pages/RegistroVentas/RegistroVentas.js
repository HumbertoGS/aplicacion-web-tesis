import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import TablaPedidos from "./TablaPedidos";

import { FaEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BsCheck2 } from "react-icons/bs";

import {
  styleBtn,
  styleBtnCancel,
  styleBtnSave,
  styleBtns,
} from "../designer/styleBtn";

import PedidoDetalles from "./Modal/PedidoDetalles";
import ModalBtns from "./ModalBtns";
import ClienteDetalles from "./Modal/ClienteDetalles";
import { PostData, ReloadData } from "../../custom-hooks/useFetch";

const urlPedidos = `${process.env.REACT_APP_API_CORE_URL}pedido/`;

const RegistroVentas = () => {
  const [cargar, setCargar] = useState(true);
  const [numeroPedido, setNumeroPedido] = useState([]);
  const [idCliente, setIdCliente] = useState(null);
  const [valido, setValido] = useState(false);
  const [numero, setNumero] = useState("");

  const [modalPedido, setModalPedido] = useState(false);
  const [modalCliente, setModalCliente] = useState(false);

  const [datos, setDatos] = useState(null);

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

      {modalPedido ? (
        <PedidoDetalles
          data={numeroPedido}
          show={modalPedido}
          onHide={() => setModalPedido(false)}
        />
      ) : null}

      {modalCliente ? (
        <ClienteDetalles
          data={idCliente}
          show={modalCliente}
          onHide={() => setModalCliente(false)}
        />
      ) : null}
    </>
  );
};

export default RegistroVentas;
