import secureLocalStorage from "react-secure-storage";

import { useState } from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutBoxRLine, RiLogoutBoxLine } from "react-icons/ri";

import "../designer/theme.css";

import Button from "react-bootstrap/esm/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import MenuDespl from "./MenuDespl";

import { BiFoodMenu } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";

const user = secureLocalStorage.getItem("user");

const Header = () => {
  const logout = () => {
    secureLocalStorage.removeItem("user");
    window.location.href = process.env.REACT_APP_BASENAME + "Catalogo";
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App-header py-2">
      <Navbar className="h-100">
        {/* Esto es para menu desplegable */}
        <div style={{ width: "10%" }}>
          <Button
            variant="outline-secondary"
            className="mx-3 p-0 my-0"
            onClick={handleShow}
          >
            <BiFoodMenu className="mx-4 my-2" />
          </Button>
        </div>
        <Offcanvas
          show={show}
          onHide={handleClose}
          style={{ width: "13.25rem", background: "#a3d5f1" }}
        >
          <Offcanvas.Body className="mx-0 px-0">
            <MenuDespl onClosed={handleClose} />
          </Offcanvas.Body>
        </Offcanvas>

        {/* Fin de menu desplegable */}

        <Container>
          <Navbar.Brand>
            <Link to="Catalogo" className="nav-element">
              <label className="mx-2 nav-element">Novedades D'Myla & Ney</label>
            </Link>
          </Navbar.Brand>
          {user ? (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="px-5">
                Conectado como: <Link to="Inicio">{user?.nombre}</Link>
              </Navbar.Text>

              <div className="d-flex align-items-center px-5">
                <AiOutlineUser />
                <NavDropdown
                  style={{ paddingRight: "35px", paddingLeft: "5px" }}
                  title="Perfil"
                >
                  <Link to="Inicio">
                    <Container
                      className="py-1 text-start opc-element"
                      id="navL2"
                    >
                      <label className="mx-1" id="label2">
                        Mis datos
                      </label>
                    </Container>
                  </Link>

                  {user ? (
                    user.permisos === 1 ? (
                      <div>
                        <Link to="Registro-Ventas">
                          <Container
                            className="py-1 text-start opc-element"
                            id="navL2"
                          >
                            <label className="mx-1" id="label2">
                              Revisar pedidos
                            </label>
                          </Container>
                        </Link>
                        <Link to="Inventario">
                          <Container
                            className="py-1 text-start opc-element"
                            id="navL2"
                          >
                            <label className="mx-1" id="label2">
                              Inventario
                            </label>
                          </Container>
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <Link to="Carrito">
                          <Container
                            className="py-1 text-start opc-element"
                            id="navL2"
                          >
                            <label className="mx-1" id="label2">
                              Carrito
                            </label>
                          </Container>
                        </Link>

                        <Link to="Status-Pedido">
                          <Container
                            className="py-1 text-start opc-element"
                            id="navL2"
                          >
                            <label className="mx-1" id="label2">
                              Estado de Pedido
                            </label>
                          </Container>
                        </Link>
                      </div>
                    )
                  ) : (
                    <></>
                  )}

                  <NavDropdown.Divider />

                  <Container
                    className="py-1 text-start opc-element d-flex align-items-center"
                    id="navL2"
                    onClick={logout}
                  >
                    <label className="mx-1" id="label2">
                      Cerrar Sesion
                    </label>
                    <RiLogoutBoxLine />
                  </Container>
                </NavDropdown>
              </div>
            </Navbar.Collapse>
          ) : (
            <div className="d-flex">
              <div
                className="d-flex align-items-center"
                style={{ paddingRight: "35px" }}
              >
                <RiLogoutBoxRLine />
                <Navbar.Text className="px-1">
                  <Link to="Ingresar">Ingresar</Link>
                </Navbar.Text>
              </div>
              <div
                className="d-flex align-items-center"
                style={{ paddingRight: "35px" }}
              >
                <FaRegEdit />
                <Navbar.Text className="px-1">
                  <Link to="Registrar">Registrarse</Link>
                </Navbar.Text>
              </div>
            </div>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
