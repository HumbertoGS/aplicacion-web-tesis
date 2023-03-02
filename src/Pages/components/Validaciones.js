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
    else if (!/^[A-ZÑ0-9._%+-]+@[A-ZÑ0-9.-]+\.[A-Z]{2,4}$/i.test(values.correo))
      errors.correo = true;
    else errors.correo = false;

    return errors.correo;
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
