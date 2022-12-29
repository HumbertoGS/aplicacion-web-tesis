import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaShoppingCart } from 'react-icons/fa';

function MenuDespe() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [modal, setModal] = useState(false);
    return (
        <Navbar bg="light" expand="lg" className="mb-3">
            <Container fluid>
                <DropdownButton id="dropdown-basic-button" title="Filtrar">
                    <Dropdown.Item href="#/zapatos">Zapatos</Dropdown.Item>
                    <Dropdown.Item href="#/vestidos">Vestidos</Dropdown.Item>
                    <Dropdown.Item href="#/pantalones">Camisas</Dropdown.Item>
                    <Dropdown.Item href="#/pantalones">Pantalones</Dropdown.Item>
                </DropdownButton>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Inicio</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Buscar producto"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Buscar</Button>

                        <Button onClick={handleShow}  /*onClick={(handleShow) => {setModal(true);}*/ >
                            <FaShoppingCart />
                        </Button>

                        <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>LLamar a Carrito</Offcanvas.Title>
                            </Offcanvas.Header> {/*<Offcanvas.Body> Body carrito */}
                        </Offcanvas>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>


    );
}

export default MenuDespe;