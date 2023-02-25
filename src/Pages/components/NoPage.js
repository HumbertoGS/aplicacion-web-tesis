import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NoPage = () => {
  const counter = 404;

  return (
    <>
      <div className="form-padre">
        <div className="d-flex flex-column">
          <h1>PAGINA NO ENCONTRADA</h1>
          <div className="d-flex align-items-end justify-content-evenly">
            <img width={150} src="giphy.gif"></img>
            <div>
              <h4 data-testid="counter">
                <br />
                Codigo {counter}
              </h4>
              <Link to="/Catalogo">
                <Button variant="outline-secondary">Volver al Catalogo</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoPage;
