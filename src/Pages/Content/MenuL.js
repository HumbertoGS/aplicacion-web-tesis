import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Stack from "react-bootstrap/Stack";
import Figure from "react-bootstrap/Figure";
import { Link } from "react-router-dom";
import "../designer/theme.css";

import image from "../../assets/logo-negocio.jpeg";

function MenuLateral() {
  return (
    <div className="App-menu">
      <Stack className="App-menu">
        <Navbar variant="white" style={{ backgroundColor: "#e0c8db" }}>
          <Stack>
            {/* <div>
          <img src={image} />
        </div> */}
            <Container>
              <Figure>
                <Figure.Image
                  width={150}
                  // height={300}
                  alt="Imagen del negocio"
                  src={"logo512.png"}
                />
              </Figure>
            </Container>
            <Container>
              <Nav className="me-auto">
                <Nav.Link href="/">Inicio</Nav.Link>
              </Nav>
            </Container>
            <Container>
              <Nav className="me-auto">
                <Nav.Link href="Catalogo">Catalogo</Nav.Link>
              </Nav>
            </Container>
            <Container>
              <Nav className="me-auto">
                <Nav.Link href="Carrito">Carrito</Nav.Link>
              </Nav>
            </Container>
            <br /> <br /> <br /> <br />
            <Container>
              <Nav className="me-auto">
                <Nav.Link href="Registrar-Productos">
                  Registro de Productos
                </Nav.Link>
              </Nav>
            </Container>
            <Container>
              <Nav className="me-auto">
                <Nav.Link href="Registro-Ventas">Registro de Ventas</Nav.Link>
              </Nav>
            </Container>
            <Container>
              <Nav className="me-auto">
                <Nav.Link href="Inventario">Inventario</Nav.Link>
              </Nav>
            </Container>
          </Stack>
        </Navbar>
        <span className="footer-menu">
          Developed by
          <br />
          Guiracocha & Herrera
        </span>
        {/* <Link to="/">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Inicio</Navbar.Brand>
        </Container>
      </Navbar>
    </Link> */}
      </Stack>
    </div>
  );
}

export default MenuLateral;
