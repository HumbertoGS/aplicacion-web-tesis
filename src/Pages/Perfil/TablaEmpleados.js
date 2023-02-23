import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";

import "../designer/theme.css";
import Tabla from "../components/Tabla";

import { ReloadData, PostData } from "../../custom-hooks/useFetch";
import { BtnGuardar } from "../components/BtnAccion";

const urlPersona = `${process.env.REACT_APP_API_CORE_URL}persona`;

const TablaEmpleados = () => {
  const [numIdent, setNumIdent] = useState("");

  const [datosEmpleados, setDatosEmpleados] = useState([]);
  const [buscar, setBuscar] = useState(true);

  ReloadData(urlPersona + "/buscarEmpleado", buscar, (x) => {
    if (x.datos.length !== 0) setDatosEmpleados([x.datos[0]]);
    setBuscar(false);
  });

  const [buscarDatos, setBuscarDatos] = useState(false);
  const [result, setResult] = useState(null);

  PostData(urlPersona + "/buscar", { numIdent }, buscarDatos, (x) => {
    if (x.datos.length !== 0) setResult(x.datos[0]);
    setBuscarDatos(false);
  });

  return (
    <>
      <div className="py-3" style={{ height: "70vh" }}>
        <div className="mx-4" style={{ width: "50%" }}>
          <h5 className="text-start">Administrar Empleado</h5>
          <hr />
        </div>
        <Row>
          <Col className="mb-3" xs={4}>
            <div className="m-4" style={{ width: "400px" }}>
              <Card className="Card" style={{ paddingRight: "35px" }}>
                <Form.Text>
                  <h6>Agregar Empleado</h6>
                  <hr />
                </Form.Text>

                <div className="px-3">
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="w-25">Cedula:</InputGroup.Text>
                    <Form.Control
                      value={numIdent}
                      defaultValue={numIdent}
                      onChange={(e) => {
                        setNumIdent(e.target.value);
                      }}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        setBuscarDatos(true);
                      }}
                    >
                      Buscar
                    </Button>
                  </InputGroup>
                  <hr />
                </div>
                <div className="px-3">
                  <InputGroup className="my-3">
                    <InputGroup.Text className="w-25">Nombres:</InputGroup.Text>
                    <InputGroup.Text className="w-75 noEdit">
                      {result?.nombre ?? ""}
                    </InputGroup.Text>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="w-25">
                      Apellidos:
                    </InputGroup.Text>
                    <InputGroup.Text className="w-75 noEdit">
                      {result?.apellido ?? ""}
                    </InputGroup.Text>
                  </InputGroup>
                  <div className="w-100">
                    <BtnGuardar
                      datos={result}
                      handleRespond={(x) => {
                        setResult(null);
                        setNumIdent("");
                        setBuscar(true);
                      }}
                      mensajeResp="Empleado registrado"
                      url={urlPersona + "/registrarEmpleado"}
                      nameBtn="Registrar"
                      disabled={result === null}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </Col>
          <Col className="mb-3">
            <div className="p-4 mx-3">
              <Tabla
                data={datosEmpleados}
                tabla="empleado"
                reload={() => {
                  setBuscar(true);
                }}
                url={urlPersona}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TablaEmpleados;
