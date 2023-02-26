import secureLocalStorage from "react-secure-storage";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import { Formik } from "formik";
import { Link } from "react-router-dom";

import "../designer/theme.css";
import { BtnGuardar } from "../components/BtnAccion";

import validaciones from "../components/Validaciones";

const url = process.env.REACT_APP_API_CORE_URL + "inicio/registro";

const Registrar = () => {
  const comprobarInicio = (respuesta) => {
    if (respuesta) {
      secureLocalStorage.setItem("user", respuesta[0]);

      setTimeout(function () {
        window.location.href = process.env.REACT_APP_BASENAME + "Catalogo";
      }, 1000);
    }
  };

  return (
    <>
      <Card body className="Card">
        <div className="form-padre">
          <Card className="p-4" style={{ width: "400px" }}>
            <Row>
              <Col className="mb-3 pt-4">
                <Form.Text>
                  <h5 className="text-center">REGISTRATE</h5>
                  <hr />
                </Form.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Formik
                  initialValues={{
                    cedula: "",
                    nombre: "",
                    apellido: "",
                    correo: "",
                    contrasena: "",
                  }}
                >
                  {({ handleChange, values, isValid, errors }) => (
                    <Form className="px-3" noValidate>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          placeholder="Nombre"
                          name="nombre"
                          value={values.nombre}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          placeholder="Apellido"
                          name="apellido"
                          value={values.apellido}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          placeholder="Cédula"
                          name="cedula"
                          value={values.cedula}
                          onChange={handleChange}
                          onKeyDown={(e) => {
                            validaciones.onlyNumber(e);
                          }}
                          maxLength={10}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Control
                          type="email"
                          autoComplete="off"
                          placeholder="Correo electrónico"
                          name="correo"
                          value={values.correo}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Control
                          type="password"
                          autoComplete="off"
                          placeholder="Contraseña"
                          name="contrasena"
                          value={values.contrasena}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <BtnGuardar
                        datos={values}
                        mensajeResp={"Datos Registrados"}
                        url={url}
                        handleRespond={comprobarInicio}
                        nameBtn="Crear Cuenta"
                        disabled={
                          !(
                            values.apellido &&
                            values.cedula &&
                            values.nombre &&
                            values.contrasena
                          )
                        }
                        width={"50%"}
                      />
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
            <Row>
              <Col className="mt-3 px-4">
                <Form.Text>
                  Ya tienes cuenta, <Link to="/Ingresar">ingresar aquí</Link>
                </Form.Text>
              </Col>
            </Row>
          </Card>
        </div>
      </Card>
    </>
  );
};

export default Registrar;
