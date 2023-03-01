const validaciones = {
  onlyNumber: (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^\d+$/.test(keyValue) && ![8, 46, 37, 39].includes(keyCode)) {
      event.preventDefault();
    }
  },
  correo: (values, errors) => {
    if (!values.correo) errors.correo = false;
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correo))
      errors.correo = true;
    else errors.correo = false;

    return errors.correo;
  },
  contrasena: (values, errors) => {
    if (!values.contrasena) errors.contrasena = false;
    else if (
      /^(?=[a-zA-Z]*\d)(?=[a-zA-Z\d]*[A-Z])(?=[A-Z\d]*[a-z])[a-zA-Z\d]{7,}$/i.test(
        values.contrasena
      )
    )
      errors.contrasena = false;
    else errors.contrasena = true;

    return errors.contrasena;
  },
};

export default validaciones;
