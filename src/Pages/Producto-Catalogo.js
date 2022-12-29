import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./designer/theme.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Catalogo from "./Catalogo";


const ProductoImagen = () => {
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
                            <Navbar bg="secondary" variant="dark">
                                <Container>
                                    <Navbar.Brand href="#home">Tacos Rosa</Navbar.Brand>
                                    <Nav className="me-auto">
                                        

                                        <Button variant="dark" >Agregar al Carrito</Button>
                                    </Nav>
                                </Container>
                            </Navbar>
                            <Figure>
                                <Figure.Image
                                    width={800}
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

export default ProductoImagen;