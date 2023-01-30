import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";

import "../designer/theme.css";
import { ReloadData, PostData } from "../../custom-hooks/useFetch";
import { BtnCambiarEstado } from "../../custom-hooks/BtnAccion";

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
                    <InputGroup.Text style={{ width: "100px" }}>
                      Cedula:
                    </InputGroup.Text>
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
                    <InputGroup.Text style={{ width: "100px" }}>
                      Nombres:
                    </InputGroup.Text>
                    <Form.Control
                      readOnly={true}
                      value={result ? result?.nombre : ""}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text style={{ width: "100px" }}>
                      Apellidos:
                    </InputGroup.Text>
                    <Form.Control
                      readOnly={true}
                      value={result ? result?.apellido : ""}
                    />
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
            <div
              className="p-4 mx-3"
              style={{ overflowY: "auto", height: "300px" }}
            >
              <Table>
                <thead className="theadTable">
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Cedula</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {datosEmpleados.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.nombre}</td>
                        <td>{item.apellido}</td>
                        <td>{item.cedula}</td>
                        <td>
                          <BtnCambiarEstado
                            item={item}
                            reload={() => {
                              setBuscar(true);
                            }}
                            url={urlPersona}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TablaEmpleados;
