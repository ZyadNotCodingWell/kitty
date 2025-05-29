"use client";
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', uv: 400, pv: 240, amt: 240 },
  { name: 'Feb', uv: 300, pv: 139, amt: 221 },
  { name: 'Mar', uv: 200, pv: 980, amt: 229 },
  { name: 'Apr', uv: 278, pv: 390, amt: 200 },
  { name: 'May', uv: 189, pv: 480, amt: 218 },
  { name: 'Jun', uv: 239, pv: 380, amt: 250 },
  { name: 'Jul', uv: 349, pv: 430, amt: 210 },
];

const ChartCard: React.FC = () => {
  return (
    <div className="rounded-lg w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-br from-blue-400 to-fuchsia-400 bg-clip-text text-transparent">Sample Line Chart</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="oklch(70.7% 0.165 254.624" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="oklch(74% 0.238 322.16)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;
