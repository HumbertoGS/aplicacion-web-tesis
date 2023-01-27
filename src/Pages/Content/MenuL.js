import secureLocalStorage from "react-secure-storage";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Stack from "react-bootstrap/Stack";
import Figure from "react-bootstrap/Figure";
import { Link } from "react-router-dom";

import "../designer/theme.css";

const MenuLateral = ({ user }) => {
  return (
    <Stack className="menu-lateral">
      <Navbar>
        <Stack>
          {/* <div>
          <img src={image} />
        </div> */}
          <Container>
            <Figure>
              <Figure.Image
                width={170}
                // height={300}
                alt="Imagen del negocio"
                src={"logo512.png"}
              />
            </Figure>
          </Container>
          <Link to="Inicio">
            <Container className="py-2 text-start nav-element" id="navL">
              <label className="mx-2 nav-element">Inicio</label>
            </Container>
          </Link>
          <Link to="Catalogo">
            <Container className="py-2 text-start nav-element" id="navL">
              <label className="mx-2 nav-element">Catalogo</label>
            </Container>
          </Link>
          <Link to="Carrito">
            <Container className="py-2 text-start nav-element" id="navL">
              <label className="mx-2 nav-element">Carrito</label>
            </Container>
          </Link>
          <Link to="Status-Pedido">
            <Container className="py-2 text-start nav-element" id="navL">
              <label className="mx-2 nav-element">Status del Pedido</label>
            </Container>
          </Link>
          {user ? (
            <div>
              <Link to="Registrar-Productos">
                <Container className="py-2 text-start nav-element" id="navL">
                  <label className="mx-2 nav-element">
                    Registro de Productos
                  </label>
                </Container>
              </Link>
              <Link to="Registro-Ventas">
                <Container className="py-2 text-start nav-element" id="navL">
                  <label className="mx-2 nav-element">Registro de Ventas</label>
                </Container>
              </Link>
              {user.permisos === 1 ? (
                <Link to="Inventario">
                  <Container className="py-2 text-start nav-element" id="navL">
                    <label className="mx-2 nav-element">Inventario</label>
                  </Container>
                </Link>
              ) : null}
            </div>
          ) : (
            <></>
          )}
        </Stack>
      </Navbar>
    </Stack>
  );
};

function MenuL() {
  const user = secureLocalStorage.getItem("user");

  return (
    <>
      <div className="App-menu">
        <MenuLateral user={user} />
        <div className="footer-menu">
          <span>
            Developed by
            <br />
            Guiracocha & Herrera
          </span>
        </div>
      </div>
    </>
  );
}

export default MenuL;
