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
} from "../../src/Pages/designer/styleBtn";

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
  },
];

const style = {
  fontSize: "13px",
  border: "0px",
};

const RegistroVentas = () => {
  const [modal, setModal] = useState(false);
  const [valido, setValido] = useState(false);
  const [numero, setNumero] = useState("");

  return (
    <>
      <Card body style={style}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
        <Card body>
          <Form.Label className="mb-3">
            <h6>Registro de ventas</h6>
          </Form.Label>
          <Table striped bordered hover>
            <thead>
              <tr>
                {columns.map((item, index) => {
                  return <th key={index}>{item.name}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {datos.map((item) => {
                return item.estado ? (
                  <tr key={item.id}>
                    <td>{item.num_venta}</td>
                    <td>{item.num_identificacion}</td>
                    <td>{item.cliente}</td>
                    <td>{item.num_pedidos}</td>
                    <td>
                      <Button
                        style={styleBtn}
                        onClick={() => {
                          console.log(item.id);
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
                            console.log(item);
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
                            item.estado = false;
                            console.log(
                              "ID:" + item.id + " Estado:" + item.estado
                            );
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
        </Card>
      </Card>
    </>
  );
};

export default RegistroVentas;
