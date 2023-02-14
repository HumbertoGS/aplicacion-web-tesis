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

const columns = [
  [
    { name: "", colSpan: 1, style: { borderRight: "1px solid #c8c9ca" } },
    {
      name: "Cliente",
      colSpan: 2,
      style: { borderRight: "1px solid #c8c9ca" },
    },
    { name: "Pedido", colSpan: 3, style: { borderRight: "1px solid #c8c9ca" } },
    { name: "", colSpan: 2 },
  ],
  [
    {
      name: "N° Pedido",
      style: { width: "9%", borderRight: "1px solid #c8c9ca" },
    },
    { name: "Cliente", style: { width: "200px" } },
    {
      name: "Detalles",
      style: { width: "10%", borderRight: "1px solid #c8c9ca" },
    },
    { name: "N° Productos", style: { width: "11%" } },
    { name: "Total", style: { width: "9%" } },
    {
      name: "Detalles",
      style: { width: "10%", borderRight: "1px solid #c8c9ca" },
    },
    { name: "N° transferencia", style: { width: "300px" } },
    { name: "Acciones", style: { width: "22%" } },
  ],
];

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
        {/* <div className="my-4 mx-3">
          <h5 className="text-center">Pedidos en Espera</h5>
          <hr />
          <div style={{ overflowY: "auto" }}>
            <Table striped hover>
              <thead className="theadTable">
                {columns.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <th
                        key={j}
                        colSpan={cell.colSpan || 1}
                        style={cell.style || null}
                      >
                        {cell.name}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {datos.map((item, index) => {
                  return !item.validado && item.estado ? (
                    <tr key={item.id}>
                      <td>{item.num_pedido}</td>
                      <td>{item.num_identificacion}</td>
                      <td>
                        <Button
                          style={styleBtn}
                          onClick={() => {
                            setDatosDetalles(item);
                            setModal(true);
                          }}
                          variant="outline-secondary"
                        >
                          <FaEye />
                        </Button>
                      </td>
                      <td>{item.num_pedidos}</td>
                      <td>$15.50</td>
                      <td>
                        <Button
                          style={styleBtn}
                          onClick={() => {
                            setDatosDetalles(item);
                            setModal(true);
                          }}
                          variant="outline-secondary"
                        >
                          <FaEye />
                        </Button>
                      </td>
                      <td>
                        <InputGroup>
                          <Form.Control
                            style={{ marginLeft: "10px" }}
                            readOnly={item.validado}
                            disabled={item.validado}
                            value={item.transferencia}
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                          />
                        </InputGroup>
                      </td>
                      <td>
                        <div style={styleBtns}>
                          <Form.Select
                            className="mx-2"
                            value={item.status}
                            onChange={(event) =>
                              handleSelectChange(event, index)
                            }
                          >
                            <option value="">Seleccione una opcion</option>
                            <option value="1">Pendiente</option>
                            <option value="2">Pagado</option>
                            <option value="0">Cancelado</option>
                          </Form.Select>
                          <Button
                            disabled={item.transferencia === ""}
                            style={{ ...styleBtn, ...styleBtnSave }}
                            onClick={() => handleButtonClick(index)}
                          >
                            <BsCheck2 />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <></>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div> */}
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
      ) : modalCliente ? (
        <ClienteDetalles
          data={idCliente}
          show={modalCliente}
          onHide={() => setModalCliente(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default RegistroVentas;
