import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import NavDropdown from "react-bootstrap/NavDropdown";
import Figure from "react-bootstrap/Figure";
import { Link } from "react-router-dom";

import "../designer/theme.css";
import Button from "react-bootstrap/esm/Button";

const user = JSON.parse(localStorage.getItem("user"));

const Header = () => {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = process.env.REACT_APP_BASENAME + "Inicio";
  };

  return (
    <div className="App-header py-2">
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Link to="Catalogo" className="nav-element">
              <label className="mx-2 nav-element">Novedades D'Myla & Ney</label>
            </Link>
          </Navbar.Brand>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">
            {user ? (
              <Navbar.Text>
                Conectado como: <Link to="Inicio">{user.nombre}</Link>
              </Navbar.Text>
            ) : (
              <Navbar.Text>
                <Link to="Ingresar">Ingresar</Link>
              </Navbar.Text>
            )}

            <NavDropdown className="px-5" title="Perfil">
              <Link to="Inicio">
                <Container className="py-1 text-start opc-element" id="navL2">
                  <label className="mx-1" id="label2">
                    Mis datos
                  </label>
                </Container>
              </Link>

              <Link to="Carrito">
                <Container className="py-1 text-start opc-element" id="navL2">
                  <label className="mx-1" id="label2">
                    Carrito
                  </label>
                </Container>
              </Link>

              <Link to="Status-Pedido">
                <Container className="py-1 text-start opc-element" id="navL2">
                  <label className="mx-1" id="label2">
                    Estado de Pedido
                  </label>
                </Container>
              </Link>

              <NavDropdown.Divider />

              <Container
                className="py-1 text-start opc-element"
                id="navL2"
                onClick={logout}
              >
                <label className="mx-1" id="label2">
                  Cerrar Sesion
                </label>
              </Container>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;