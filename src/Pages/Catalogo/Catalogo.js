import { useState, useEffect } from "react";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { FaShoppingCart } from "react-icons/fa";

import ProductoCatalogo from "./Producto-Catalogo";
import MenuDespe from "./MenuDesplegable";
import MensajeAlert from "../MensajeAlert";
import "../designer/theme.css";

const producto = [
  {
    id: 1,
    categoria: 3,
    producto: "Camisa",
    talla: "S",
    precio_unidad: 15.0,
    imagen: "tacos-rosa.png",
  },
  {
    id: 2,
    categoria: 1,
    producto: "Zapatos",
    talla: "36",
    precio_unidad: 25.0,
    imagen: "tacos-rosa.png",
  },
  {
    id: 3,
    categoria: 2,
    producto: "Vestidos",
    talla: "S",
    precio_unidad: 30.0,
    imagen: "tacos-rosa.png",
  },
  {
    id: 4,
    categoria: 2,
    producto: "Vestidos",
    talla: "S",
    precio_unidad: 30.0,
    imagen: "tacos-rosa.png",
  },
  {
    id: 5,
    categoria: 2,
    producto: "Vestidos",
    talla: "S",
    precio_unidad: 30.0,
    imagen: "tacos-rosa.png",
  },
  {
    id: 6,
    categoria: 2,
    producto: "Vestidos",
    talla: "S",
    precio_unidad: 30.0,
    imagen: "tacos-rosa.png",
  },
  {
    id: 7,
    categoria: 2,
    producto: "Vestidos",
    talla: "S",
    precio_unidad: 30.0,
    imagen: "tacos-rosa.png",
  },
  {
    id: 8,
    categoria: 2,
    producto: "Pantalones",
    talla: "S",
    precio_unidad: 30.0,
    imagen: "tacos-rosa.png",
  },
  {
    id: 9,
    categoria: 2,
    producto: "Pantalones",
    talla: "S",
    precio_unidad: 30.0,
    imagen: "tacos-rosa.png",
  },
  {
    id: 14,
    categoria: 2,
    producto: "Pantalones",
    talla: "S",
    precio_unidad: 30.0,
    imagen: "tacos-rosa.png",
  },
];

//Datos desde Tabla categoria
const Categorias = [
  { name: "Zapatos" },
  { name: "Vestidos" },
  { name: "Camisas" },
  { name: "Pantalones" },
];

let datosA = { datos: [], totales: [] };

const Catalogo = () => {
  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("");

  const [show, setShow] = useState(false);
  const [datos, setDatos] = useState({ datos: [], totales: [] });
  const [modal, setModal] = useState(false);
  const [filtro, setFiltro] = useState("Filtrar");

  const [buscar, setBuscar] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const busqueda = () => {
    console.log(buscar);
  };

  const guardarDatos = (datosA) => {
    let Total = datosA.datos.reduce(
      (acumulador, actual) => acumulador + actual.total,
      0
    );

    let datosGuardar = {
      datos: datosA.datos,
      totales: [
        { name: "Subtotal", totales: Total },
        { name: "Descuento", totales: "0.0" },
        { name: "Total", totales: Total },
      ],
    };
    setDatos(datosGuardar);
    localStorage.setItem("datosCarrito", JSON.stringify(datosGuardar));
  };

  const datosCarrito = (valores) => {
    datosA.datos.push(valores);
    guardarDatos(datosA);

    setVariant("success");
    setMensaje("Agregado al carrito");
  };

  useEffect(() => {
    if (variant) {
      const interval = setTimeout(() => {
        setVariant("");
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [variant]);

  useEffect(() => {
    const datosCarro = JSON.parse(localStorage.getItem("datosCarrito"));
    if (datosCarro) {
      if (datosCarro.datos.length > 0) {
        datosA = datosCarro;
        setDatos(datosA);
      }
    } else setDatos({ datos: [], totales: [] });
  }, []);

  return (
    <>
      <Card body className="Card">
        {variant ? <MensajeAlert variant={variant} mensaje={mensaje} /> : <></>}
        <Breadcrumb>
          <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Catalogo</Breadcrumb.Item>
        </Breadcrumb>
        <Card className="Card">
          <div className="px-3">
            <Row>
              <Col className="mb-3">
                <h5 className="text-center">Cátologo de productos</h5>
              </Col>
            </Row>
            <Card className="mb-2">
              <div className="mx-5 my-2 d-flex">
                <div style={{ width: "35%" }} className="d-flex">
                  <DropdownButton id="dropdown-basic-button" title={filtro}>
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
                  </DropdownButton>
                  {filtro !== "Filtrar" ? (
                    <Button
                      className="mx-2"
                      onClick={() => {
                        setFiltro("Filtrar");
                      }}
                    >
                      Limpiar Filtros
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
                <div style={{ width: "60%" }}>
                  <Form className="d-flex">
                    <Form.Control
                      style={{ width: "300px" }}
                      type="search"
                      placeholder="Búsqueda..."
                      className="me-2"
                      aria-label="Search"
                      onChange={(event) => {
                        setBuscar(event.target.value);
                      }}
                    />
                    <Button
                      variant="outline-success"
                      onClick={busqueda}
                      disabled={!buscar}
                    >
                      Buscar
                    </Button>
                  </Form>
                </div>
                <div style={{ width: "10%" }}>
                  <Button onClick={handleShow}>
                    <FaShoppingCart />
                  </Button>
                </div>
              </div>
            </Card>

            {show ? (
              <MenuDespe
                show={show}
                handleClose={handleClose}
                datos={datos}
                guardarDatos={guardarDatos}
              />
            ) : (
              <></>
            )}

            <Row xs={2} md={4} className="g-4">
              {producto.map((item, index) => {
                return (
                  <ProductoCatalogo
                    key={index}
                    producto={item}
                    datosCarrito={datosCarrito}
                  />
                );
              })}
            </Row>
          </div>
        </Card>
      </Card>
    </>
  );
};

export default Catalogo;
