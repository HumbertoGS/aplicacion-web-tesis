import { useEffect, useState } from "react";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

const Plantilla = () => {
  return (
    <>
      <Card body className="Card">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Nombre_Seccion</Breadcrumb.Item>
        </Breadcrumb>
        {/* contenedores para el cuerpo */}
        <div></div>
        <Card></Card>
        <Container></Container>
        {/* incluso Grid */}
      </Card>
    </>
  );
};

export default Plantilla;
