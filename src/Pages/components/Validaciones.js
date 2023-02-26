const validaciones = {
  onlyNumber: (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^\d+$/.test(keyValue) && ![8, 46, 37, 39].includes(keyCode)) {
      event.preventDefault();
    }
  },
};

export default validaciones;
