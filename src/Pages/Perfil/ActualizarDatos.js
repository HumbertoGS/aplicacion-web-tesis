import { useState } from "react";
import secureLocalStorage from "react-secure-storage";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";

import { Formik } from "formik";

import "../designer/theme.css";
import { PostData } from "../../custom-hooks/useFetch";

import HeaderPerfil from "./HeaderPerfil";
import TablaEmpleados from "./TablaEmpleados";
import StatusPedido from "./StatusPedido";
import { BtnFormik } from "../components/BtnAccion";

const url = process.env.REACT_APP_API_CORE_URL + "persona";

const ActualizarDatos = ({ user }) => {
  const [buscar, setBuscar] = useState(true);
  const [actualizar, setActualizar] = useState(false);

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

  const actualizarDatos = (datos) => {
    setDatos(datos);
    setActualizar(true);
  };

  PostData(url + "/actualizar", datos, actualizar, (x) => {
    if (x.datos.length !== 0) {
      secureLocalStorage.setItem("user", {
        nombre: x.datos[0].nombre,
        cedula: x.datos[0].cedula,
        permisos: x.datos[0].id_rol,
      });
    } else {
      //datos no se pudieron actualizar
    }
    setActualizar(false);
    window.location.href = process.env.REACT_APP_BASENAME + "Inicio";
  });

  const [opcion, setOpcion] = useState(true);

  return (
    <>
      <Card body style={{ height: "80vh" }} className="Card">
        <HeaderPerfil
          user={user}
          opcion={opcion}
          cambio={() => {
            setOpcion(!opcion);
          }}
        />
        {opcion ? (
          <div className="py-2" style={{ height: "70vh" }}>
            <Card className="Card">
              <div className="mx-4" style={{ width: "50%" }}>
                <h5 className="text-start">Datos del Perfil</h5>
                <hr />
              </div>
              <Card className="my-2 px-5 mx-5 py-5">
                <Formik
                  enableReinitialize={true}
                  initialValues={datos}
                  onSubmit={(values, { resetForm }) => {
                    actualizarDatos(values);
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
                    <Form
                      className="px-2 pt-2"
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <Row>
                        <Col className="mx-2">
                          <InputGroup className="mb-3">
                            <InputGroup.Text className="w-25">
                              Cédula:
                            </InputGroup.Text>
                            <Form.Control
                              className="w-75"
                              disabled={true}
                              name="cedula"
                              value={values.cedula}
                              onChange={handleChange}
                              maxLength={10}
                            />
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroup.Text className="w-25">
                              Nombres:
                            </InputGroup.Text>
                            <Form.Control
                              className="w-75"
                              name="nombre"
                              value={values.nombre}
                              onChange={handleChange}
                            />
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroup.Text className="w-25">
                              Correo:
                            </InputGroup.Text>
                            <Form.Control
                              className="w-75"
                              name="correo"
                              value={values.correo}
                              onChange={handleChange}
                            />
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroup.Text className="w-25">
                              Dirección:
                            </InputGroup.Text>
                            <Form.Control
                              as="textarea"
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
                        <Col className="mx-2">
                          <InputGroup className="mb-4">
                            <InputGroup.Text
                              className="w-50 mb-3 bg-white"
                              style={{ border: "0px" }}
                            ></InputGroup.Text>
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroup.Text className="w-25">
                              Apellidos:
                            </InputGroup.Text>
                            <Form.Control
                              className="w-75"
                              name="apellido"
                              value={values.apellido}
                              onChange={handleChange}
                            />
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroup.Text className="w-25">
                              Telefono:
                            </InputGroup.Text>
                            <Form.Control
                              className="w-75"
                              name="telefono"
                              value={values.telefono}
                              onChange={handleChange}
                            />
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroup.Text className="w-25">
                              Referencia:
                            </InputGroup.Text>
                            <Form.Control
                              as="textarea"
                              className="w-75"
                              rows={3}
                              style={{ resize: "none" }}
                              name="referencia"
                              value={values.referencia}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Button
                        className="w-25"
                        type="submit"
                        variant="outline-secondary"
                      >
                        Actualizar Datos
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card>
            </Card>
          </div>
        ) : user?.permisos == 1 ? (
          <TablaEmpleados />
        ) : (
          <StatusPedido />
        )}
      </Card>
    </>
  );
};

export default ActualizarDatos;
