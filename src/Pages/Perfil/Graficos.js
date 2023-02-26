import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
  ResponsiveContainer,
  Tooltip,
  //Grafica de barra
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  //Grafica de torta
  PieChart,
  Pie,
  Cell,
  //Grafica radar
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  //Grafica linear
  LineChart,
  Line,
} from "recharts";
import { ReloadData } from "../../custom-hooks/useFetch";

const COLORS = [
  "#ce93d8",
  "#5c6bc0",
  "#b39ddb",
  "#4dd0e1",
  "#f48fb1",
  "#d500f9",
];

const GraficoBarra = ({ data }) => {
  return (
    <div style={{ height: "500px" }}>
      <h4 className="pt-4">Cantidad Producto</h4>
      <hr />
      <ResponsiveContainer width="100%" aspect={2} className="pt-3">
        <BarChart data={data} width={300}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="disponible" stackId="a" fill="#8884d8" />
          <Bar dataKey="vendido" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const GraficaTorta = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h4>Producto vendidos</h4>
      <hr />
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="conteo"
            data={data}
            innerRadius={60}
            outerRadius={85}
            fill="#82ca9d"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vetical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const GraficaRadar = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h4>Categoria mas vendida</h4>
      <hr />
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar
            name="Categoria"
            dataKey="conteo"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

// const GraficaLine = ({ data }) => {
//   return (
//     <ResponsiveContainer width="100%" height="100%" aspect={2}>
//       <LineChart
//         width={500}
//         height={300}
//         data={data}
//         margin={{
//           top: 5,
//           right: 30,
//           left: 20,
//           bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line
//           type="monotone"
//           dataKey="disponible"
//           stroke="#8884d8"
//           activeDot={{ r: 8 }}
//         />
//         <Line type="monotone" dataKey="vendido" stroke="#82ca9d" />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

const url = process.env.REACT_APP_API_CORE_URL + "pedido/estadisticas";

const Graficos = ({ setDatosPDF }) => {
  const [buscar, setBuscar] = useState(true);
  const [datos, setDatos] = useState(null);

  ReloadData(url, buscar, (dato) => {
    setDatos(dato?.datos);
    setDatosPDF(dato?.datos);
    setBuscar(false);
  });

  return (
    <>
      <Row className="pt-5">
        <Col md={6} className="pb-5">
          {datos?.datosCategoria && (
            <GraficaRadar data={datos?.datosCategoria} />
          )}
        </Col>
        <Col md={6} className="pb-5">
          {datos?.datosProducto && <GraficaTorta data={datos?.datosProducto} />}
        </Col>
      </Row>
      <Row className="pt-2">
        <Col></Col>
        <Col md={10}>
          {datos?.datosProductoCantidad && (
            <GraficoBarra data={datos?.datosProductoCantidad} />
          )}
        </Col>
        <Col></Col>
      </Row>
      {/* <Row className="pt-5">
        <Col></Col>
        <Col md={10}>
          <GraficaLine data={datos?.datosProductoCantidad} />
        </Col>
        <Col></Col>
      </Row> */}
    </>
  );
};

export default Graficos;
