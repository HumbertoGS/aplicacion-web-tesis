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

const urlPersona = process.env.REACT_APP_API_CORE_URL + "persona";

const TablaEmpleados = () => {
  const [numIdent, setNumIdent] = useState("");

  const [datosEmpleados, setDatosEmpleados] = useState([]);
  const [buscar, setBuscar] = useState(true);

  const [buscarDatos, setBuscarDatos] = useState(false);
  const [result, setResult] = useState(null);

  ReloadData(urlPersona + "/buscarEmpleado", buscar, (x) => {
    if (x.datos.length !== 0) setDatosEmpleados([x.datos[0]]);
    setBuscar(false);
  });

  const buscarPersona = () => {
    setBuscarDatos(true);
  };

  PostData(urlPersona + "/buscar", { numIdent }, buscarDatos, (x) => {
    if (x.datos.length !== 0) setResult(x.datos[0]);
    setBuscarDatos(false);
  });

  //----------REGISTRAR EMPLEADO----------
  const [registrar, setRegistrar] = useState(false);

  const registrarEmpleado = () => {
    setRegistrar(true);
  };

  PostData(
    urlPersona + "/registrarEmpleado",
    { id: result?.id },
    registrar,
    (x) => {
      setRegistrar(false);
      setResult(null);
      setBuscar(true);
    }
  );

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
                      onChange={(e) => {
                        setNumIdent(e.target.value);
                      }}
                    />
                    <Button variant="outline-secondary" onClick={buscarPersona}>
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
                  <Button
                    className="w-100"
                    onClick={registrarEmpleado}
                    variant="outline-secondary"
                  >
                    Registrar
                  </Button>
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
