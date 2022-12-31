import { useEffect, useState } from "react";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";

const datos = {
  datos: [
    {
      imagen: "logo512.png",
      producto: "camisa",
      precio_unidad: "15.00",
      cantidad: "1",
      talla: "S",
      total: "15.00",
    },
    {
      imagen: "logo512.png",
      producto: "camisa roja",
      precio_unidad: "17.00",
      cantidad: "1",
      talla: "S",
      total: "17.00",
    },
    {
      imagen: "logo512.png",
      producto: "camisa",
      precio_unidad: "17.20",
      cantidad: "1",
      talla: "M",
      total: "17.20",
    },
    {
      imagen: "logo512.png",
      producto: "camisa",
      precio_unidad: "15.00",
      cantidad: "1",
      talla: "S",
      total: "15.00",
    },
    {
      imagen: "logo512.png",
      producto: "camisa roja",
      precio_unidad: "17.00",
      cantidad: "1",
      talla: "S",
      total: "17.00",
    },
    {
      imagen: "logo512.png",
      producto: "camisa",
      precio_unidad: "17.20",
      cantidad: "1",
      talla: "M",
      total: "17.20",
    },
  ],
  totales: [
    { name: "Subtotal", totales: "49.20" },
    { name: "Total", totales: "49.20" },
  ],
};

const columns = [
  { name: "PRODUCTO" },
  { name: "PRECIO" },
  { name: "CANTIDAD" },
  { name: "TOTAL" },
];

const datosSimulado = [
  {
    identificacion: "12345",
    nombre: "Luis Humberto",
    apellidos: "Guiracocha Suarez",
    direccion: "Lorenzo de Garaycoa y sucre",
    referencia: "frente a tia",
  },
  {
    identificacion: "123455",
    nombre: "Roberto J.",
    apellidos: "Suarez Torres",
    direccion: "sucre",
    referencia: "frente a local 1519",
  },
];

const Carrito = () => {
  const [numIdent, setNumIdent] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [referncia, setReferencia] = useState("");

  const [tieneDatos, setTieneDatos] = useState(false);

  const VerificarDatos = () => {
    const indexOf = datosSimulado
      .map((item) => item.identificacion)
      .indexOf(numIdent);

    if (indexOf != -1) {
      setNombre(datosSimulado[indexOf].nombre);
      setApellido(datosSimulado[indexOf].apellidos);
      setDireccion(datosSimulado[indexOf].direccion);
      setReferencia(datosSimulado[indexOf].referencia);

      setTieneDatos(true);
    } else {
      setNombre("");
      setApellido("");
      setDireccion("");
      setReferencia("");
      setTieneDatos(false);
    }
  };

  return (
    <>
      <Card body className="Card" style={{ border: "0" }}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Carrito</Breadcrumb.Item>
        </Breadcrumb>
        {/* contenedores para el cuerpo */}
        <Card style={{ height: "86vh" }}>
          <Row>
            <Col xs={8}>
              <div className="m-4">
                <h6 className="text-center">Datos del Carrito</h6>
                <hr />
                <Card className="p-3" style={{ maxHeight: "72vh" }}>
                  <div style={{ overflowY: "auto" }}>
                    <Table striped hover>
                      <thead>
                        <tr>
                          {columns.map((item, index) => {
                            return (
                              <th
                                key={index}
                                width={
                                  item.name === "PRODUCTO" ? "300px" : "auto"
                                }
                              >
                                {item.name}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {datos.datos.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <img src={item.imagen} width="70"></img>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      marginLeft: "24px",
                                      width: "70%",
                                    }}
                                  >
                                    <p className="text-start">
                                      {item.producto}
                                    </p>
                                    <p className="text-start">
                                      Talla {item.talla}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>${item.precio_unidad}</td>
                              <td>{item.cantidad}</td>
                              <td>${item.total}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                  <Table striped hover>
                    <thead></thead>
                    <tbody>
                      {datos.totales.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td></td>
                            <td>
                              <b>{item.name}</b>
                            </td>
                            <td></td>
                            <td>${item.totales}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Col>
            <Col className="form-datos-carrito">
              <Card className="p-4 m-3">
                <h6 className="text-center">Numero Identificación</h6>
                <InputGroup className="mb-3">
                  <Form.Control
                    onChange={(e) => {
                      setNumIdent(e.target.value);
                    }}
                  />
                  <Button onClick={VerificarDatos}>Buscar</Button>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Nombres</InputGroup.Text>
                  <Form.Control
                    disabled={tieneDatos}
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Apellidos</InputGroup.Text>
                  <Form.Control
                    disabled={tieneDatos}
                    value={apellido}
                    onChange={(e) => {
                      setApellido(e.target.value);
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Dirección</InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    rows={3}
                    style={{ resize: "none" }}
                    disabled={tieneDatos}
                    value={direccion}
                    onChange={(e) => {
                      setDireccion(e.target.value);
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Referencia</InputGroup.Text>
                  <Form.Control
                    disabled={tieneDatos}
                    value={referncia}
                    onChange={(e) => {
                      setReferencia(e.target.value);
                    }}
                  />
                </InputGroup>
                <Button>Enviar Pedido</Button>
              </Card>
            </Col>
          </Row>
        </Card>
      </Card>
    </>
  );
};

export default Carrito;
