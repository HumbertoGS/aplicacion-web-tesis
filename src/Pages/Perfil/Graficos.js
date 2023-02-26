import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Bar,
} from "recharts";

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

const Graficos = () => {
  return (
    //Grafico de barras
    <ResponsiveContainer width={"50%"} aspect={2}>
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
  );
};

export default Graficos;
