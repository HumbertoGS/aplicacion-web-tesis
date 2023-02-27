import { useState } from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

import Tabla from "../components/Tabla";
import EditarDatos from "../Registros/EditarDatos";
import AgregarInventario from "./AgregarInventario";

import { ReloadData } from "../../custom-hooks/useFetch";
import Categoria from "./Categoria";

const urlCategoria = `${process.env.REACT_APP_API_CORE_URL}categoria`;
const urlProducto = `${process.env.REACT_APP_API_CORE_URL}producto`;

const Inventario = () => {
  const [pantallaCate, setPantallaCate] = useState(false);

  const [agregarModal, setAgregarModal] = useState(null);
  const [editarModal, setEditarModal] = useState(null);
  const [datosModal, setDatosModal] = useState([]);

  //-------------------CATEGORIA-------------------
  const [Categorias, setCategorias] = useState([]);
  const [reload, setReload] = useState(true);

  ReloadData(urlCategoria, reload, (dato) => {
    setCategorias(dato.datos);
    setReload(false);
  });

  //-------------------TABLA DE PRODUCTOS-------------------

  const [productoTabla, setProductoTabla] = useState([]);
  const [reloadProductos, setReloadProductos] = useState(true);
  const [producto, setProducto] = useState(productoTabla);

  ReloadData(urlProducto, reloadProductos, (dato) => {
    setProductoTabla(dato.datos);
    setProducto(dato.datos);
    setReloadProductos(false);
  });

  //-------------------FILTRO PRODUCTOS-------------------

  const [filtrarTabla, setFiltrarTabla] = useState("Filtrar");

  const Buscar = (idCategoria) => {
    let filtrado = productoTabla.filter(
      (data) => data.categoria === idCategoria
    );
    if (filtrado.length > 0) {
      setProducto(filtrado);
    } else {
      setProducto([]);
    }
  };

  return (
    <>
      <Card body className="Card">
        <div className="mt-2">
          <Row>
            <div className="w-25"></div>
            <div className="w-50 mb-2">
              <h5 className="text-center">Inventario de Productos</h5>
              <hr />
            </div>
          </Row>

          <Card>
            <Row className="py-3 px-4">
              <Col md={4}>
                <div className="d-flex">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline"
                      style={{
                        width: "160px",
                        border: "1px solid #dfe3e7",
                      }}
                    >
                      {filtrarTabla}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {Categorias.map((item, index) => {
                        return item.estado ? (
                          <Dropdown.Item
                            key={index}
                            onClick={() => {
                              setFiltrarTabla(item.nombre);
                              Buscar(item.id);
                            }}
                          >
                            {item.nombre}
                          </Dropdown.Item>
                        ) : (
                          <li key={index}></li>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                  {filtrarTabla !== "Filtrar" ? (
                    <Button
                      className="mx-2"
                      onClick={() => {
                        setFiltrarTabla("Filtrar");
                        setProducto(productoTabla);
                      }}
                    >
                      Limpiar Filtros
                    </Button>
                  ) : null}
                </div>
              </Col>
              <Col></Col>
              <Col md={3}>
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-evenly" }}
                >
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      setAgregarModal(true);
                    }}
                  >
                    Agregar Producto
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      setPantallaCate(true);
                    }}
                  >
                    Categoria
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
          <div className="px-3 mt-3">
            <Tabla
              data={producto}
              tabla="producto"
              editarModal={(item) => {
                setDatosModal(item);
                setEditarModal(true);
              }}
              reload={() => {
                setReloadProductos(true);
              }}
              url={urlProducto}
              height="378px"
            />
          </div>
        </div>
      </Card>

      {pantallaCate && (
        <Categoria
          Categorias={Categorias}
          onHide={() => setPantallaCate(false)}
          show={pantallaCate}
          reload={(x) => {
            setReload(true);
          }}
          urlCategoria={urlCategoria}
        />
      )}

      {agregarModal && (
        <AgregarInventario
          producto={{
            nombre: "",
            imagen: "",
            categoria: "",
            cantidad: "",
            precio: "",
            talla: "",
            descripcion: "",
          }}
          Categorias={Categorias}
          agregar={true}
          show={agregarModal}
          onHide={() => setAgregarModal(false)}
          reloadProductos={() => setReloadProductos(true)}
        />
      )}

      {editarModal && (
        <EditarDatos
          producto={datosModal}
          Categorias={Categorias}
          opcion="productoEditar"
          show={editarModal}
          onHide={() => setEditarModal(false)}
          reloadProductos={() => setReloadProductos(true)}
        />
      )}
    </>
  );
};

export default Inventario;
