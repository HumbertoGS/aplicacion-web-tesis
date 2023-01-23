import { useEffect, useState } from "react";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";

import MensajeAlert from "./MensajeAlert";

import { PostData } from "../custom-hooks/useFetch.js";

const url = process.env.REACT_APP_API_CORE_URL + "persona/buscar";

const columns = [
  { name: "PRODUCTO" },
  { name: "PRECIO" },
  { name: "CANTIDAD" },
  { name: "TOTAL" },
];

const datoDefault = {
  cedula: "",
  nombre: "",
  apellido: "",
  direccion: "",
  referencia: "",
};

const Carrito = () => {
  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("");

  const [validar, setValidar] = useState(false);

  const [numIdent, setNumIdent] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [referencia, setReferencia] = useState("");

  const datosCarro = JSON.parse(localStorage.getItem("datosCarrito"));
  const datos = datosCarro
    ? datosCarro.length == 0
      ? { datos: [], totales: [] }
      : datosCarro
    : { datos: [], totales: [] };

  const validarCampo = () => {
    if (numIdent == "") {
      setVariant("info");
      setMensaje("Ingresa numero identificacion");
      resetCampos();
    } else {
      setNumIdent(numIdent);
      setValidar(true);
    }
  };

  const enviarPedido = () => {
    console.log("click!!");
    if (nombre && apellido && direccion && referencia && numIdent) {
      let data = [
        {
          num_identificacion: numIdent,
          nombre: nombre,
          apellido: apellido,
          num_pedidos: datos.datos.length,
          detalles: datos.datos,
        },
      ];

      console.log(data);

      setVariant("success");
      setMensaje(
        "Los datos de tu pedido ha sido registrado, por favor envianos el comprobante al numero 593xxxxxxxxx"
      );
    }
  };

  const respuesta = (datos) => {
    setValidar(false);

    if (datos.datos.length !== 0) {
      setNumIdent(datos.datos[0].cedula);
      setNombre(datos.datos[0].nombre);
      setApellido(datos.datos[0].apellido);
      setDireccion(datos.datos[0].direccion);
      setReferencia(datos.datos[0].referencia);

      setVariant("success");
      setMensaje("datos ya registrados");
    } else {
      resetCampos();
      setVariant("info");
      setMensaje(
        "numero identificacion no está registrado, completa los datos requeridos"
      );
    }
  };

  const resetCampos = () => {
    setNombre(datoDefault.nombre);
    setApellido(datoDefault.apellido);
    setDireccion(datoDefault.direccion);
    setReferencia(datoDefault.referencia);
  };

  PostData(url, { numIdent }, validar, respuesta);

  useEffect(() => {
    if (variant) {
      const interval = setTimeout(() => {
        setVariant("");
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [variant]);

  return (
    <>
      <Card body className="Card">
        {variant ? <MensajeAlert variant={variant} mensaje={mensaje} /> : <></>}
        <Breadcrumb>
          <Breadcrumb.Item href="Inicio">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Carrito</Breadcrumb.Item>
        </Breadcrumb>
        {/* contenedores para el cuerpo */}
        <Card>
          <Row style={{ minHeight: "87vh" }}>
            <Col xs={7}>
              <div className="m-4">
                <h5 className="text-center">Datos del Carrito</h5>
                <hr />
                <div style={{ overflowY: "auto" }}>
                  <Table striped hover>
                    <thead className="theadTable">
                      <tr>
                        {columns.map((item, index) => {
                          return (
                            <th
                              key={index}
                              width={
                                item.name === "PRODUCTO" ? "250px" : "auto"
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
                    </tbody>
                  </Table>
                </div>
                <Table striped hover>
                  <thead></thead>
                  <tbody>
                    {datos.totales.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td width={"300px"}></td>
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
              </div>
            </Col>
            <Col className="form-datos-carrito">
              <Card className="p-4 m-3">
                <h5>DATOS DE ENVIO</h5>
                <hr />
                <h6 className="text-center pb-2">Buscar datos registrados</h6>
                <InputGroup className="mb-3">
                  <InputGroup.Text style={{ width: "100px" }}>
                    Identificación
                  </InputGroup.Text>
                  <Form.Control
                    onChange={(e) => {
                      setNumIdent(e.target.value);
                    }}
                    maxLength={10}
                  />
                  <Button onClick={validarCampo}>Buscar</Button>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text style={{ width: "100px" }}>
                    Nombres
                  </InputGroup.Text>
                  <Form.Control
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text style={{ width: "100px" }}>
                    Apellidos
                  </InputGroup.Text>
                  <Form.Control
                    value={apellido}
                    onChange={(e) => {
                      setApellido(e.target.value);
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text style={{ width: "100px" }}>
                    Dirección
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    rows={3}
                    style={{ resize: "none" }}
                    value={direccion}
                    onChange={(e) => {
                      setDireccion(e.target.value);
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text style={{ width: "100px" }}>
                    Referencia
                  </InputGroup.Text>
                  <Form.Control
                    value={referencia}
                    onChange={(e) => {
                      setReferencia(e.target.value);
                    }}
                  />
                </InputGroup>
                <Button
                  disabled={
                    !(nombre && apellido && direccion && referencia && numIdent)
                  }
                  onClick={enviarPedido}
                  // href="https://api.whatsapp.com/send?phone=593979930524&text=Hola, quisiera estos pedidos"
                >
                  Enviar Pedido
                </Button>
              </Card>
            </Col>
          </Row>
        </Card>
      </Card>
    </>
  );
};

export default Carrito;
