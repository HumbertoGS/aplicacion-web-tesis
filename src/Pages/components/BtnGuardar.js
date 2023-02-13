import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { PostData } from "../../custom-hooks/useFetch";
import MensajeAlert from "../components/MensajeAlert";

const messages = {
  error: "Ups, parece que algo ha salido mal",
  noData: "La búsqueda no muestra resultado",
};

const variants = {
  error: "danger",
  noData: "warning",
  success: "success",
};

const BtnGuardar = ({ datos, url, handleRespond, mensajeResp }) => {
  const [guardar, setGuardar] = useState(false);
  const [mensajeAlert, setMensajeAlert] = useState({
    mostrar: false,
    mensaje: "",
    variant: "",
  });

  const funcionRespuesta = (response) => {
    handleRespond(response.datos);
    setGuardar(false);

    const message = response.error
      ? messages.error
      : response.datos.length === 0
      ? messages.noData
      : mensajeResp;

    const variant = response.error
      ? variants.error
      : response.datos.length === 0
      ? variants.noData
      : variants.success;

    setMensajeAlert({ mostrar: true, mensaje: message, variant });
  };

  PostData(url, datos, guardar, funcionRespuesta);

  useEffect(() => {
    if (mensajeAlert.mostrar) {
      const interval = setTimeout(() => {
        setMensajeAlert({ mostrar: false, mensaje: "", variant: "" });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [mensajeAlert.mostrar]);

  return (
    <div>
      {mensajeAlert.mostrar && (
        <MensajeAlert
          variant={mensajeAlert.variant}
          mensaje={mensajeAlert.mensaje}
        />
      )}
      <Button
        className="mx-2"
        variant="outline-secondary"
        onClick={() => setGuardar(true)}
      >
        Buscar
      </Button>
    </div>
  );
};

export default BtnGuardar;
