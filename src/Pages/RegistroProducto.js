import { useEffect, useState } from "react";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import MensajeAlert from "./MensajeAlert";
import { Table } from "react-bootstrap";

const Categorias = [
  { name: "Zapatos", estado: "activo" },
  { name: "Vestidos", estado: "activo" },
  { name: "Camisas", estado: "activo" },
  { name: "Pantalones", estado: "activo" },
];

const producto = [
  {
    id: 1,
    categoria: 3,
    nombre: "Camisa",
    talla: "S",
    precio: 15.0,
    imagen: "tacos-rosa.png",
    stock: "3", estado: "activo"
  },
  {
    id: 2,
    categoria: 1,
    nombre: "Zapatos",
    talla: "36",
    precio: 25.0,
    imagen: "tacos-rosa.png",
    stock: "3", estado: "activo"
  },
  {
    id: 3,
    categoria: 2,
    nombre: "Vestidos",
    talla: "S",
    precio: 30.0,
    imagen: "tacos-rosa.png",
    stock: "3", estado: "activo"
  },
  {
    id: 4,
    categoria: 2,
    nombre: "Vestidos",
    talla: "S",
    precio: 30.0,
    imagen: "tacos-rosa.png",
    stock: "3", estado: "activo"
  },
  {
    id: 5,
    categoria: 2,
    nombre: "Vestidos",
    talla: "S",
    precio: 30.0,
    imagen: "tacos-rosa.png",
    stock: "3", estado: "activo"
  },
  {
    id: 6,
    categoria: 2,
    nombre: "Vestidos",
    talla: "S",
    precio: 30.0,
    imagen: "tacos-rosa.png",
    stock: "3", estado: "activo"
  },
  {
    id: 7,
    categoria: 2,
    nombre: "Vestidos",
    talla: "S",
    precio: 30.0,
    imagen: "tacos-rosa.png",
    stock: "3", estado: "activo"
  },
  {
    id: 8,
    categoria: 2,
    nombre: "Pantalones",
    talla: "S",
    precio: 30.0,
    imagen: "tacos-rosa.png",
    stock: "3", estado: "activo"
  },
  {
    id: 9,
    categoria: 2,
    nombre: "Pantalones",
    talla: "S",
    precio: 30.0,
    imagen: "tacos-rosa.png",
    stock: "3", estado: "activo"
  },
  {
    id: 14,
    categoria: 2,
    nombre: "Pantalones",
    talla: "S",
    precio: 30.0,
    imagen: "tacos-rosa.png",
    stock: "3", estado: "activo"
  },
];

const RegistroProducto = () => {
  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("");

  const [filtro, setFiltro] = useState("Selecciona categoria");

  const [nuevaCat, setNuevaCat] = useState("");

  const registrarCategoria = () => {
    console.log(nuevaCat);
  };

  useEffect(() => {
    if (variant) {
      const interval = setTimeout(() => {
        setVariant("");
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [variant]);

  return (
    <>
      <Card body className="Card">
        {variant ? <MensajeAlert variant={variant} mensaje={mensaje} /> : <></>}
        <Breadcrumb>
          <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Registro-Productos</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <div className="m-4">
            <h5 className="text-center">Registro de Producto y Categorias</h5>
            <hr />
            <Row>
              <Col xs={7}>
                <Card className="p-4 m-3">
                  <h5>Registro de Productos</h5>
                  <hr />
                  <InputGroup className="mb-3" style={{ width: "260px" }}>
                    <InputGroup.Text style={{ width: "100px" }}>
                      Codigo
                    </InputGroup.Text>
                    <Form.Control />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text style={{ width: "100px" }}>
                      Nombre
                    </InputGroup.Text>
                    <Form.Control />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text style={{ width: "100px" }}>
                      Imagen
                    </InputGroup.Text>
                    <Form.Control />
                  </InputGroup>
                  <div className="d-flex">
                    <InputGroup className="mb-3" style={{ width: "270px" }}>
                      <InputGroup.Text style={{ width: "100px" }}>
                        Categoria
                      </InputGroup.Text>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="outline"
                          style={{
                            width: "160px",
                            border: "1px solid #dfe3e7",
                          }}
                        >
                          {filtro}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {Categorias.map((item, index) => {
                            return (
                              <Dropdown.Item
                                key={index}
                                onClick={() => {
                                  setFiltro(item.name);
                                }}
                              >
                                {item.name}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </InputGroup>
                    <InputGroup
                      className="mb-3"
                      style={{ marginLeft: "12px", width: "200px" }}
                    >
                      <InputGroup.Text style={{ width: "100px" }}>
                        Stock
                      </InputGroup.Text>
                      <Form.Control />
                    </InputGroup>
                  </div>
                  <div className="d-flex">
                    <InputGroup className="mb-3" style={{ width: "260px" }}>
                      <InputGroup.Text style={{ width: "100px" }}>
                        Precio
                      </InputGroup.Text>
                      <Form.Control />
                    </InputGroup>
                    <InputGroup
                      className="mb-3"
                      style={{ marginLeft: "22px", width: "200px" }}
                    >
                      <InputGroup.Text style={{ width: "100px" }}>
                        Talla
                      </InputGroup.Text>
                      <Form.Control />
                    </InputGroup>
                  </div>
                  <InputGroup className="mb-3">
                    <InputGroup.Text style={{ width: "100px" }}>
                      Descripcion
                    </InputGroup.Text>
                    <Form.Control
                      as="textarea"
                      aria-label="With textarea"
                      rows={3}
                      style={{ resize: "none" }}
                    />
                  </InputGroup>
                  <Button>Guardar</Button>
                </Card>
              </Col>
              <Col>
                <Row className="px-4">
                  <Card className="p-4 mt-3">
                    <h5>Registro de Categoria</h5>
                    <hr />
                    <InputGroup className="mb-3">
                      <InputGroup.Text style={{ width: "100px" }}>
                        Nombre
                      </InputGroup.Text>
                      <Form.Control
                        onChange={(event) => {
                          setNuevaCat(event.target.value);
                        }}
                      />
                    </InputGroup>
                    <Button onClick={registrarCategoria}>Guardar</Button>
                  </Card>
                </Row>
                <Row className="px-4">
                  <div
                    className="p-4 mt-3"
                    style={{ overflowY: "auto", height: "300px" }}
                  >
                    <Table>
                      <thead className="theadTable">
                        <tr>
                          <th>Nombre</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Categorias.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>
                                <Button>{item.estado}</Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </Row>
              </Col>
            </Row>
            <Row className="p-4">
              <Col>
                <Table>
                  <thead className="theadTable">
                    <tr>
                      <th>Codigo</th>
                      <th>Nombre</th>
                      <th>Categoria</th>
                      <th>Talla</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {producto.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.nombre}</td>
                          <td>{item.categoria}</td>
                          <td>{item.talla}</td>
                          <td>{item.precio}</td>
                          <td>{item.stock}</td>
                          <td>
                            <Button>{item.estado}</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        </Card>
      </Card>
    </>
  );
};

export default RegistroProducto;
