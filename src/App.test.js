import { render, screen } from "@testing-library/react";
import App from "./App";
import NoPage from "./Pages/NoPage";

//Testing de prueba
//Se comprueba si el codigo de respuesta puesto manualmente es 404
test("renders learn react link", () => {
  render(<NoPage />);
  const counter = screen.getByTestId("counter");
  expect(counter).toHaveTextContent("404");
});
