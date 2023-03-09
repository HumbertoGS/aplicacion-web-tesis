import { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";

import MenuDespe from "./MenuDesplegable";
import MensajeAlert from "../components/MensajeAlert";
import BtnCambioOpciones from "../components/OpcionPantalla";

import { CatalogoProductos } from "./Paginacion";
import { GetData, PostData } from "../../custom-hooks/useFetch";

import "../designer/theme.css";
import validaciones from "../components/Validaciones";

let datosA = { datos: [], totales: [] };

const urlCategoria = `${process.env.REACT_APP_API_CORE_URL}categoria?estado=true`;
const urlProducto = `${process.env.REACT_APP_API_CORE_URL}producto`;

const BtnTallas = ({ tallasDisponibles, tallaSelect, selectTallas }) => {
  const tallas = tallaSelect;

  const tallasUnicas = new Set(
    tallasDisponibles.flatMap((item) => item.map((t) => t.toLowerCase()))
  );
  const tallasOrdenadas = Array.from(tallasUnicas).sort();

  return (
    <div>
      <div className="col-height">
        {tallasOrdenadas.map((talla) => (
          <Button
            variant="outline-secondary"
            style={{
              background: tallas.some((item) => item === talla)
                ? "#c1e9ff"
                : "",
              width: "auto",
            }}
            className="mx-2 my-2"
            key={talla}
            onClick={() => {
              let nuevasTallas;
              if (!tallas.some((item) => item === talla)) {
                nuevasTallas = [...tallas, talla];
              } else {
                nuevasTallas = tallas.filter((item) => item !== talla);
              }

              selectTallas(nuevasTallas);
            }}
          >
            {talla.toUpperCase()}
          </Button>
        ))}
      </div>
      <p className="pt-2">Tallas seleccionadas:</p>
      <p className="px-3 py-0 my-0">{tallas.join(", ")}</p>
    </div>
  );
};

const Catalogo = () => {
  //-----------Cargar datos de carrito en caso de exitir--------------
  useEffect(() => {
    const datosCarro = secureLocalStorage.getItem("datosCarrito");

    if (datosCarro) {
      if (datosCarro.datos.length > 0) {
        datosA = datosCarro;
        setDatos(datosA);
      }
    } else setDatos({ datos: [], totales: [] });
  }, []);

  //-----------Valores Iniciales----------
  const [mensajeAlert, setMensajeAlert] = useState({
    mostrar: false,
    mensaje: "",
    variant: "",
  });

  const [todos, setTodos] = useState(false);
  const [nuevo, setNuevo] = useState(true);

  const [show, setShow] = useState(false);
  const [datos, setDatos] = useState({ datos: [], totales: [] });

  //----------Valores para datos producto----------
  const [buscar, setBuscar] = useState(true);
  const [busqueda, setBusqueda] = useState({
    categoria: { name: "", id: [] },
    orden: { name: "Últimos agregados", orden: [] },
    tallas: { name: "", tallas: [] },
    precio: { min: "", max: "" },
    stock: true,
  });

  const [tallasFiltro, setTallasFiltro] = useState([]);
  const [producto, setProducto] = useState([]);
  const [productoNew, setProductoNew] = useState([]);

  PostData(urlProducto, busqueda, buscar, (dato) => {
    const data = dato.datos;
    setTallasFiltro(data.tallas);
    setProducto(data.datos);
    setProductoNew(data.datos.filter((data) => data.newProducto === true));
    setBuscar(false);
  });

  //---------------------CATEGORIA---------------------
  const [Categorias, setCategorias] = useState([]);
  const [reload, setReload] = useState(true);

  GetData(urlCategoria, reload, (dato) => {
    setCategorias(dato.datos);
    setReload(false);
  });

  //-------------------Operaciones del carrito-------------------
  const guardarDatos = (datosA) => {
    let Total = datosA.datos.reduce(
      (acumulador, actual) => acumulador + Number(actual.total),
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
    secureLocalStorage.setItem("datosCarrito", datosGuardar);
  };

  const datosCarrito = (valores) => {
    datosA.datos.push(valores);
    guardarDatos(datosA);

    setMensajeAlert({
      mostrar: true,
      mensaje: "Agregado al carrito",
      variant: "success",
    });
  };

  //----------Carga de datos iniciales y mensaje---------
  useEffect(() => {
    if (mensajeAlert.mostrar) {
      const interval = setTimeout(() => {
        setMensajeAlert({ mostrar: false, mensaje: "", variant: "" });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [mensajeAlert.mostrar]);

  //----------------Filtros---------------
  const id_categoria = [];
  const [text, setText] = useState(false);

  const BusquedaAvz = () => {
    return (
      <>
        {/* Primera */}
        <Row
          className="align-items-center justify-content-center"
          style={{ fontSize: "11px !important" }}
        >
          <Col lg={8} md={12} xs={5} sm={4}>
            <Form.Label className="fw-bold my-0 py-1 pb-1">BÚSQUEDA</Form.Label>
          </Col>
          {busqueda.categoria.id && (
            <Col lg={4} md={6} xs={2} sm={2}>
              <Button
                className="my-0 py-0 pb-1"
                variant="outline-secondary"
                onClick={() => {
                  setBusqueda({
                    categoria: { name: "", id: [] },
                    orden: { name: "Últimos agregados", orden: [] },
                    tallas: { name: "", tallas: [] },
                    precio: { min: "", max: "" },
                    stock: true,
                  });
                  setBuscar(true);
                }}
              >
                <AiOutlineClear />
              </Button>
            </Col>
          )}
        </Row>
        {/* Segunda */}
        <Row>
          <Col>
            <Row>
              <Col className="pb-1">
                <hr />
                <h6>POR CATEGORIA</h6>
                <h6>{busqueda.categoria.name}</h6>
              </Col>
            </Row>
            <Row>
              <Col className="col-height">
                {Categorias.map((item) => {
                  return (
                    <Button
                      variant="outline-secondary"
                      style={{
                        background:
                          item.nombre === busqueda.categoria.name
                            ? "#c1e9ff"
                            : "",
                        width: "auto",
                      }}
                      className="mx-2 my-2"
                      key={item.id}
                      onClick={() => {
                        if (busqueda.categoria.id[0] === item.id)
                          id_categoria.pop();
                        else id_categoria.push(item.id);

                        setBusqueda({
                          ...busqueda,
                          categoria: {
                            name: id_categoria.length === 0 ? "" : item.nombre,
                            id: id_categoria,
                          },
                        });
                        setBuscar(true);
                      }}
                    >
                      {item.nombre}
                    </Button>
                  );
                })}
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Tercera */}
        <Row>
          <Col>
            <Row>
              <Col className="pt-2 pb-2">
                <hr />
                <h6>POR TALLAS</h6>
              </Col>
            </Row>
            <Row>
              <Col>
                {tallasFiltro && (
                  <BtnTallas
                    tallasDisponibles={tallasFiltro}
                    tallaSelect={busqueda.tallas.tallas}
                    selectTallas={(nuevasTallas) => {
                      setBusqueda({
                        ...busqueda,
                        tallas: { name: "", tallas: nuevasTallas },
                      });

                      setBuscar(true);
                    }}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Cuarta */}
        <Row>
          <Col>
            <Row>
              <Col className="pt-2 pb-1">
                <hr />
                <h6>POR PRECIO</h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Text className="w-25">Min:</Form.Text>
                <Form.Control
                  size="sm"
                  type="text"
                  autoComplete="off"
                  maxLength={4}
                  defaultValue={busqueda.precio.min}
                  onChange={(e) => {
                    busqueda.precio.min = e.target.value;
                  }}
                  onKeyDown={(e) => {
                    validaciones.onlyNumber(e);
                  }}
                />
              </Col>
              <Col>
                <Form.Text className="w-25">Max:</Form.Text>
                <InputGroup>
                  <Form.Control
                    size="sm"
                    type="number"
                    autoComplete="off"
                    defaultValue={busqueda.precio.max}
                    onChange={(e) => {
                      busqueda.precio.max = e.target.value;
                    }}
                    onKeyDown={(e) => {
                      validaciones.onlyNumber(e);
                    }}
                  />
                </InputGroup>
              </Col>
            </Row>
            {text && (
              <span className="text-danger">
                El campo maximo debe ser mayor o igual al minimo
              </span>
            )}
            <Row className="justify-content-center pt-2">
              <Button
                variant="outline-secondary"
                size="sm"
                className="w-50"
                onClick={() => {
                  let disabledBtn;

                  if (busqueda.precio.min === "" && busqueda.precio.max === "")
                    disabledBtn = false;
                  else if (
                    busqueda.precio.min !== "" &&
                    busqueda.precio.max === ""
                  )
                    disabledBtn = false;
                  else if (
                    busqueda.precio.min === "" &&
                    busqueda.precio.max !== ""
                  )
                    disabledBtn = false;
                  else if (
                    busqueda.precio.min !== "" &&
                    busqueda.precio.max !== ""
                  ) {
                    if (
                      Number(busqueda.precio.min) > Number(busqueda.precio.max)
                    ) {
                      disabledBtn = true;
                    } else {
                      disabledBtn = false;
                    }
                  }

                  if (!disabledBtn) {
                    setBuscar(true);
                    setText(false);
                  } else {
                    setText(true);
                  }
                }}
              >
                Ir
              </Button>
            </Row>
          </Col>
        </Row>
      </>
    );
  };

  const OrdenarOpcion = () => {
    return (
      <>
        <DropdownButton
          id="dropdown-item-button"
          variant="outline-secondary"
          title={"Ordenar por: " + busqueda.orden.name}
        >
          <Dropdown.Item
            onClick={() => {
              setBusqueda({
                ...busqueda,
                orden: {
                  name: "Últimos agregados",
                  orden: ["id", "DESC"],
                },
              });
              setBuscar(true);
            }}
          >
            Últimos agregados
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setBusqueda({
                ...busqueda,
                orden: {
                  name: "Del más antiguo al más nuevo",
                  orden: ["id", "ASC"],
                },
              });
              setBuscar(true);
            }}
          >
            Del más antiguo al más nuevo
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setBusqueda({
                ...busqueda,
                orden: {
                  name: "Precio: de más bajo a más alto",
                  orden: ["precio", "ASC"],
                },
              });
              setBuscar(true);
            }}
          >
            Precio: de más bajo a más alto
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setBusqueda({
                ...busqueda,
                orden: {
                  name: "Precio: de más alto a más bajo",
                  orden: ["precio", "DESC"],
                },
              });
              setBuscar(true);
            }}
          >
            Precio: de más alto a más bajo
          </Dropdown.Item>
        </DropdownButton>
      </>
    );
  };

  return (
    <>
      <Card body className="Card">
        {mensajeAlert.mostrar && (
          <MensajeAlert
            variant={mensajeAlert.variant}
            mensaje={mensajeAlert.mensaje}
          />
        )}
        <Card className="Card pt-2">
          <div className="px-0">
            <Row>
              <Col md={4}></Col>
              <Col md={5}>
                <h5 className="text-center">Cátologo de productos</h5>
                <hr />
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <Card className="py-3 px-3">
                  <BusquedaAvz />
                </Card>
              </Col>
              <Col>
                <Row
                  className="mb-3 mx-0 pt-2 pb-0"
                  style={{ borderBottom: "1px solid #d2d8dd" }}
                >
                  <BtnCambioOpciones
                    estado={nuevo}
                    onClick={() => {
                      setNuevo(true);
                      setTodos(false);
                    }}
                    nameBtn="Nuevos"
                  />
                  <BtnCambioOpciones
                    estado={todos}
                    onClick={() => {
                      setNuevo(false);
                      setTodos(true);
                    }}
                    nameBtn="Todos"
                  />
                  <Col
                    className="my-1 d-flex justify-content-end"
                    style={{ paddingRight: "30px" }}
                  >
                    <div className="mb-0" style={{ width: "10%" }}>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          setShow(true);
                        }}
                      >
                        <FaShoppingCart />
                      </Button>
                    </div>
                  </Col>
                </Row>

                {show && (
                  <MenuDespe
                    show={show}
                    handleClose={() => setShow(false)}
                    datos={datos}
                    guardarDatos={guardarDatos}
                  />
                )}

                <div style={{ minHeight: "60vh" }}>
                  {nuevo && (
                    <CatalogoProductos
                      data={productoNew}
                      datosCarrito={datosCarrito}
                      Ordenar={<OrdenarOpcion />}
                    />
                  )}

                  {todos && (
                    <CatalogoProductos
                      data={producto}
                      datosCarrito={datosCarrito}
                      Ordenar={<OrdenarOpcion />}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </Card>
    </>
  );
};

export default Catalogo;
