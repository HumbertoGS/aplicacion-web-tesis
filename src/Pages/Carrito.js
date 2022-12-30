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

const Carrito = () => {
  return (
    <>
      <Card body className="Card">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Carrito</Breadcrumb.Item>
        </Breadcrumb>
        {/* contenedores para el cuerpo */}
        <Card style={{ height: "85vh" }}>
          <Row>
            <Col xs={8}>
              <div className="m-4" style={{}}>
                <h6 className="text-center">Datos del Carrito</h6>
                <hr />
                <Card className="p-3">
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
                                  <p className="text-start">{item.producto}</p>
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
                      {datos.totales.map((item, index) => {
                        return (
                          <tr>
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
            <Col>
              <div className="m-4" style={{}}>
                <h6 className="text-center">Numero Identificación</h6>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                  />
                  <Button variant="outline-secondary" id="button-addon1">
                    Validar
                  </Button>
                </InputGroup>
              </div>
            </Col>
          </Row>
        </Card>
      </Card>
    </>
  );
};

export default Carrito;
