import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";

import "../designer/theme.css";
import { ReloadData } from "../../custom-hooks/useFetch";
import {
  BtnCambiarEstado,
  BtnGuardarDatos,
} from "../../custom-hooks/BtnAccion";

import HeaderPerfil from "../Perfil/HeaderPerfil";

const url = process.env.REACT_APP_API_CORE_URL + "persona";

const TablaEmpleados = () => {
  const [datosEmpleados, setDatosEmpleados] = useState([]);
  const [buscar, setBuscar] = useState(true);

  ReloadData(url + "/buscarEmpleado", buscar, (x) => {
    if (x.datos.length !== 0) setDatosEmpleados([x.datos[0]]);
    setBuscar(false);
  });

  return (
    <>
      <div className="py-3" style={{ height: "85vh" }}>
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
                    <Form.Control />
                    <Button variant="outline-secondary">Buscar</Button>
                  </InputGroup>
                  <hr />
                </div>
                <div className="px-3">
                  <InputGroup className="my-3">
                    <InputGroup.Text style={{ width: "100px" }}>
                      Nombres:
                    </InputGroup.Text>
                    <Form.Control readOnly={true} />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text style={{ width: "100px" }}>
                      Apellidos:
                    </InputGroup.Text>
                    <Form.Control readOnly={true} />
                  </InputGroup>
                  <Button className="w-100" variant="outline-secondary">
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
                            url={url}
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
