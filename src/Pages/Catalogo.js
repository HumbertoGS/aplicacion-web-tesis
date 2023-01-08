import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ProductoCatalogo from "./Producto-Catalogo";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FaShoppingCart } from "react-icons/fa";
//import paginacionCatalogo from "./Paginacion";
import "./designer/theme.css";
import MenuDespe from "./Content/MenuDesplegable";

const producto = [
  {
    id: 1,
    categoria: 3,
    producto: "camisa",
    precio_unidad: 15.0,
    imagen: "tacos-rosa.png",
  },
  {
    id: 2,
    categoria: 1,
    producto: "zapatos",
    precio_unidad: 25.0,
    imagen: "tacos-rosa.png",
  },
  {
    id: 3,
    categoria: 2,
    producto: "vestidos",
    precio_unidad: 30.0,
    imagen: "tacos-rosa.png",
  },
  {
    id: 4,
    categoria: 2,
    producto: "vestidos",
    precio_unidad: 30.0,
    imagen: "tacos-rosa.png",
  },
];

const filtro = [
  { name: "Zapatos" },
  { name: "Vestidos" },
  { name: "Camisas" },
  { name: "Pantalones" },
];

const Catalogo = () => {
  const [show, setShow] = useState(false);
  const [datos, setDatos] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setDatos(datosA);
    setShow(true);
  };

  const [modal, setModal] = useState(false);

  let datosA = [];

  const datosCarrito = (valores) => {
    datosA.push(valores);
  };

  return (
    <>
      <Card body className="Card">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Catalogo</Breadcrumb.Item>
        </Breadcrumb>
        <Card style={{ height: "90vh" }} className="pt-4 pb-2">
        <div className="form-catalogo" style={{ overflowY: "auto" }}>
          <Container fluid>
            <Row>
              <Col className="mb-3">
                <Form.Text>
                  <h2>Cátologo de productos</h2>
                </Form.Text>
              </Col>
            </Row>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="mb-3"
            >
              <DropdownButton id="dropdown-basic-button" title="Filtrar">
                {filtro.map((item, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      onClick={(event) => {
                        console.log(event.target.value);
                      }}
                      value={item.name}
                    >
                      {item.name}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>

              <Button
                onClick={
                  handleShow
                } /*onClick={(handleShow) => {setModal(true);}*/
              >
                <FaShoppingCart />
              </Button>
            </div>

            {show ? (
              <MenuDespe show={show} handleClose={handleClose} datos={datos} />
            ) : (
              <></>
            )}

            {/* llamar la cantidad de veces que haya un producto */}
            {producto.map((item, index) => {
              return (
                <ProductoCatalogo producto={item} datosCarrito={datosCarrito} />
              );
            })}
          </Container>
          {/*<paginacionCatalogo />*/}
        </div>
      </Card>
      </Card>
    </>
  );
};

export default Catalogo;
