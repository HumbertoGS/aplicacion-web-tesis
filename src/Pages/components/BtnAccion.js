import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { PostData } from "../../custom-hooks/useFetch";
import MensajeAlert from "../components/MensajeAlert";
import { styleBtnCancel, styleBtnSave } from "../designer/styleBtn";

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

const noClick = (stock) => ({
  fontWeight: "bold",
  background: "none",
  color: stock ? "#33d556" : "#d53a33",
});

const BtnCambiarEstado = ({ item, reload, url, habilitarBtn = true }) => {
  const [cambiar, setCambiar] = useState(false);
  const [datos, setDatos] = useState(null);

  let style = item.estado || item?.stock ? styleBtnSave : styleBtnCancel;

  style = habilitarBtn ? style : noClick(item?.stock);

  PostData(url + "/cambiarEstado", datos, cambiar, (x) => {
    setCambiar(false);
    reload();
  });

  const CambiarEstado = ({ id, estado }) => {
    setDatos({ id, estado: !estado });
    setCambiar(true);
  };

  return (
    <Button
      style={{
        border: "0px",
        width: "70px",
        ...style,
        opacity: "100%",
      }}
      onClick={() => CambiarEstado(item)}
      disabled={!habilitarBtn}
    >
      {item.stock
        ? item.stock
          ? "Si"
          : "No"
        : item.estado
        ? "Activo"
        : "Inactivo"}
    </Button>
  );
};

export { BtnCambiarEstado, BtnGuardar };
