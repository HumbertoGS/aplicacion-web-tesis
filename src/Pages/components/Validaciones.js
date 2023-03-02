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
  contrasena: (values, campo, opciones) => {
    const options = [];

    if (values[campo]) {
      if (values[campo].length < 7) {
        options.push("Minimo 7 caracteres");
      }
      if (!/\d/.test(values[campo])) {
        options.push("Minimo un número");
      }
      if (!/[A-Z]/.test(values[campo])) {
        options.push("Minimo una letra mayúscula");
      }
      if (/[\W_]/.test(values[campo])) {
        options.push("No debe contener caracteres especiales");
      }
      if (/\s/.test(values[campo])) {
        options.push("No debe contener espacios");
      }
    }

    opciones(options);
  },
  cedula: (cedula, errors, campo) => {
    // Verificar que la cédula tenga 10 dígitos
    if (cedula.length !== 10) {
      errors[campo] = false;
      return false;
    }

    // Verificar que los dos primeros dígitos correspondan a una provincia válida
    const provincia = parseInt(cedula.slice(0, 2));
    if (provincia < 1 || provincia > 24) {
      errors[campo] = false;
      return false;
    }

    // Verificar que el tercer dígito sea un número entre 0 y 6
    const tipoPersona = parseInt(cedula[2]);
    if (tipoPersona < 0 || tipoPersona > 6) {
      errors[campo] = false;
      return false;
    }

    // Validar el último dígito utilizando el algoritmo de Módulo 10
    const p = [2, 1, 2, 1, 2, 1, 2, 1, 2, 1];
    let total = 0;
    for (let i = 0; i < 10; i++) {
      let d = parseInt(cedula[i]);
      if (p[i] === 2) {
        d *= 2;
        if (d >= 10) {
          d -= 9;
        }
      }
      total += d;
    }
    if (total % 10 !== 0) {
      total = Math.ceil(total / 10) * 10;
      if (
        total - cedula.split("").reduce((sum, d) => sum + parseInt(d), 0) ===
        10
      ) {
        errors[campo] = true;
        return true;
      } else {
        errors[campo] = false;
        return false;
      }
    }

    errors[campo] = true;
    return true;
  },
};

export default validaciones;
