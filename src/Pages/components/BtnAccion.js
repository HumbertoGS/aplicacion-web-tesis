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

    setMensajeAlert({ mostrar: true, mensaje, variant });
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

const BtnCambiarEstado = ({
  item,
  reload,
  url,
  habilitarBtn = true,
  nombreBtn = false,
  mensajeResp = "Se actualizo el estado",
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

  PostData(url + "/cambiarEstado", datos, cambiar, (response) => {
    setCambiar(false);
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

    setMensajeAlert({ mostrar: true, mensaje, variant });
    reload();
  });

  const CambiarEstado = ({ id, estado }) => {
    setDatos({ id, estado: !estado });
    setCambiar(true);
  };

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
        style={{
          border: "0px",
          width: "85px",
          ...style,
          opacity: "100%",
        }}
        onClick={() => CambiarEstado(item)}
        disabled={!habilitarBtn}
      >
        {nombreBtn ? nombreBtn : item.estado ? "Activo" : "Inactivo"}
      </Button>
    </>
  );
};

export { BtnCambiarEstado, BtnGuardar };
