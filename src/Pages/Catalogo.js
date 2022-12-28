import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProductoCatalogo from "./Producto-Catalogo";
import "./designer/theme.css";

const Catalogo = () => {
    return (
        <>
            <div className="form-login">
                <Container>
                    <Row>
                        <Col className="mb-3">
                            <Form.Text>
                                <h2>Cátologo de productos</h2>
                            </Form.Text>
                        </Col>
                    </Row>
                </Container>
                <Container>
                {/* llamar la cantidad de veces que haya un producto */}
                <ProductoCatalogo/>
             
                <ProductoCatalogo/>
                </Container>
            </div>

        </>

    );
}

export default Catalogo;