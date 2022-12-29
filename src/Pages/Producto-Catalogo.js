import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./designer/theme.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaCartPlus } from 'react-icons/fa';
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

                            <Navbar bg="secondary" variant="dark" >
                                <Container className="me-auto">
                                    <Navbar.Brand >Tacos Rosa</Navbar.Brand>
                                    <Navbar.Brand>Valor:</Navbar.Brand>
                                    <fieldset disabled>
                                        <Form.Control id="disabledTextInput" placeholder="$15.00" htmlSize="12" />
                                    </fieldset>
                                    
                                    <Navbar.Brand>Cantidad: </Navbar.Brand>
                                    
                                    <input type='number' ></input>
                                    

                                </Container>
                                
                                <Nav className="me-auto">
                                    <Button variant="dark" ><h4><FaCartPlus /></h4></Button>
                                </Nav>
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