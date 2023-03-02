const validaciones = {
  onlyNumber: (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^\d+$/.test(keyValue) && ![8, 46, 37, 39].includes(keyCode)) {
      event.preventDefault();
    }
  },
  text: (campo, expresion) => {
    if (!campo) return false;
    else if (!expresion.test(campo)) return true;
    else return false;
  },
  textSinEspacio: (campo) => {
    let expresion = /^[a-zñA-ZÑáéíóúÁÉÍÓÚ][a-zñA-ZÑáéíóú]*$/i;
    return validaciones.text(campo, expresion);
  },
  textConEspacio: (campo) => {
    let expresion = /^[a-zñA-ZÑáéíóúÁÉÍÓÚ][a-zñA-ZÑáéíóú ]*[\D][a-zA-Záéíóú]$/i;
    return validaciones.text(campo, expresion);
  },
  correo: (campo) => {
    let expresion = /^[A-ZÑ0-9._%+-]+@[A-ZÑ0-9.-]+\.[A-Z]{2,4}$/i;
    return validaciones.text(campo, expresion);
  },
  contrasena: (campo, opciones) => {
    const options = [];

    if (campo) {
      if (campo.length < 7) {
        options.push("Minimo 7 caracteres");
      }
      if (!/\digito/.test(campo)) {
        options.push("Minimo un número");
      }
      if (!/[A-Z]/.test(campo)) {
        options.push("Minimo una letra mayúscula");
      }
      if (/[\W_]/.test(campo)) {
        options.push("No debe contener caracteres especiales");
      }
      if (/\s/.test(campo)) {
        options.push("No debe contener espacios");
      }
    }

    opciones(options);
  },
  cedula: (cedula) => {
    if (cedula.length !== 10) {
      return false;
    }

    // Verificar que los dos primeros dígitos correspondan a una provincia válida
    const provincia = parseInt(cedula.slice(0, 2));
    if (provincia < 1 || provincia > 24) {
      return false;
    }

    // Verificar que el tercer dígito sea un número entre 0 y 6
    const tipoPersona = parseInt(cedula[2]);
    if (tipoPersona < 0 || tipoPersona > 6) {
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
        return true;
      } else {
        return false;
      }
    }

    return true;
  },
};

export default validaciones;
