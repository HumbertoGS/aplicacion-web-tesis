import secureLocalStorage from "react-secure-storage";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutBoxRLine, RiLogoutBoxLine } from "react-icons/ri";

import "../designer/theme.css";

const user = secureLocalStorage.getItem("user");

const Header = () => {
  const logout = () => {
    secureLocalStorage.removeItem("user");
    window.location.href = process.env.REACT_APP_BASENAME + "Catalogo";
  };

  return (
    <div className="App-header py-2">
      <Navbar className="h-100">
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
                    user.permisos == 1 ? (
                      <div>
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
            <Navbar.Collapse className="px-5 justify-content-end">
              <div
                className="d-flex align-items-center"
                style={{ paddingRight: "35px" }}
              >
                <RiLogoutBoxRLine />
                <Navbar.Text className="px-1">
                  <Link to="Ingresar">Ingresar</Link>
                </Navbar.Text>
              </div>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
