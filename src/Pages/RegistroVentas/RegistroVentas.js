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

import ModalVentasDetalles from "./ModalVentasDetalles";
import ModalBtns from "./ModalBtns";
import ClienteDetalles from "./Modal/ClienteDetalles";

const datosP = [
  {
    id: 1,
    num_pedido: "#19473",
    num_identificacion: "0932432222",
    id_cliente: 2,
    cliente: "GUIRACOCHA SUAREZ LUIS HUMBERTO ",
    num_pedidos: 2,
    estado: true, //Cambia true cuando este aprobado
    validado: false,
    transferencia: "",
    status: "",
    detalles: [
      {
        producto: "camisa",
        precio_unidad: "15.00",
        cantidad: "1",
        total: "15.00",
      },
      {
        producto: "camisa",
        precio_unidad: "17.00",
        cantidad: "1",
        total: "17.00",
      },
    ],
  },
  {
    id: 2,
    num_pedido: "#19474",
    num_identificacion: "0932432222",
    cliente: "GUIRACOCHA HUMBERTO ",
    id_cliente: 3,
    num_pedidos: 5,
    estado: true, //Cambia true cuando este aprobado
    validado: false,
    transferencia: "",
    status: "",
    detalles: [
      {
        producto: "camisa",
        precio_unidad: "15.00",
        cantidad: "1",
        total: "15.00",
      },
      {
        producto: "camisa",
        precio_unidad: "17.00",
        cantidad: "1",
        total: "17.00",
      },
      {
        producto: "camisa",
        precio_unidad: "15.00",
        cantidad: "1",
        total: "15.00",
      },
      {
        producto: "camisa",
        precio_unidad: "17.00",
        cantidad: "1",
        total: "17.00",
      },
      {
        producto: "camisa",
        precio_unidad: "15.00",
        cantidad: "1",
        total: "15.00",
      },
    ],
  },
  {
    id: 7,
    num_pedido: "#19475",
    num_identificacion: "0932432222",
    id_cliente: 4,
    cliente: "GUIRACOCHA HUMBERTO ",
    num_pedidos: 1,
    estado: true, //Cambia true cuando este aprobado
    validado: false,
    transferencia: "",
    status: "",
    detalles: [
      {
        producto: "camisa",
        precio_unidad: "15.00",
        cantidad: "1",
        total: "15.00",
      },
    ],
  },
  {
    id: 3,
    num_pedido: "#19475",
    id_cliente: 2,
    num_identificacion: "0932432222",
    cliente: "GUIRACOCHA HUMBERTO ",
    num_pedidos: 1,
    estado: true, //Cambia true cuando este aprobado
    validado: false,
    transferencia: "",
    status: "",
    detalles: [
      {
        producto: "camisa",
        precio_unidad: "15.00",
        cantidad: "1",
        total: "15.00",
      },
    ],
  },
];

const RegistroVentas = () => {
  const [modal, setModal] = useState(false);
  const [datosDetalles, setDatosDetalles] = useState([]);
  const [idCliente, setIdCliente] = useState(null);
  const [valido, setValido] = useState(false);
  const [numero, setNumero] = useState("");

  const [modalPedido, setModalPedido] = useState(false);
  const [modalCliente, setModalCliente] = useState(false);

  const [datos, setDatos] = useState(datosP);

  return (
    <>
      <Card body className="Card" style={{ minHeight: "87vh" }}>
        <TablaPedidos
          Titulo="Pedidos en espera"
          data={datos}
          detallesPedido={(item) => {
            setDatosDetalles(item);
            setModalPedido(true);
          }}
          detallesCliente={(item) => {
            setIdCliente(item);
            setModalCliente(true);
          }}
        />
      </Card>

      {modalPedido ? (
        <ModalVentasDetalles
          detalles={datosDetalles}
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
