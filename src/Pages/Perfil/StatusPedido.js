import { useEffect, useState } from "react";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import MensajeAlert from "../MensajeAlert";

import HeaderPerfil from "./HeaderPerfil";

const Pedidos = [
  {
    codigo: "12345",
    producto: "camisa",
    precio: "15.00",
    cantidad: "1",
    total: "15.00",
    status: "Pendiente",
  },
  {
    codigo: "12346",
    producto: "camisa",
    precio: "17.00",
    cantidad: "1",
    total: "17.00",
    status: "Pendiente",
  },
  {
    codigo: "12347",
    producto: "camisa",
    precio: "15.00",
    cantidad: "1",
    total: "15.00",
    status: "Pendiente",
  },
  {
    codigo: "12348",
    producto: "camisa",
    precio: "17.00",
    cantidad: "1",
    total: "17.00",
    status: "Pendiente",
  },
  {
    codigo: "12349",
    producto: "camisa",
    precio: "15.00",
    cantidad: "1",
    total: "15.00",
    status: "Pendiente",
  },
];

const StatusPedido = ({ user, usuario }) => {
  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("");

  const [pedido, setPedido] = useState("");
  const [mensajeTabla, setMensajeTabla] = useState("Ingresa un num pedido");
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    if (variant) {
      const interval = setTimeout(() => {
        setVariant("");
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [variant]);

  const buscarPedido = () => {
    let filtrado = Pedidos.filter((data) => data.codigo === pedido);
    if (filtrado.length > 0) {
      setProducto(filtrado);
      setVariant("success");
      setMensaje("Pedido Encontrado");
    } else {
      setProducto([]);
      setMensajeTabla("No existe pedido");
    }
  };

  return (
    <>
      <Card body style={{ height: "80vh" }} className="Card">
        {/* <HeaderPerfil user={user} usuario={usuario} /> */}
        {/* <Card style={{ height: "87vh" }}> */}
          <div className="mx-4 mt-4">
            <h5 className="text-center">Estado del Pedido</h5>
            <hr />
          </div>
          <div className="m-4" style={{ width: "400px" }}>
            <InputGroup className="mb-3">
              <InputGroup.Text style={{ width: "100px" }}>
                N° Pedido
              </InputGroup.Text>
              <Form.Control
                maxLength={10}
                onChange={(event) => {
                  setPedido(event.target.value);
                  if (event.target.value === "") {
                    setProducto([]);
                    setMensajeTabla("Ingresa un num pedido");
                  }
                }}
              />
              <Button onClick={buscarPedido} disabled={!pedido}>
                Buscar
              </Button>
            </InputGroup>
          </div>
          <div className="p-4" style={{ overflowY: "auto", height: "300px" }}>
            <Table>
              <thead className="theadTable">
                <tr>
                  <th>Codigo</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {producto.length !== 0 ? (
                  producto.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.codigo}</td>
                        <td>{item.producto}</td>
                        <td>{item.precio}</td>
                        <td>{item.cantidad}</td>
                        <td>{item.total}</td>
                        <td>{item.status}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6}>{mensajeTabla}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card>
      {/* </Card> */}
    </>
  );
};

export default StatusPedido;
