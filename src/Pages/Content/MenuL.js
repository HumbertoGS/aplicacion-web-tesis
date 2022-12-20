import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Stack from "react-bootstrap/Stack";
import Figure from "react-bootstrap/Figure";
import { Link } from "react-router-dom";
import "../designer/theme.css";

const MenuLateral = (
  <Stack>
    <Navbar bg="dark" variant="dark">
      <Stack>
        <Container>
          <Figure>
            <Figure.Image
              width={100}
              height={100}
              alt="Imagen del negocio"
              src="https://media.geeksforgeeks.org/wp-content/uploads/20210425000233/test-300x297.png"
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
            <Nav.Link href="catalogo">Catalogo</Nav.Link>
          </Nav>
        </Container>
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="carrito">Carrito</Nav.Link>
          </Nav>
        </Container>
      </Stack>
    </Navbar>

    {/* <Link to="/">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Inicio</Navbar.Brand>
        </Container>
      </Navbar>
    </Link> */}
  </Stack>
);

function MenuL() {
  return (
    <>
      <div className="App-menu">
        {MenuLateral}
        <div className="footer-menu">
          <span>
            Developed by
            <br />
            Guiracocha
            <br /> & Herrera
          </span>
        </div>
      </div>
    </>
  );
}

export default MenuL;
