import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FaShoppingCart } from "react-icons/fa";

function MenuDespe(props) { 
console.log(props.datos);

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container fluid>
        <Offcanvas  show={props.show} onHide={props.handleClose} placement={"end"}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>LLamar a Carrito</Offcanvas.Title>
          </Offcanvas.Header>{" "}
          {/*<Offcanvas.Body> Body carrito */}
        </Offcanvas>
      </Container>
    </Navbar>
  );
}

export default MenuDespe;
