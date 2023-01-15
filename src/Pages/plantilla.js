import { useEffect, useState } from "react";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import MensajeAlert from "./MensajeAlert";

const Plantilla = () => {
  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("");

  useEffect(() => {
    if (variant) {
      const interval = setTimeout(() => {
        setVariant("");
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [variant]);

  return (
    <>
      <Card body className="Card">
        {variant ? <MensajeAlert variant={variant} mensaje={mensaje} /> : <></>}
        <Breadcrumb>
          <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Nombre_Seccion</Breadcrumb.Item>
        </Breadcrumb>
        {/* contenedores para el cuerpo */}
        <div></div>
        <Card></Card>
      </Card>
    </>
  );
};

export default Plantilla;
