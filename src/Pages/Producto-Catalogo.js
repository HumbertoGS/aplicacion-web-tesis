import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./designer/theme.css";
import Catalogo from "./Catalogo";

const Producto = () => {
    return (
        <>
            <Row>
                <Col className="mb-3">
                    <Form>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextInput1"
                        >
                            <Form.Label column sm="3">
                                {/*que se llame el nombre del producto de lo que se ingresa al publicar el producto */}
                            </Form.Label>
                            Tacos Rosa:
                            <Figure>
                                <Figure.Image
                                    width={700}
                                    height={700}
                                    alt="Imagen de muestra"
                                    src={"tacos-rosa.png"}
                                />
                            </Figure>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </>

    );
}

export default Producto;