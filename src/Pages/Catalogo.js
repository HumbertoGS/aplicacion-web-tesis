import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ProductoCatalogo from "./Producto-Catalogo";
import MenuDespe from "./designer/MenuDesplegable";
import paginacionCatalogo from "./Paginacion";
import "./designer/theme.css";



const Catalogo = () => {
    return (
        <>
            <div className="form-catalogo">
                <Container >
                    <Row>
                        <Col className="mb-3">
                            <Form.Text>
                                <h2>Cátologo de productos</h2>
                            </Form.Text>
                        </Col>
                    </Row>
                    <MenuDespe />
                    {/* llamar la cantidad de veces que haya un producto */}
                    <ProductoCatalogo />
                    <ProductoCatalogo />
                    <ProductoCatalogo />
                    <ProductoCatalogo />
                </Container>
                {/*<paginacionCatalogo />*/}

            </div>

        </>

    );
}

export default Catalogo;