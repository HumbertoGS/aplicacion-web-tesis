import React from "react";
import logo from "./logo.svg";
import { Button } from "react-bootstrap";
import "./App.css";
import ColorSchemesExample from "./pages/navegacion";

let data = { value: "Veces presionado: " };

function App() {
  const [enumerar, setEnumerar] = React.useState(0);

  const eventClick = () => {
    setEnumerar(enumerar + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
<ColorSchemesExample/>
        <Button variant="primary" onClick={eventClick}>
          {data.value} {enumerar}
        </Button>
      </header>
    </div>
  );


}

export default App;
