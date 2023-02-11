import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";

import MensajeAlert from "./components/MensajeAlert";

import { PostData } from "../custom-hooks/useFetch.js";
import { Formik } from "formik";

import {
  BlobProvider,
  PDFViewer,
  ReactPDF,
  PDFDownloadLink,
} from "@react-pdf/renderer";

import PedidoPdf from "./pdfs/Pedido";

const tablaCarrito = [
  { name: "PRODUCTO" },
  { name: "PRECIO" },
  { name: "CANTIDAD" },
  { name: "TOTAL" },
];

const urlDatosPersona = process.env.REACT_APP_API_CORE_URL + "persona/buscar";

const Carrito = ({ user }) => {
  // const datosCarro = JSON.parse(localStorage.getItem("datosCarrito"));
  const datosCarro = secureLocalStorage.getItem("datosCarrito");

  const disabledCampo = user ? true : false;
  const numIdent = user ? user.cedula : "";
  const datos = datosCarro
    ? datosCarro.length == 0
      ? { datos: [], totales: [] }
      : datosCarro
    : { datos: [], totales: [] };

  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("");

  const [guardar, setGuardar] = useState(false);
  const [buscar, setBuscar] = useState(user ? true : false);

  const [datosPedido, setDatosPedido] = useState(null);

  const [datosPersona, setDatosPersona] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    direccion: "",
    referencia: "",
    telefono: "",
    correo: "",
  });

  //----------CARGAMOS DATOS Y RECARGAMOS DATOS-------------

  PostData(urlDatosPersona, { numIdent }, buscar, (x) => {
    setDatosPersona(x.datos[0]);
    setBuscar(false);
  });

  const enviarPedido = (values) => {
    console.log("click!!");
    console.log(values);

    setDatosPedido(values);
    setGuardar(true);

    setVariant("success");
    setMensaje(
      "Los datos de tu pedido ha sido registrado, por favor envianos el comprobante al numero 593xxxxxxxxx"
    );
    setPdfPedido(true);
    // secureLocalStorage.removeItem("datosCarrito");
  };

  const respuesta = (datos) => {
    setGuardar(false);
  };

  // PostData(url, datosPedido, guardar, respuesta);

  useEffect(() => {
    if (variant) {
      const interval = setTimeout(() => {
        setVariant("");
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [variant]);

  const [pdfPedido, setPdfPedido] = useState(false);

  // const handleDownloadClick = () => {
  //   if (!pdfBlob || !isMounted) {
  //     return;
  //   }

  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(pdfBlob);
  //   link.download = "data.pdf";
  //   link.click();
  // };

  return (
    <>
      <Card body className="Card">
        {variant ? <MensajeAlert variant={variant} mensaje={mensaje} /> : <></>}
        <Row style={{ minHeight: "80vh" }}>
          <Col xs={12} md={7}>
            <div className="mt-4 mx-2">
              <h5 className="text-center pb-2">Datos del Carrito</h5>
              <hr />
              <div style={{ overflowY: "auto" }}>
                <Table striped hover>
                  <thead className="theadTable">
                    <tr>
                      {tablaCarrito.map((item, index) => {
                        return (
                          <th
                            key={index}
                            width={item.name === "PRODUCTO" ? "250px" : "auto"}
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
                                  {item.nombre ?? item.nombre_categoria}
                                </p>
                                <p className="text-start">Talla {item.talla}</p>
                              </div>
                            </div>
                          </td>
                          <td>${item.precio}</td>
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
              <Formik
                enableReinitialize={true}
                initialValues={datosPersona}
                onSubmit={(values, { resetForm }) => {
                  enviarPedido(values);
                  resetForm();
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (
                  <Form className="px-4" noValidate onSubmit={handleSubmit}>
                    <Form.Text>
                      <h6>DATOS DE ENVIO</h6>
                      <hr />
                    </Form.Text>

                    <InputGroup className="mb-3">
                      <InputGroup.Text style={{ width: "100px" }}>
                        Cédula
                      </InputGroup.Text>
                      <Form.Control
                        disabled={disabledCampo}
                        name="cedula"
                        value={values.cedula}
                        onChange={handleChange}
                        maxLength={10}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text style={{ width: "100px" }}>
                        Nombres
                      </InputGroup.Text>
                      <Form.Control
                        disabled={disabledCampo}
                        name="nombre"
                        value={values.nombre}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text style={{ width: "100px" }}>
                        Apellidos
                      </InputGroup.Text>
                      <Form.Control
                        disabled={disabledCampo}
                        name="apellido"
                        value={values.apellido}
                        onChange={handleChange}
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
                        name="direccion"
                        value={values.direccion}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text style={{ width: "100px" }}>
                        Referencia
                      </InputGroup.Text>
                      <Form.Control
                        name="referencia"
                        value={values.referencia}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <Button
                      className="w-100"
                      type="submit"
                      variant="outline-secondary"
                      disabled={
                        !(
                          values.apellido &&
                          values.cedula &&
                          values.direccion &&
                          values.nombre &&
                          values.referencia
                        ) || datos.datos.length == 0
                      }
                      // href="https://api.whatsapp.com/send?phone=593979930524&text=Hola, quisiera estos pedidos"
                    >
                      Enviar Pedido
                    </Button>
                    {/* <PDFDownloadLink
                      document={<PedidoPdf />}
                      fileName="Pedido-0001.pdf"
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? "Loading document..." : "Download now!"
                      }
                    </PDFDownloadLink> */}
                  </Form>
                )}
              </Formik>
            </Card>
          </Col>
        </Row>
      </Card>

      <div style={{ width: "100%", height: "90vh" }}>
        <PDFViewer style={{ width: "100%", height: "90vh" }}>
          <PedidoPdf datos={datos} />
        </PDFViewer>
      </div>
    </>
  );
};

export default Carrito;
