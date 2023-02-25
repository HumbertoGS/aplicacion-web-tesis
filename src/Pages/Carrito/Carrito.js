import secureLocalStorage from "react-secure-storage";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";

import MensajeAlert from "../components/MensajeAlert";
import PedidoPdf from "../pdfs/Pedido";

import { PostData } from "../../custom-hooks/useFetch.js";
import { VisualizarPdf, getPdfBlob } from "../pdfs/FuncionesPdf";
import { Formik } from "formik";

const tablaCarrito = [
  { name: "PRODUCTO", width: "250px" },
  { name: "PRECIO", width: "auto" },
  { name: "CANTIDAD", width: "auto" },
  { name: "TOTAL", width: "auto" },
];

const urlDatosPersona = `${process.env.REACT_APP_API_CORE_URL}persona/buscar`;
const urlRegistrarPedido = `${process.env.REACT_APP_API_CORE_URL}pedido/registrar`;

const Carrito = ({ user }) => {
  const datosCarro = secureLocalStorage.getItem("datosCarrito");

  const disabledCampo = user ? true : false;
  const numIdent = user ? user.cedula : "";
  const datos = datosCarro
    ? datosCarro.length === 0
      ? { datos: [], totales: [] }
      : datosCarro
    : { datos: [], totales: [] };

  const [mensajeAlert, setMensajeAlert] = useState({
    mostrar: false,
    mensaje: "",
    variant: "",
  });

  const [guardar, setGuardar] = useState(false);
  const [buscar, setBuscar] = useState(user ? true : false);

  const [datosPedido, setDatosPedido] = useState(null);
  const [datosPdf, setDatosPdf] = useState(null);
  const [pdfPedido, setPdfPedido] = useState(false);

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
    let ordenes = datos.datos.map((item) => {
      return {
        id_cliente: values.id,
        id_producto: item.id,
        producto: item.nombre,
        cantidad: Number(item.cantidad),
        precio: item.precio,
        total_producto: item.total,
      };
    });

    setDatosPedido({
      orden: ordenes,
      totales: {
        subtotal: datos.totales[0].totales,
        descuento: datos.totales[1].totales,
        total: datos.totales[2].totales,
        total_pedido: ordenes.length,
      },
    });

    setGuardar(true);
  };

  PostData(urlRegistrarPedido, datosPedido, guardar, async (x) => {
    setGuardar(false);
    setDatosPdf(x.datos);
    setMensajeAlert({
      mostrar: true,
      mensaje:
        "Los datos de tu pedido ha sido registrado, por favor envianos el comprobante al numero 593xxxxxxxxx",
      variant: "success",
    });

    setPdfPedido(true);

    await getPdfBlob(
      <PedidoPdf datos={x.datos} />,
      `Pedido-${x.datos?.detalle?.num_pedido}.pdf`
    );

    secureLocalStorage.removeItem("datosCarrito");
  });

  useEffect(() => {
    if (mensajeAlert.mostrar) {
      const interval = setTimeout(() => {
        setMensajeAlert({ mostrar: false, mensaje: "", variant: "" });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [mensajeAlert.mostrar]);

  return (
    <>
      <Card body className="Card">
        {mensajeAlert.mostrar && (
          <MensajeAlert
            variant={mensajeAlert.variant}
            mensaje={mensajeAlert.mensaje}
          />
        )}

        {datos.datos.length === 0 ? (
          <Row>
            <Col className="pt-3">
              <Row>
                <div className="w-25"></div>
                <div className="w-50 mb-2">
                  <h5 className="text-center">Carrito de Compra</h5>
                  <hr />
                </div>
              </Row>
              <h6 className="pb-3">Su carrito actualmente está vacío</h6>
              <Link to="/Catalogo">
                <Button variant="outline-secondary">Volver al Catalogo</Button>
              </Link>
            </Col>
          </Row>
        ) : (
          <Row style={{ minHeight: "80vh", columnGap: "30px" }}>
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
                            <th key={index} width={item.width}>
                              {item.name}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {datos?.datos.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src={item.imagen}
                                  width="70"
                                  style={{
                                    marginRight: "12px",
                                  }}
                                  alt=""
                                ></img>
                                <div className="d-flex align-items-start flex-column w-75">
                                  <p className="text-start">{item?.nombre}</p>
                                  <p className="text-start">
                                    Talla {item?.talla}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>${item?.precio}</td>
                            <td>{item?.cantidad}</td>
                            <td>${item?.total}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
                <Row>
                  <Col md={6}></Col>
                  <Col>
                    <Table>
                      <thead></thead>
                      <tbody>
                        {datos?.totales.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="fw-bold">{item?.name}</td>
                              <td>${item?.totales}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col className="form-datos-carrito">
              <Card className="p-4 m-3">
                <Form.Text>
                  <h6>DATOS DE ENVIO</h6>
                  <hr />
                </Form.Text>
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
                    values,
                    isValid,
                    errors,
                  }) => (
                    <Form className="px-4" noValidate onSubmit={handleSubmit}>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="w-25">
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
                        <InputGroup.Text className="w-25">
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
                        <InputGroup.Text className="w-25">
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
                        <InputGroup.Text className="w-25">
                          Dirección
                        </InputGroup.Text>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          style={{ resize: "none" }}
                          name="direccion"
                          value={values.direccion}
                          onChange={handleChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="w-25">
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
                          )
                        }
                      >
                        Enviar Pedido
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card>
            </Col>
          </Row>
        )}
      </Card>

      {pdfPedido && (
        <VisualizarPdf
          children={<PedidoPdf datos={datosPdf} />}
          fileName={`Pedido-${datosPdf.detalle.num_pedido}.pdf`}
        />
      )}
    </>
  );
};

export default Carrito;
