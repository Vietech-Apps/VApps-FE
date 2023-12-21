import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import data from "./data";
import { StyledBarChart } from "pages/root/MyDashboard/index.styled";

const TinyBarChart = () => {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
      style={{ minHeight: "100%" }}
    >
      <StyledBarChart
        data={data}
        margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />

        <Bar dataKey="pv" fill="#4299E1" />
      </StyledBarChart>
    </ResponsiveContainer>
  );
};

export default TinyBarChart;
