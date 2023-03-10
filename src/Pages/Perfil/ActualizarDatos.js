import { useState } from "react";
import secureLocalStorage from "react-secure-storage";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";

import { Formik } from "formik";
import "../designer/theme.css";

import HeaderPerfil from "./HeaderPerfil";
import TablaEmpleados from "./TablaEmpleados";
import StatusPedido from "./StatusPedido";
import Reportes from "./Reportes";
import Graficos from "./Graficos";

import { PostData } from "../../custom-hooks/useFetch";
import { BtnGuardar } from "../components/BtnAccion";

const url = process.env.REACT_APP_API_CORE_URL + "persona";

const ActualizarDatos = ({ user }) => {
  const [actualizar, setActualizar] = useState(user?.permisos !== 1);
  const [opciones, setOpciones] = useState(false);
  const [reporte, setReporte] = useState(false);
  const [grafica, setGrafica] = useState(user?.permisos === 1);

  const [buscar, setBuscar] = useState(true);
  const nombre_usuario = user?.nombre;

  const [datosPDF, setDatosPDF] = useState(null);
  const [datos, setDatos] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    direccion: "",
    referencia: "",
    telefono: "",
    correo: "",
  });

  //----------CARGAMOS DATOS-------------
  PostData(url + "/buscar", { numIdent: user?.cedula }, buscar, (x) => {
    setDatos(x.datos[0]);
    setBuscar(false);
  });

  //-----------ACTUALIZAMOS DATOS---------------
  const handleRespond = (response) => {
    if (response.length !== 0) {
      secureLocalStorage.setItem("user", {
        nombre: response[0].nombre,
        cedula: response[0].cedula,
        permisos: response[0].id_rol,
      });
    } else {
      secureLocalStorage.removeItem("user");
    }

    setBuscar(true);

    if (nombre_usuario !== response[0].nombre) {
      window.location.href = process.env.REACT_APP_BASENAME + "Inicio";
    }
  };

  const [fecha, setFecha] = useState({});

  return (
    <>
      {/* <Card style={{ height: "80vh" }} className="Card"> */}
      <Card body className="Card">
        <Card className="Card pt-2">
          <HeaderPerfil
            user={user}
            state={{ reporte, opciones, actualizar, grafica }}
            estados={(data) => {
              setReporte(data.reporte);
              setActualizar(data.actualizar);
              setOpciones(data.opciones);
              setGrafica(data.grafica);
            }}
          />

          {reporte && (
            <Reportes
              datosPDF={datosPDF}
              fechaGraf={(x) => {
                setFecha(x);
              }}
              fechaRep={fecha}
            />
          )}

          {grafica && (
            <Graficos
              setDatosPDF={(x) => {
                setDatosPDF(x);
              }}
              fecha={fecha}
            />
          )}

          {actualizar && (
            <div className="py-2" style={{ height: "70vh" }}>
              <Card className="Card pt-3">
                <div className="mx-4" style={{ width: "50%" }}>
                  <h5 className="text-start">Datos del Perfil</h5>
                  <hr />
                </div>
                <Row className="justify-content-center">
                  <Col md={9}>
                    <Card className="my-2 px-5 mx-3 py-5">
                      <Formik enableReinitialize={true} initialValues={datos}>
                        {({ handleChange, values, isValid, errors }) => (
                          <Form className="px-2 pt-2" noValidate>
                            <Row>
                              <Col md={6}>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text className="w-25">
                                    Cédula:
                                  </InputGroup.Text>
                                  <Form.Control
                                    className="w-75 noEdit"
                                    disabled={true}
                                    name="cedula"
                                    value={values.cedula}
                                    onChange={handleChange}
                                    maxLength={10}
                                  />
                                </InputGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text className="w-25">
                                    Nombres:
                                  </InputGroup.Text>
                                  <Form.Control
                                    autoComplete="off"
                                    className="w-75 noEdit"
                                    disabled={true}
                                    name="nombre"
                                    value={values.nombre}
                                    onChange={handleChange}
                                  />
                                </InputGroup>
                              </Col>
                              <Col md={6}>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text className="w-25">
                                    Apellidos:
                                  </InputGroup.Text>
                                  <Form.Control
                                    className="w-75 noEdit"
                                    autoComplete="off"
                                    disabled={true}
                                    name="apellido"
                                    value={values.apellido}
                                    onChange={handleChange}
                                  />
                                </InputGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text className="w-25">
                                    Correo:
                                  </InputGroup.Text>
                                  <Form.Control
                                    className="w-75"
                                    autoComplete="off"
                                    name="correo"
                                    value={values.correo}
                                    onChange={handleChange}
                                  />
                                </InputGroup>
                              </Col>
                              <Col md={6}>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text className="w-25">
                                    Telefono:
                                  </InputGroup.Text>
                                  <Form.Control
                                    className="w-75"
                                    autoComplete="off"
                                    name="telefono"
                                    value={values.telefono}
                                    onChange={handleChange}
                                  />
                                </InputGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text className="w-25">
                                    Dirección:
                                  </InputGroup.Text>
                                  <Form.Control
                                    as="textarea"
                                    autoComplete="off"
                                    className="w-75"
                                    aria-label="With textarea"
                                    rows={3}
                                    style={{ resize: "none" }}
                                    name="direccion"
                                    value={values.direccion}
                                    onChange={handleChange}
                                  />
                                </InputGroup>
                              </Col>
                              <Col md={6}>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text className="w-25">
                                    Referencia:
                                  </InputGroup.Text>
                                  <Form.Control
                                    as="textarea"
                                    className="w-75"
                                    autoComplete="off"
                                    rows={3}
                                    style={{ resize: "none" }}
                                    name="referencia"
                                    value={values.referencia}
                                    onChange={handleChange}
                                  />
                                </InputGroup>
                              </Col>
                            </Row>
                            <Row className="justify-content-center">
                              <Col md={6}>
                                <BtnGuardar
                                  datos={values}
                                  mensajeResp={"Se actualizo los datos"}
                                  url={url + "/actualizar"}
                                  handleRespond={handleRespond}
                                  nameBtn="Actualizar Datos"
                                />
                              </Col>
                            </Row>
                          </Form>
                        )}
                      </Formik>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </div>
          )}

          {opciones &&
            (user?.permisos === 1 ? (
              <TablaEmpleados />
            ) : (
              <StatusPedido user={user} />
            ))}
        </Card>
      </Card>
    </>
  );
};

export default ActualizarDatos;
