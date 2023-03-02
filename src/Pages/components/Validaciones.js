const validaciones = {
  onlyNumber: (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^\d+$/.test(keyValue) && ![8, 46, 37, 39].includes(keyCode)) {
      event.preventDefault();
    }
  },
  text: (values, errors, campo, expresion) => {
    if (!values) errors[campo] = false;
    else if (!expresion.test(values)) errors[campo] = true;
    else errors[campo] = false;

    return errors[campo];
  },
  textSinEspacio: (values, errors, campo) => {
    let expresion = /^[a-zñA-ZÑáéíóúÁÉÍÓÚ][a-zñA-ZÑáéíóú]*$/i;
    return validaciones.text(values, errors, campo, expresion);
  },
  textConEspacio: (values, errors, campo) => {
    let expresion = /^[a-zñA-ZÑáéíóúÁÉÍÓÚ][a-zñA-ZÑáéíóú ]*[\D][a-zA-Záéíóú]$/i;
    return validaciones.text(values, errors, campo, expresion);
  },
  correo: (values, errors, campo) => {
    let expresion = /^[A-ZÑ0-9._%+-]+@[A-ZÑ0-9.-]+\.[A-Z]{2,4}$/i;
    return validaciones.text(values[campo], errors, campo, expresion);
  },
  contrasena: (values, opciones) => {
    const options = [];

    if (values.contrasena) {
      if (values.contrasena.length < 7) {
        options.push("Minimo 7 caracteres");
      }
      if (!/\d/.test(values.contrasena)) {
        options.push("Minimo un número");
      }
      if (!/[A-Z]/.test(values.contrasena)) {
        options.push("Minimo una letra mayúscula");
      }
      if (/[\W_]/.test(values.contrasena)) {
        options.push("No debe contener caracteres especiales");
      }
      if (/\s/.test(values.contrasena)) {
        options.push("No debe contener espacios");
      }
    }

    opciones(options);
  },
};

export default validaciones;
