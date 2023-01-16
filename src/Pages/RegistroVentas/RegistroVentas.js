import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

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

const columns = [
  { name: "N°" },
  { name: "Identificacion" },
  { name: "Cliente" },
  { name: "N° pedidos" },
  { name: "Detalles" },
  { name: "N° transferencia" },
  { name: "Acciones" },
];

const datos = [
  {
    id: 1,
    num_venta: "#19473",
    num_identificacion: "0978000002",
    cliente: "GUIRACOCHA SUAREZ LUIS HUMBERTO ",
    num_pedidos: 2,
    estado: true, //Cambia true cuando este aprobado
    validado: false,
    numero_transferencia: "",
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
    num_venta: "#19474",
    num_identificacion: "0900000002",
    cliente: "GUIRACOCHA HUMBERTO ",
    num_pedidos: 5,
    estado: true, //Cambia true cuando este aprobado
    validado: true,
    numero_transferencia: "0024834763872",
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
    id: 3,
    num_venta: "#19475",
    num_identificacion: "0900550002",
    cliente: "GUIRACOCHA HUMBERTO ",
    num_pedidos: 1,
    estado: true, //Cambia true cuando este aprobado
    validado: false,
    numero_transferencia: "",
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
  const [valido, setValido] = useState(false);
  const [numero, setNumero] = useState("");

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Card body className="Card">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Registro_Ventas</Breadcrumb.Item>
        </Breadcrumb>
        <Card body>
          <h5 className="text-center">Registro de ventas</h5>
          <hr />
          <div style={{ overflowY: "auto" }}>
            <Table striped hover>
              <thead className="theadTable">
                <tr>
                  {columns.map((item, index) => {
                    return <th key={index}>{item.name}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {datos.map((item) => {
                  return !item.validado ? (
                    <tr key={item.id}>
                      <td>{item.num_venta}</td>
                      <td>{item.num_identificacion}</td>
                      <td>{item.cliente}</td>
                      <td>{item.num_pedidos}</td>
                      <td>
                        <Button
                          style={styleBtn}
                          onClick={() => {
                            setDatosDetalles(item);
                            setModal(true);
                          }}
                        >
                          <FaEye />
                        </Button>
                      </td>
                      <td key={item.id}>
                        <InputGroup size="sm">
                          <Form.Control
                            readOnly={item.validado}
                            disabled={item.validado}
                            value={item.numero_transferencia}
                            onChange={(event) => {
                              if (event.target.value !== "") {
                                item.numero_transferencia = event.target.value;
                                setNumero(event.target.value);
                                setValido(true);
                              } else {
                                item.numero_transferencia = "";
                                setValido(false);
                              }
                            }}
                          />
                        </InputGroup>
                      </td>
                      <td>
                        <div style={styleBtns}>
                          <Button
                            disabled={
                              item.validado
                                ? true
                                : item.numero_transferencia === ""
                            }
                            style={{ ...styleBtn, ...styleBtnSave }}
                            onClick={() => {
                              setDatosDetalles({
                                titulo: "Guardar registro de venta!!",
                                ...item,
                              });
                              setModalShow(true);
                            }}
                          >
                            <BsCheck2 />
                          </Button>
                          <Button
                            style={{
                              ...styleBtn,
                              ...styleBtnCancel,
                              display: item.validado ? "none" : "block",
                            }}
                            onClick={() => {
                              setDatosDetalles({
                                titulo: "Eliminar registro de venta!!",
                                id: item.id,
                                estado: item.estado,
                              });
                              setModalShow(true);
                            }}
                          >
                            <IoMdClose />
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
        </Card>
      </Card>
      {modal ? (
        <ModalVentasDetalles
          detalles={datosDetalles}
          show={modal}
          onHide={() => setModal(false)}
        />
      ) : modalShow ? (
        <ModalBtns
          detalles={datosDetalles}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default RegistroVentas;
