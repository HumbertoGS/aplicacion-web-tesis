import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";

import MensajeAlert from "../components/MensajeAlert";
import { PostData } from "../../custom-hooks/useFetch";
import { styleBtnCancel, styleBtnSave } from "../designer/styleBtn";

// const mensaje = response.error
//   ? messages.error
//   : response.datos.length === 0
//   ? messages.noData
//   : mensajeResp;

// const variant = response.error
//   ? variants.error
//   : response.datos.length === 0
//   ? variants.noData
//   : variants.success;

// setMensajeAlert({ mostrar: true, mensaje, variant });

const messages = {
  error: "Ups, parece que algo ha salido mal",
  noData: "La búsqueda no muestra resultado",
};

const variants = {
  error: "danger",
  noData: "warning",
  success: "success",
};

const datosAlert = (response, mensajeResp) => {
  const mensaje = response.error
    ? messages.error
    : response.datos.length === 0
    ? messages.noData
    : mensajeResp;

  const variant = response.error
    ? variants.error
    : response.datos.length === 0
    ? variants.noData
    : variants.success;

  return { mostrar: true, mensaje, variant };
};

const noClick = (stock) => ({
  fontWeight: "bold",
  background: "none",
  color: stock ? "#33d556" : "#d53a33",
});

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
    setMensajeAlert(datosAlert(response, mensajeResp));
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

const BtnCambiarEstado = ({
  item,
  reload,
  url,
  habilitarBtn = true,
  nombreBtn = false,
}) => {
  const [cambiar, setCambiar] = useState(false);
  const [datos, setDatos] = useState(null);
  const [mensajeAlert, setMensajeAlert] = useState({
    mostrar: false,
    mensaje: "",
    variant: "",
  });

  let style = item.estado || item?.stock ? styleBtnSave : styleBtnCancel;
  style = habilitarBtn ? style : noClick(item?.stock);

  const CambiarEstado = ({ id, estado }) => {
    setDatos({ id, estado: !estado });
    setCambiar(true);
  };

  const funcionRespuesta = (response) => {
    setCambiar(false);
    setMensajeAlert(datosAlert(response, "Se actualizo el estado"));
    reload();
  };

  PostData(url + "/cambiarEstado", datos, cambiar, funcionRespuesta);

  useEffect(() => {
    if (mensajeAlert.mostrar) {
      const interval = setTimeout(() => {
        setMensajeAlert({ mostrar: false, mensaje: "", variant: "" });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [mensajeAlert.mostrar]);

  return (
    <>
      {mensajeAlert.mostrar && (
        <MensajeAlert
          variant={mensajeAlert.variant}
          mensaje={mensajeAlert.mensaje}
        />
      )}
      <Button
        className="BtnEstado"
        style={style}
        onClick={() => CambiarEstado(item)}
        disabled={!habilitarBtn}
      >
        {nombreBtn ? nombreBtn : item.estado ? "Activo" : "Inactivo"}
      </Button>
    </>
  );
};

export { BtnCambiarEstado, BtnGuardar };
