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

import {
  BtnCambiarEstado,
  BtnGuardar,
} from "../components/BtnAccion";

import HeaderPerfil from "./HeaderPerfil";
import TablaEmpleados from "./TablaEmpleados";
import StatusPedido from "./StatusPedido";

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
              <Row>
                <Col className="my-2 px-4" xs={6}>
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
                      <Form className="px-4" noValidate onSubmit={handleSubmit}>
                        {/* <Form.Text>
                        <h6>Datos del Perfil</h6>
                        <hr />
                      </Form.Text> */}
                        <InputGroup className="mb-3">
                          <InputGroup.Text style={{ width: "170px" }}>
                            Cédula:
                          </InputGroup.Text>
                          <Form.Control
                            disabled={true}
                            name="cedula"
                            value={values.cedula}
                            onChange={handleChange}
                            maxLength={10}
                          />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroup.Text style={{ width: "170px" }}>
                            Nombres:
                          </InputGroup.Text>
                          <Form.Control
                            name="nombre"
                            value={values.nombre}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroup.Text style={{ width: "170px" }}>
                            Apellidos:
                          </InputGroup.Text>
                          <Form.Control
                            name="apellido"
                            value={values.apellido}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroup.Text style={{ width: "170px" }}>
                            Correo:
                          </InputGroup.Text>
                          <Form.Control
                            name="correo"
                            value={values.correo}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroup.Text style={{ width: "170px" }}>
                            Dirección:
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
                          <InputGroup.Text style={{ width: "170px" }}>
                            Referencia:
                          </InputGroup.Text>
                          <Form.Control
                            name="referencia"
                            value={values.referencia}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroup.Text style={{ width: "170px" }}>
                            Telefono:
                          </InputGroup.Text>
                          <Form.Control
                            name="telefono"
                            value={values.telefono}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <Button
                          className="w-100"
                          type="submit"
                          variant="outline-secondary"
                        >
                          Actualizar Datos
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
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
