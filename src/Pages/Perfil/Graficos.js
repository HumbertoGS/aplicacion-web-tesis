import React from "react";
import { Col, Row } from "react-bootstrap";
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
} from "recharts";

const GraficoBarra = () => {
  const data = [
    {
      name: "luis",
      age: 12,
      weight: 25,
    },
    {
      name: "jose",
      age: 17,
      weight: 25,
    },
    {
      name: "pedro",
      age: 32,
      weight: 25,
    },
    {
      name: "ruth",
      age: 22,
      weight: 25,
    },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer aspect={2}>
        <BarChart data={data} width={500}>
          <CartesianGrid strokeDasharray="4 1 1" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="age" fill="#6b48ff" />
          <Bar dataKey="weight" fill="#1ee3cf" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const GraficaTorta = () => {
  const data = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 },
  ];

  const COLORS = [
    "#ce93d8",
    "#5c6bc0",
    "#b39ddb",
    "#4dd0e1",
    "#f48fb1",
    "#d500f9",
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
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
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const Graficos = () => {
  return (
    <>
      <Row className="pt-5">
        <Col md={6}>
          {/* Grafico de barras */}
          <GraficoBarra />
        </Col>
        <Col md={6}>
          {/* Grafico de Torta */}
          <GraficaTorta />
        </Col>
      </Row>
    </>
  );
};

export default Graficos;
