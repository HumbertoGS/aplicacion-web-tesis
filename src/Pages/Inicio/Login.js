import secureLocalStorage from "react-secure-storage";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { Formik } from "formik";
import { Link } from "react-router-dom";

import "../designer/theme.css";

import { BtnGuardar } from "../components/BtnAccion";
import validaciones from "../components/Validaciones";

const url = process.env.REACT_APP_API_CORE_URL + "inicio/login";

export default function Login() {
  const comprobarInicio = (respuesta) => {
    if (respuesta.length !== 0) {
      secureLocalStorage.setItem("user", respuesta[0]);

      window.location.href = `${process.env.REACT_APP_BASENAME}${
        respuesta[0]?.permisos === 1 ? "Perfil" : "Catalogo"
      }`;
    } else window.location.href = process.env.REACT_APP_BASENAME + "Inicio";
  };

  return (
    <>
      <Card body className="Card">
        <div className="form-padre">
          <Card className="p-4" style={{ maxWidth: "370px" }}>
            <Row>
              <Col className="mb-3 pt-4">
                <Form.Text>
                  <h5>INICIAR SESION</h5>
                  <hr />
                </Form.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Formik
                  initialValues={{
                    num_identificacion: "",
                    pass: "",
                  }}
                >
                  {({ handleChange, values, isValid, errors }) => (
                    <Form className="px-3" noValidate>
                      <Row>
                        <Form.Group className="mb-3 mt-2">
                          <Form.Control
                            type="text"
                            autoComplete="off"
                            placeholder="Cédula"
                            name="num_identificacion"
                            value={values.num_identificacion}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                              validaciones.onlyNumber(e);
                            }}
                            maxLength={10}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3 py-2">
                          <Form.Control
                            type="password"
                            placeholder="Contraseña"
                            name="pass"
                            value={values.pass}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Row>
                      <Col md={12}>
                        <BtnGuardar
                          datos={values}
                          mensajeResp={"Inicio de Sesion"}
                          url={url}
                          handleRespond={comprobarInicio}
                          nameBtn="Iniciar Sesión"
                          disabled={!(values.pass && values.num_identificacion)}
                          width={"200px"}
                        />
                      </Col>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
            <Row>
              <Col className="mt-3">
                <Form.Text>
                  No tienes cuenta!? <Link to="/Registrar">Registrate</Link>
                </Form.Text>
              </Col>
            </Row>
          </Card>
        </div>
      </Card>
    </>
  );
}
